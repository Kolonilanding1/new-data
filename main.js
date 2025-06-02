const users = [
  { username: "admin1", password: "123", role: "admin" },
  { username: "admin2", password: "456", role: "admin" },
  { username: "owner", password: "owner12", role: "owner" },
];

function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  const user = users.find(uData => uData.username === u && uData.password === p);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = user.role === "owner" ? "pengajuan.html" : "pengajuan.html";
  } else {
    alert("Username atau password salah!");
  }
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

window.onload = function () {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const page = window.location.pathname.split("/").pop();

  if (!user && page !== "index.html") {
    window.location.href = "index.html";
  }

  if (page === "statistik.html" && user.role !== "owner") {
    alert("Hanya owner yang bisa melihat statistik!");
    window.location.href = "pengajuan.html";
  }

  if (page === "statistik.html") {
    tampilkanStatistik();
  }
}

document.getElementById("formPinjaman")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const nama = document.getElementById("namaPeminjam").value.trim();
  const jumlah = parseFloat(document.getElementById("jumlahPinjam").value);
  const tanggal = document.getElementById("tanggalAmbil").value;
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!nama || !jumlah || !tanggal) {
    alert("Semua kolom wajib diisi!");
    return;
  }

  const data = JSON.parse(localStorage.getItem("dataPinjaman")) || [];
  data.push({ nama, jumlah, tanggal, admin: user.username, bunga: 5 });
  localStorage.setItem("dataPinjaman", JSON.stringify(data));

  alert("Pengajuan berhasil!");
  document.getElementById("formPinjaman").reset();
});

function tampilkanStatistik() {
  const tbody = document.querySelector("#tablePeminjam tbody");
  const statRingkasan = document.getElementById("statRingkasan");
  tbody.innerHTML = "";

  const data = JSON.parse(localStorage.getItem("dataPinjaman")) || [];
  let total = 0, totalBunga = 0;

  const bulanTahun = {};
  data.forEach(item => {
    const date = new Date(item.tanggal);
    const key = `${date.getMonth() + 1}-${date.getFullYear()}`;
    bulanTahun[key] = true;

    const bunga = item.jumlah * (item.bunga || 5) / 100;
    total += item.jumlah;
    totalBunga += bunga;

    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${item.nama}</td><td>Rp ${item.jumlah.toLocaleString('id-ID')}</td><td>${new Date(item.tanggal).toLocaleDateString('id-ID')}</td><td>${item.admin}</td><td>${item.bunga}%</td>`;
    tbody.appendChild(tr);
  });

  statRingkasan.innerHTML = `<p>Total Modal: Rp ${total.toLocaleString('id-ID')}</p><p>Total Bunga: Rp ${totalBunga.toLocaleString('id-ID')}</p><p>Total Pemasukan: Rp ${(total + totalBunga).toLocaleString('id-ID')}</p>`;

  tampilkanGrafik(data);
}

function tampilkanGrafik(data) {
  const ctx = document.getElementById("statChart").getContext("2d");
  const perBulan = {};

  data.forEach(item => {
    const date = new Date(item.tanggal);
    const label = `${date.toLocaleString('id-ID', { month: 'short' })} ${date.getFullYear()}`;
    perBulan[label] = (perBulan[label] || 0) + item.jumlah;
  });

  const labels = Object.keys(perBulan);
  const values = Object.values(perBulan);

  if (window.myChart) window.myChart.destroy();

  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Pinjaman',
        data: values,
        backgroundColor: '#007bff'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
