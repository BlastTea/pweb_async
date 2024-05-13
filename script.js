document.addEventListener('DOMContentLoaded', async function() {
  try {

    var request = await fetch('http://127.0.0.1/kuliah/PWEB/Pertemuan%2013/api/read.php');
    
    var response = await request.json();

    displayData(response);
  } catch (e) {
    console.error(e);
  }
});

function displayData(data) {
  const container = document.getElementById('data-container');
  container.innerHTML = ''; // Membersihkan konten yang ada sebelumnya

  // Cek apakah data ada dan memiliki elemen
  if (data && data.length > 0) {
      data.forEach(item => {
          const productDiv = document.createElement('div');
          productDiv.className = 'product';

          // Menambahkan judul nama paket
          const name = document.createElement('h2');
          name.textContent = item.name;
          productDiv.appendChild(name);

          // Menambahkan deskripsi
          const description = document.createElement('p');
          description.textContent = item.description;
          productDiv.appendChild(description);

          // Menambahkan harga
          const price = document.createElement('p');
          price.textContent = `Harga: Rp${item.price}`;
          productDiv.appendChild(price);

          // Tambahkan elemen ke container
          container.appendChild(productDiv);
      });
  } else {
      container.innerHTML = '<p>No products available.</p>';
  }
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