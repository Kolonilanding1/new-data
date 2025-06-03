// Fungsi untuk menambah baris form baru
document.querySelector('.add-row').addEventListener('click', () => {
  const container = document.getElementById('form-rows-container');
  const newRow = document.createElement('div');
  newRow.className = 'form-row';

  newRow.innerHTML = `
    <input type="text" placeholder="Nama Admin" />
    <div class="currency-wrapper">
      <span class="currency-prefix">Rp</span>
      <input type="text" class="currency-input" placeholder="Jumlah Rupiah" />
      <div class="step-buttons">
        <button type="button" onclick="stepRupiah(this, 'up')">▲</button>
        <button type="button" onclick="stepRupiah(this, 'down')">▼</button>
      </div>
    </div>
    <div class="currency-wrapper">
      <span class="currency-prefix">$</span>
      <input type="text" class="currency-input" placeholder="Jumlah Dollar" />
      <div class="step-buttons">
        <button type="button" onclick="stepDollar(this, 'up')">▲</button>
        <button type="button" onclick="stepDollar(this, 'down')">▼</button>
      </div>
    </div>
  `;

  container.appendChild(newRow);
});

// Fungsi untuk menambah/kurangi nilai Rupiah
function stepRupiah(button, direction) {
  const input = button.closest('.currency-wrapper').querySelector('input.currency-input');
  let val = parseInt(input.value.replace(/[^\d]/g, '') || '0', 10);

  const step = 10000;

  if (direction === 'up') val += step;
  else if (direction === 'down') val -= step;

  if (val < 0) val = 0;

  input.value = formatRupiah(val);
}

// Fungsi untuk menambah/kurangi nilai Dollar
function stepDollar(button, direction) {
  const input = button.closest('.currency-wrapper').querySelector('input.currency-input');
  let val = parseFloat(input.value.replace(/[^0-9.]/g, '') || '0');

  const step = 1.00;

  if (direction === 'up') val += step;
  else if (direction === 'down') val -= step;

  if (val < 0) val = 0;

  input.value = val.toFixed(2);
}

// Fungsi format Rupiah dengan titik ribuan, tanpa "Rp" di input
function formatRupiah(angka) {
  const numberString = angka.toString();
  const sisa = numberString.length % 3;
  let rupiah = numberString.substr(0, sisa);
  const ribuan = numberString.substr(sisa).match(/\d{3}/g);

  if (ribuan) {
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  return rupiah;
}

// Fungsi untuk pindah halaman kategori
function goToCategory() {
  window.location.href = 'kategori.html';
}

// Fungsi placeholder untuk tombol lanjut
function proceed() {
  alert('Tombol Lanjut ditekan. Fungsi ini bisa disesuaikan sesuai kebutuhan.');
}
