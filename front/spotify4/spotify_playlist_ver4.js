const iframes= document.querySelectorAll("main iframe");

const observer = new IntersectionObserver(
    (entries, obs) => {
        entries.forEach(entry => {   
            if (!entry.isIntersecting) return;

            const iframe = entry.target;

            // data-src가 있는 경우에만 src로 주입 아직 로드 안되었다면
            if (!iframe.src && iframe.dataset.src) {
                iframe.src = iframe.dataset.src;
            }
            // 다시 관찰하지 않음
            obs.unobserve(iframe);
        });
      },
    {
        threshold: 0.2 // iframe이 100% 보일 때만 로드
    }
);
// 모든 iframe 관찰 시작
iframes.forEach(iframe => observer.observe(iframe));


// ✅ 좌측 가수 목록 클릭 → 우측 유사가수만 보여주는 로직
const leftLinks = document.querySelectorAll(".artist-link-block");
const rightBlocks = document.querySelectorAll(".dropbtn");

leftLinks.forEach(link => {
  link.addEventListener("click", e => {
    const artistId = link.dataset.artist;

    // 모든 유사가수 블럭 숨김 및 강조 제거
    rightBlocks.forEach(block => {
      block.classList.remove("active", "highlight");
    });

    // 해당 가수 블럭만 보이도록 active + highlight 추가
    const targetBlock = document.querySelector(`.dropbtn[data-artist="${artistId}"]`);
    if (targetBlock) {
      targetBlock.classList.add("active", "highlight");
    }
  });
});