// File: database.js

document.addEventListener("DOMContentLoaded", function () {
  const loginTable = document.querySelector("#loginTable tbody");
  const pengajuanTable = document.querySelector("#pengajuanTable tbody");
  const adminForm = document.getElementById("adminForm");
  const adminTable = document.querySelector("#adminTable tbody");

  // Dummy login data
  const loginHistory = [
    { nama: "Admin1", waktu: "2025-06-04 08:00" },
    { nama: "Admin2", waktu: "2025-06-03 14:25" },
  ];

  loginHistory.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${item.nama}</td><td>${item.waktu}</td>`;
    loginTable.appendChild(row);
  });

  // Dummy pengajuan data
  const pengajuanBulanan = [
    { bulan: "Januari", jumlah: 10, total: 5000000 },
    { bulan: "Februari", jumlah: 8, total: 4000000 },
  ];

  pengajuanBulanan.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${item.bulan}</td><td>${item.jumlah}</td><td>Rp ${item.total.toLocaleString()}</td>`;
    pengajuanTable.appendChild(row);
  });

  // Manajemen admin
  const adminData = [];

  adminForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nama = document.getElementById("adminName").value.trim();
    const saldo = parseInt(document.getElementById("adminSaldo").value);
    if (!nama || isNaN(saldo)) return alert("Nama dan saldo harus diisi dengan benar.");

    adminData.push({ nama, saldo });
    updateAdminTable();
    adminForm.reset();
  });

  function updateAdminTable() {
    adminTable.innerHTML = "";
    adminData.forEach((admin, index) => {
      const row = document.createElement("tr");

      // Buat input nama dan saldo + button topup
      row.innerHTML = `
        <td><input class="admin-name" data-index="${index}" type="text" value="${admin.nama}" /></td>
        <td>Rp ${admin.saldo.toLocaleString()}</td>
        <td><button class="topup-btn" data-index="${index}">Top Up</button></td>
      `;

      adminTable.appendChild(row);
    });
  }

  // Event delegation untuk input nama (update nama) dan button topup
  adminTable.addEventListener("input", function (e) {
    if (e.target.classList.contains("admin-name")) {
      const idx = e.target.dataset.index;
      adminData[idx].nama = e.target.value;
    }
  });

  adminTable.addEventListener("click", function (e) {
    if (e.target.classList.contains("topup-btn")) {
      const idx = e.target.dataset.index;
      const input = prompt("Masukkan jumlah saldo tambahan:");
      const nominal = parseInt(input);
      if (!isNaN(nominal) && nominal > 0) {
        adminData[idx].saldo += nominal;
        updateAdminTable();
      } else {
        alert("Nominal tidak valid.");
      }
    }
  });

});
