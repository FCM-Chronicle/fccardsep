const searchData = {
    sepia: [
        {
            name: "피치비트",
            aliases: ["PB", "PB25", "피치비트", "pb", "pb25"],
            specs: {
                "흑백 여부": "O",
                "색조": "30",
                "포화도": "24",
                "색상 조정": "X"
            }
        },
        {
            name: "토츠콘",
            aliases: ["토츠콘", "TOTS ICON", "토츠아이콘", "25TOTS 아이콘", "tots icon", "tots", "25tots", "토츠", "아이콘"],
            specs: {
                "흑백 여부": "포화도 -65",
                "색조": "0",
                "포화도": "0",
                "색상 조정": "밝은영역 40 0 -46"
            }
        }
    ],
    shadow: [
        {
            name: "파운더스콘",
            aliases: ["파던콘", "파던아이콘", "파더아이콘", "파더", "파운더스 아이콘", "파운더스", "파던", "아이콘"],
            specs: {
                "색상코드": "fff79",
                "불투명도": "40",
                "확산": "53",
                "크기": "14"
            }
        }
    ]
};

let currentTab = 'sepia';
const searchInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');
const results = document.getElementById('results');

// 탭 전환
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentTab = tab.dataset.tab;
        searchInput.value = '';
        suggestions.style.display = 'none';
        results.innerHTML = '';
    });
});

// 검색 기능
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query === '') {
        suggestions.style.display = 'none';
        results.innerHTML = '';
        return;
    }

    showSuggestions(query);
    showResults(query);
});

function showSuggestions(query) {
    const currentData = searchData[currentTab];
    const matchedItems = [];

    currentData.forEach(item => {
        const nameMatch = item.name.toLowerCase().includes(query);
        const aliasMatch = item.aliases.some(alias => alias.toLowerCase().includes(query));
        
        if (nameMatch || aliasMatch) {
            matchedItems.push(item);
        }
    });

    if (matchedItems.length > 0) {
        suggestions.innerHTML = matchedItems.map(item => 
            `<div class="suggestion-item" onclick="selectSuggestion('${item.name}')">${item.name}</div>`
        ).join('');
        suggestions.style.display = 'block';
    } else {
        suggestions.style.display = 'none';
    }
}

function selectSuggestion(name) {
    searchInput.value = name;
    suggestions.style.display = 'none';
    showResults(name.toLowerCase());
}

function showResults(query) {
    const currentData = searchData[currentTab];
    const matchedItems = [];

    currentData.forEach(item => {
        const nameMatch = item.name.toLowerCase().includes(query);
        const aliasMatch = item.aliases.some(alias => alias.toLowerCase().includes(query));
        
        if (nameMatch || aliasMatch) {
            matchedItems.push(item);
        }
    });

    if (matchedItems.length > 0) {
        results.innerHTML = matchedItems.map(item => `
            <div class="result-card">
                <div class="result-title">${item.name}</div>
                <div class="result-specs">
                    ${Object.entries(item.specs).map(([key, value]) => `
                        <div class="spec-item">
                            <span class="spec-label">${key}:</span>
                            <span class="spec-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    } else {
        results.innerHTML = '<div class="no-results">검색 결과가 없습니다.</div>';
    }
}

// 외부 클릭 시 추천 검색어 숨기기
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
        suggestions.style.display = 'none';
    }
});
