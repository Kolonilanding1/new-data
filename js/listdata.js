// Data dari JSON
const data = [
  {
    "id": 1,
    "admin": "Dewi",
    "modal_awal_rp": 2000000,
    "modal_awal_dollar": 136,
    "total_pinjaman_rp": 14000000,
    "total_pinjaman_dollar": 952,
    "tgl": "2023-02-18",
    "status": "Belum ACC",
    "peminjam": [
      {"nama": "Rita", "pinjaman_rp": 3000000, "pinjaman_dollar": 200},
      {"nama": "Santi", "pinjaman_rp": 5000000, "pinjaman_dollar": 340},
      {"nama": "Rina", "pinjaman_rp": 6000000, "pinjaman_dollar": 412}
    ]
  },
  {
    "id": 2,
    "admin": "Putra",
    "modal_awal_rp": 4000000,
    "modal_awal_dollar": 270,
    "total_pinjaman_rp": 10000000,
    "total_pinjaman_dollar": 675,
    "tgl": "2023-02-20",
    "status": "ACC",
    "peminjam": [
      {"nama": "Adi", "pinjaman_rp": 4000000, "pinjaman_dollar": 270},
      {"nama": "Toni", "pinjaman_rp": 6000000, "pinjaman_dollar": 405}
    ]
  },
  {
    "id": 3,
    "admin": "Dewi",
    "modal_awal_rp": 4000000,
    "modal_awal_dollar": 270,
    "total_pinjaman_rp": 13000000,
    "total_pinjaman_dollar": 878,
    "tgl": "2023-02-25",
    "status": "Ditolak",
    "peminjam": [
      {"nama": "Rina", "pinjaman_rp": 7000000, "pinjaman_dollar": 475},
      {"nama": "Joni", "pinjaman_rp": 6000000, "pinjaman_dollar": 403}
    ]
  },
  {
    "id": 4,
    "admin": "Budi",
    "modal_awal_rp": 5000000,
    "modal_awal_dollar": 340,
    "total_pinjaman_rp": 12000000,
    "total_pinjaman_dollar": 810,
    "tgl": "2023-03-01",
    "status": "Diblokir",
    "peminjam": [
      {"nama": "Eka", "pinjaman_rp": 8000000, "pinjaman_dollar": 540},
      {"nama": "Fani", "pinjaman_rp": 4000000, "pinjaman_dollar": 270}
    ]
  }
];

// Elements references
const filterAdmin = document.getElementById('filterAdmin');
const filterTanggal = document.getElementById('filterTanggal');
const filterStatus = document.getElementById('filterStatus');
const resetFilters = document.getElementById('resetFilters');
const tableBody = document.getElementById('tableBody');

const modalAwalRupiahElem = document.getElementById('modalAwalRupiah');
const modalAwalDollarElem = document.getElementById('modalAwalDollar');
const totalPinjamanRupiahElem = document.getElementById('totalPinjamanRupiah');
const totalPinjamanDollarElem = document.getElementById('totalPinjamanDollar');

const modalOverlay = document.getElementById('modalOverlay');
const peminjamModal = document.getElementById('peminjamModal');
const modalDesc = document.getElementById('modalDesc');
const closeModalBtn = document.getElementById('closeModal');

let currentFilteredData = [...data];

// Format angka ke Rupiah dan Dollar
function formatRupiah(num) {
  return num.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
}
function formatDollar(num) {
  return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 0 });
}

// Render tabel
function renderTable(dataList) {
  tableBody.innerHTML = '';
  dataList.forEach(item => {
    const tr = document.createElement('tr');
    if (item.status === "Ditolak" || item.status === "Diblokir") {
      tr.classList.add('row-error');
    }
    tr.innerHTML = `
      <td data-label="Admin">${item.admin}</td>
      <td data-label="Modal Awal">${formatRupiah(item.modal_awal_rp)} / ${formatDollar(item.modal_awal_dollar)}</td>
      <td data-label="Total Peminjaman">${formatRupiah(item.total_pinjaman_rp)} / ${formatDollar(item.total_pinjaman_dollar)}</td>
      <td data-label="Tanggal">${item.tgl}</td>
      <td data-label="Status">${item.status}</td>
      <td data-label="Aksi">
        <button class="btn btn-acc" data-id="${item.id}">Lihat Peminjam</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
  // Attach event listener untuk tombol lihat peminjam
  document.querySelectorAll('.btn-acc').forEach(btn => {
    btn.addEventListener('click', openPeminjamModal);
  });
}

// Filter data berdasarkan input
function applyFilters() {
  let filtered = data;

  const adminVal = filterAdmin.value.toLowerCase().trim();
  if (adminVal) {
    filtered = filtered.filter(item => item.admin.toLowerCase().includes(adminVal));
  }

  const tanggalVal = filterTanggal.value;
  if (tanggalVal) {
    filtered = filtered.filter(item => item.tgl === tanggalVal);
  }

  const statusVal = filterStatus.value;
  if (statusVal) {
    filtered = filtered.filter(item => item.status === statusVal);
  }

  currentFilteredData = filtered;
  renderTable(currentFilteredData);
  updateSummary(currentFilteredData);
}

// Reset semua filter
function resetAllFilters() {
  filterAdmin.value = '';
  filterTanggal.value = '';
  filterStatus.value = '';
  currentFilteredData = [...data];
  renderTable(currentFilteredData);
  updateSummary(currentFilteredData);
}

// Update ringkasan modal dan pinjaman dari data yang tampil
function updateSummary(dataList) {
  let modalAwalRpSum = 0;
  let modalAwalDollarSum = 0;
  let totalPinjamanRpSum = 0;
  let totalPinjamanDollarSum = 0;

  dataList.forEach(item => {
    modalAwalRpSum += item.modal_awal_rp;
    modalAwalDollarSum += item.modal_awal_dollar;
    totalPinjamanRpSum += item.total_pinjaman_rp;
    totalPinjamanDollarSum += item.total_pinjaman_dollar;
  });

  modalAwalRupiahElem.textContent = formatRupiah(modalAwalRpSum);
  modalAwalDollarElem.textContent = formatDollar(modalAwalDollarSum);
  totalPinjamanRupiahElem.textContent = formatRupiah(totalPinjamanRpSum);
  totalPinjamanDollarElem.textContent = formatDollar(totalPinjamanDollarSum);
}

// Modal functions
function openPeminjamModal(event) {
  const id = Number(event.target.getAttribute('data-id'));
  const item = data.find(d => d.id === id);
  if (!item) return;

  modalDesc.innerHTML = '';
  if (item.peminjam && item.peminjam.length > 0) {
    const list = document.createElement('ul');
    list.style.paddingLeft = '20px';
    item.peminjam.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.nama} - ${formatRupiah(p.pinjaman_rp)} / ${formatDollar(p.pinjaman_dollar)}`;
      list.appendChild(li);
    });
    modalDesc.appendChild(list);
  } else {
    modalDesc.textContent = 'Tidak ada data peminjam.';
  }

  modalOverlay.style.display = 'block';
  peminjamModal.style.display = 'block';
  closeModalBtn.focus();
}

function closeModal() {
  modalOverlay.style.display = 'none';
  peminjamModal.style.display = 'none';
}

// Event listeners
filterAdmin.addEventListener('input', applyFilters);
filterTanggal.addEventListener('change', applyFilters);
filterStatus.addEventListener('change', applyFilters);
resetFilters.addEventListener('click', resetAllFilters);
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Initial render
renderTable(data);
updateSummary(data);
