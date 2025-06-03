// Contoh event klik untuk logout button
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.querySelector('.logout-button');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Logout clicked! Kamu bisa arahkan ke halaman logout yang sebenarnya.');
      // Contoh: window.location.href = 'logout.html';
    });
  }
});
