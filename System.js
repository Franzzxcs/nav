function showPage(pageId) {
  const pages = document.querySelectorAll('.container');
  const logo = document.querySelector('.sti-logo');

  pages.forEach(page => {
    if (page.id === pageId) {
      page.classList.remove('hidden');
    } else {
      page.classList.add('hidden');
    }
  });

  // Show logo only on home
  if (pageId === 'home') {
    logo.classList.remove('hidden');
  } else {
    logo.classList.add('hidden');
  }

  // If it's a status page, start iframe auto-refresh
  if (pageId.startsWith('status')) {
    startAutoRefreshIframe(pageId);
  } else {
    stopAutoRefreshIframe();
  }
}

function changeRoom(currentRoomId, nextPageId) {
  const currentRoom = document.getElementById(currentRoomId);
  const videos = currentRoom.querySelectorAll('video');
  videos.forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
  showPage(nextPageId);
}

// Refresh iframe logic
let iframeRefreshInterval = null;

function startAutoRefreshIframe(containerId) {
  const container = document.getElementById(containerId);
  const iframe = container.querySelector('iframe');

  if (!iframe) return;

  // Stop previous interval if any
  stopAutoRefreshIframe();

  iframeRefreshInterval = setInterval(() => {
    const src = iframe.getAttribute('src');
    iframe.setAttribute('src', src); // Trigger reload
  }, 5000); // refresh every 5 seconds (adjust as needed)
}

function stopAutoRefreshIframe() {
  if (iframeRefreshInterval) {
    clearInterval(iframeRefreshInterval);
    iframeRefreshInterval = null;
  }
}

// Initial load
window.onload = () => showPage('home');