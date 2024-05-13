document.addEventListener('DOMContentLoaded', async function () {
  try {
    var request = await fetch('api/read.php');

    var response = await request.json();

    ensureStatusCode(request, response);

    const container = document.querySelector('.products-area-wrapper');

    setState(data, container);

    container.addEventListener('click', async (event) => {
      if (event.target.classList.contains('edit-button')) {
        const id = event.target.closest('.products-row').querySelector('.id').textContent;
        alert(`Edit ${id}`); // Tempat untuk fungsi edit
      } else if (event.target.classList.contains('delete-button')) {
        await deleteData(event, container);
      }
    });
  } catch (e) {
    console.error(e);
  }
});

/**
 * Fungsi yang digunakan untuk menghapus data dari server.\
 * Setelah konfirmasi dari pengguna, data dihapus melalui API dan tampilan di-update.
 * 
 * @param {Event} event - Event yang memicu fungsi, biasanya click event.
 * @param {Element} container - Elemen DOM yang berisi baris produk, biasanya berupa div dengan class `.products-area-wrapper`.
*/
async function deleteData(event, container) {
  const id = event.target.closest('.products-row').querySelector('.id').textContent.replace('Id:', '').trim();
  const name = event.target.closest('.products-row').querySelector('.name').textContent.replace('Nama:', '').trim();

  const confirmed = confirm(`Hapus ${name}?`);

  if (!confirmed) return;

  try {
    var request = await fetch(`api/delete.php?id=${id}`, { method: 'DELETE' });

    var response = await request.json();

    ensureStatusCode(request, response);

    request = await fetch('api/read.php');

    response = await request.json();

    ensureStatusCode(request, response);

    setState(response.data, container);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Fungsi untuk mengupdate tampilan berdasarkan data terkini dari server.\
 * Fungsi ini membersihkan container dan mengisi ulang dengan data yang ada atau menampilkan pesan jika tidak ada data.\
 * \
 * Gunakan fungsi ini ketika terjadi perubahan pada data, misalnya setelah create, update, atau delete.\
 * \
 * Bisa juga digunakan ketika data di read pertama kali.
 * 
 * @param {Array} data - Array objek produk yang diterima dari API.
 * @param {Element} container - Elemen DOM yang akan di-update dengan data baru, biasanya berupa div dengan class `.products-area-wrapper`.
*/
function setState(data, container) {
  container.innerHTML = '';

  if (data && data.length > 0) {
    data.forEach(item => {
      const row = document.createElement('div');
      row.className = 'products-row';

      const idCell = document.createElement('div');
      idCell.className = 'product-cell id';
      idCell.innerHTML = `<span class="cell-label">Id:</span>${item.id}`;
      row.appendChild(idCell);

      const nameCell = document.createElement('div');
      nameCell.className = 'product-cell name';
      nameCell.innerHTML = `<span class="cell-label">Nama:</span>${item.name}`;
      row.appendChild(nameCell);

      const priceCell = document.createElement('div');
      priceCell.className = 'product-cell price';
      priceCell.innerHTML = `<span class="cell-label">Harga:</span>Rp${item.price}`;
      row.appendChild(priceCell);

      const descriptionCell = document.createElement('div');
      descriptionCell.className = 'product-cell description';
      descriptionCell.innerHTML = `<span class="cell-label">Deskripsi:</span>${item.description}`;
      row.appendChild(descriptionCell);

      const actionCell = document.createElement('div');
      actionCell.className = 'product-cell action';
      actionCell.innerHTML = `<button class="edit-button">Edit</button> <button class="delete-button">Hapus</button>`;
      row.appendChild(actionCell);

      container.appendChild(row);
    });
  } else {
    container.innerHTML = '<p>No products available.</p>';
  }
}

/**
 * Memastikan bahwa status response dari fetch sesuai dengan ekspektasi (misalnya, status OK).\
 * Jika status response tidak sesuai, fungsi ini akan melempar error.
 * 
 * @param {Response} request - Objek response dari fetch API.
 * @param {Object} response - Objek yang di-parse dari JSON response yang mungkin berisi pesan error atau data lain.
*/
function ensureStatusCode(request, response) {
  if (!request.ok) throw new Error(`Error while trying to fetch data: ${response.message}`);
}

document.querySelector(".jsFilter").addEventListener("click", function () {
  document.querySelector(".filter-menu").classList.toggle("active");
});

document.querySelector(".grid").addEventListener("click", function () {
  document.querySelector(".list").classList.remove("active");
  document.querySelector(".grid").classList.add("active");
  document.querySelector(".products-area-wrapper").classList.add("gridView");
  document
    .querySelector(".products-area-wrapper")
    .classList.remove("tableView");
});

document.querySelector(".list").addEventListener("click", function () {
  document.querySelector(".list").classList.add("active");
  document.querySelector(".grid").classList.remove("active");
  document.querySelector(".products-area-wrapper").classList.remove("gridView");
  document.querySelector(".products-area-wrapper").classList.add("tableView");
});

var modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', function () {
  document.documentElement.classList.toggle('light');
  modeSwitch.classList.toggle('active');
});