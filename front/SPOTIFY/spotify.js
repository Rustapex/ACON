<script>
   /* 🎯 공연 패널 토글 스크립트 */
  const toggleBtn = document.getElementById('toggleRightPanel');
  const rightPanel = document.getElementById('festivalPanel');

  toggleBtn.addEventListener('click', () => {
    rightPanel.classList.toggle('show');
  });
</script>
