// main.js

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Data login bisa kamu sesuaikan atau hubungkan ke database/validasi backend
  const validUsername = "admin";
  const validPassword = "123456";

  if (username === validUsername && password === validPassword) {
    alert("Login berhasil!");
    window.location.href = "pages/Categori.html"; // contoh jika di folder 'pages'
  } else {
    alert("Username atau password salah!");
  }
}
