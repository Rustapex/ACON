// 🎯 DOM 요소 가져오기
const searchInput = document.getElementById('searchInput');
const spotifyFrame = document.getElementById('spotifyFrame');
const searchHistory = document.getElementById('searchHistory');
const similarArtistsPanel = document.getElementById('similarArtists');

// 🎵 유사 아티스트 샘플 데이터
const similarArtistsMap = {
  "gongwon": ["규리", "이영훈", "김윤희"],
  "규리": ["gongwon", "CHEEZE", "cookie"],
  "이영훈": ["gongwon", "정우", "산하"],
  "김윤희": ["gongwon", "백예린", "찬열"],
};

// 🔍 검색 이벤트 리스너
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const keyword = e.target.value.trim();
    if (keyword) {
      updateIframe(keyword);
      addToHistory(keyword);
      showSimilarArtists(keyword);
    }
  }
});

// 🧭 iframe 업데이트 함수
function updateIframe(keyword) {
  const encoded = encodeURIComponent(keyword + ' radio');
  spotifyFrame.src = `https://open.spotify.com/embed/search/${encoded}`;
}

// 📚 검색 히스토리 추가
function addToHistory(keyword) {
  const li = document.createElement('li');
  li.textContent = keyword;
  li.addEventListener('click', () => {
    updateIframe(keyword);
    showSimilarArtists(keyword);
  });
  searchHistory.prepend(li);
}

// 🤝 유사 아티스트 버튼 생성
function showSimilarArtists(artist) {
  similarArtistsPanel.innerHTML = ''; // 초기화

  const current = document.createElement('button');
  current.textContent = `🔁 ${artist}`;
  current.onclick = () => updateIframe(artist);
  similarArtistsPanel.appendChild(current);

  const similar = similarArtistsMap[artist] || [];
  similar.forEach(name => {
    const btn = document.createElement('button');
    btn.textContent = name;
    btn.onclick = () => {
      updateIframe(name);
      showSimilarArtists(name);
    };
    similarArtistsPanel.appendChild(btn);
  });
}
