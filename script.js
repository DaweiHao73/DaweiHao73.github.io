// 頁面切換功能
function switchPage(pageId) {
    // 隱藏所有頁面
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });

    // 移除所有切換按鈕的 active 狀態
    const allSwitchButtons = document.querySelectorAll('.switch-button');
    allSwitchButtons.forEach(button => {
        button.classList.remove('active');
    });

    // 顯示選中的頁面
    document.getElementById(pageId).classList.add('active');

    // 添加對應按鈕的 active 狀態
    if (pageId === 'tt310') {
        document.querySelector('.switch-button.blue').classList.add('active');
        document.body.className = '';
    } else if (pageId === 'engineer') {
        document.querySelector('.switch-button.orange').classList.add('active');
        document.body.className = '';
    }

    // 更新語言按鈕顏色
    const langButtons = document.querySelectorAll('.lang-button');
    langButtons.forEach(button => {
        button.classList.remove('orange');
    });

    if (pageId === 'engineer') {
        const activeLangButton = document.querySelector('.lang-button.active');
        if (activeLangButton) {
            activeLangButton.classList.add('orange');
        }
    }

    // 更新頁面標題
    const currentLang = localStorage.getItem('selectedLanguage') || 'zh-TW';
    updatePageTitle(currentLang);

    // 滾動到頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 標籤切換功能（工程師神器頁面專用）
function switchTab(tabName) {
    // 隱藏所有標籤內容
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // 移除所有按鈕的 active 狀態
    const allButtons = document.querySelectorAll('.tab-button');
    allButtons.forEach(button => {
        button.classList.remove('active');
    });

    // 顯示選中的標籤內容
    document.getElementById(tabName).classList.add('active');

    // 添加選中按鈕的 active 狀態
    event.target.classList.add('active');
}

// 語言切換功能
function switchLanguage(lang) {
    // 切換語言按鈕 active 狀態
    document.querySelectorAll('.lang-button').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // 切換所有 data-lang-inline 的內容
    document.querySelectorAll('[data-lang-inline]').forEach(el => {
        el.classList.toggle('active', el.getAttribute('data-lang-inline') === lang);
    });

    // 切換所有 data-lang 的內容（如果有用到 data-lang 區塊）
    document.querySelectorAll('[data-lang]').forEach(el => {
        el.classList.toggle('active', el.getAttribute('data-lang') === lang);
    });

    // 更新頁面標題
    updatePageTitle(lang);

    // 儲存語言
    localStorage.setItem('selectedLanguage', lang);

    console.log('切換語言:', lang);
}

// 更新頁面標題
function updatePageTitle(lang) {
    const currentPage = document.querySelector('.page.active');
    if (!currentPage) return;

    let title = '';
    if (currentPage.id === 'tt310') {
        if (lang === 'zh-TW') title = 'Da-Wei Hao - iOS developer';
        else if (lang === 'ja') title = 'Da-Wei Hao - iOS 開發者';
        else title = 'Da-Wei Hao - iOS Developer';
    } else if (currentPage.id === 'engineer') {
        if (lang === 'zh-TW') title = '工地查驗神器 Build Tracker';
        else if (lang === 'ja') title = '建設現場検査ツール Build Tracker';
        else title = 'Build Tracker - Construction Inspector Tool';
    }

    if (title) {
        document.title = title;
    }
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function() {
    // 確保預設顯示 TT310 頁面
    switchPage('tt310');
    
    // 初始化語言設定
    const savedLang = localStorage.getItem('selectedLanguage') || 'zh-TW';
    switchLanguage(savedLang);

    // 綁定語言切換事件
    document.querySelectorAll('.lang-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            switchLanguage(btn.getAttribute('data-lang'));
        });
    });

    // 平滑滾動效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // 如果 href 僅為 "#"，不做任何事
            if (this.getAttribute('href') === '#') return;
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 動畫觀察器
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 為卡片元素添加動畫
    document.querySelectorAll('.feature-card, .benefit-item, .tip-item, .tool-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // 添加滾動效果
    window.addEventListener('scroll', () => {
        const headers = document.querySelectorAll('header');
        headers.forEach(header => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
    });
}); 