document.addEventListener('DOMContentLoaded', async function () {
  try {
    var request = await fetch('http://127.0.0.1/kuliah/PWEB/Pertemuan%2013/api/read.php');

    var response = await request.json();

    displayData(response.data);
  } catch (e) {
    console.error(e);
  }
});

function displayData(data) {
  const container = document.querySelector('.products-area-wrapper');

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
      nameCell.innerHTML = `<span class="cell-label">Name:</span>${item.name}`;
      row.appendChild(nameCell);

      const priceCell = document.createElement('div');
      priceCell.className = 'product-cell price';
      priceCell.innerHTML = `<span class="cell-label">Price:</span>Rp${item.price}`;
      row.appendChild(priceCell);

      const descriptionCell = document.createElement('div');
      descriptionCell.className = 'product-cell description';
      descriptionCell.innerHTML = `<span class="cell-label">Description:</span>${item.description}`;
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

  container.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-button')) {
      const id = event.target.closest('.products-row').querySelector('.id').textContent;
      alert(`Edit ${id}`); // Tempat untuk fungsi edit
    } else if (event.target.classList.contains('delete-button')) {
      const id = event.target.closest('.products-row').querySelector('.id').textContent;
      alert(`Delete ${id}`); // Tempat untuk fungsi hapus
    }
  });
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