// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.header');
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(254, 254, 254, 0.98)';
            header.style.boxShadow = '0 1px 10px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.background = 'rgba(254, 254, 254, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    console.log('AI Liangzhu');
});