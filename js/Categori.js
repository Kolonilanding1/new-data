document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.querySelector('.logout-button');

  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Mencegah langsung pindah halaman
      const konfirmasi = confirm("Yakin ingin logout?");

      if (konfirmasi) {
        // Jika dikonfirmasi, arahkan ke halaman utama
        window.location.href = "../index.html";
      }
    });
  }
});
