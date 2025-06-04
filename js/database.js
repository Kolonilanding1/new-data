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
    const nama = document.getElementById("adminName").value;
    const saldo = parseInt(document.getElementById("adminSaldo").value);
    if (!nama || isNaN(saldo)) return;

    adminData.push({ nama, saldo });
    updateAdminTable();
    adminForm.reset();
  });

  function updateAdminTable() {
    adminTable.innerHTML = "";
    adminData.forEach((admin, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><input value="${admin.nama}" onchange="updateNama(${index}, this.value)" /></td>
        <td>Rp ${admin.saldo.toLocaleString()}</td>
        <td>
          <button onclick="topupSaldo(${index})">Top Up</button>
        </td>
      `;
      adminTable.appendChild(row);
    });
  }

  window.topupSaldo = function (index) {
    const topup = prompt("Masukkan jumlah saldo tambahan:");
    const nominal = parseInt(topup);
    if (!isNaN(nominal)) {
      adminData[index].saldo += nominal;
      updateAdminTable();
    }
  };

  window.updateNama = function (index, value) {
    adminData[index].nama = value;
  };
});
