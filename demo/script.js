document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing language handling');
    
    // Get language from URL parameter 'lang' or default to 'en'
    const urlParams = new URLSearchParams(window.location.search);
    let currentLang = urlParams.get('lang') || 'en';
    
    console.log('Initial language from URL:', currentLang);

    // Validate language or default to 'en'
    if (currentLang !== 'zh' && currentLang !== 'en') {
        currentLang = 'en';
    }
    
    console.log('Language after validation:', currentLang);

    async function loadTranslations(lang) {
        console.log('Loading translations for:', lang);
        try {
            // Use absolute path to ensure it loads correctly with URL parameters
            const url = `${window.location.origin}${window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1)}lang/${lang}.json`;
            console.log('Full translation URL:', url);
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const translations = await response.json();
            console.log('Translations loaded successfully:', translations);
            applyTranslations(translations);
            updateButtonStyles(lang);
        } catch (error) {
            console.error("Could not load translations:", error);
            console.error("Error details:", error.message);
        }
    }

    function applyTranslations(translations) {
        console.log('Applying translations to elements');
        let elementsTranslated = 0;
        
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                // Use innerHTML for keys like footer_text that contain HTML entities
                if (key === 'footer_text') {
                    element.innerHTML = translations[key];
                } else {
                    element.textContent = translations[key];
                }
                elementsTranslated++;
            } else {
                console.warn(`Translation missing for key: ${key}`);
            }
        });
        
        console.log(`Translated ${elementsTranslated} elements`);
        
        // Special case for title
        const titleElement = document.querySelector('title');
        if (titleElement) {
            const titleKey = titleElement.getAttribute('data-translate');
            if(titleKey && translations[titleKey]) {
                 document.title = translations[titleKey];
                 console.log('Title translated');
            }
        }
    }

    function updateButtonStyles(lang) {
        console.log('Updating language button styles for:', lang);
        const enButton = document.getElementById('lang-en');
        const zhButton = document.getElementById('lang-zh');
        
        if (enButton && zhButton) {
            enButton.classList.toggle('active', lang === 'en');
            zhButton.classList.toggle('active', lang === 'zh');
            console.log('Button styles updated');
        } else {
            console.error('Language buttons not found in DOM');
        }
    }

    // Create and append language switcher
    console.log('Creating language switcher');
    const languageSwitcher = document.createElement('div');
    languageSwitcher.className = 'language-switcher';
    
    const enButton = document.createElement('button');
    enButton.id = 'lang-en';
    enButton.textContent = 'EN';
    enButton.className = currentLang === 'en' ? 'active' : '';
    
    const zhButton = document.createElement('button');
    zhButton.id = 'lang-zh';
    zhButton.textContent = '中文';
    zhButton.className = currentLang === 'zh' ? 'active' : '';
    
    languageSwitcher.appendChild(enButton);
    languageSwitcher.appendChild(zhButton);
    
    // Insert before the last item in nav (the Apply Now button)
    const nav = document.querySelector('nav');
    const applyButton = document.querySelector('nav .cta-button');
    
    if (nav && applyButton) {
        nav.insertBefore(languageSwitcher, applyButton);
        console.log('Language switcher inserted into DOM');
    } else {
        console.error('Could not find nav or apply button in DOM');
    }
    
    // Get the current path (excluding query parameters)
    const currentPath = window.location.pathname;
    
    // Add event listeners - direct URL navigation
    enButton.addEventListener('click', () => {
        console.log('English button clicked, navigating to ?lang=en');
        window.location.href = currentPath + '?lang=en';
    });
    
    zhButton.addEventListener('click', () => {
        console.log('Chinese button clicked, navigating to ?lang=zh');
        window.location.href = currentPath + '?lang=zh';
    });

    // Initial load based on current language
    console.log('Starting initial translation load');
    loadTranslations(currentLang);
}); 