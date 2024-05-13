/**
 * Mengambil data dari server dan mengupdate tampilan saat halaman selesai dimuat.
 */
document.addEventListener("DOMContentLoaded", async function () {
  try {
    var request = await fetch("api/read.php");
    var response = await request.json();
    ensureStatusCode(request, response);
    const container = document.querySelector(".products-area-wrapper");
    setState(response.data, container);
    container.addEventListener("click", async (event) => {
      if (event.target.classList.contains("delete-button")) {
        await deleteData(event, container);
      }
    });
  } catch (e) {
    console.error(e);
  }
});

/**
 * Menangani klik pada tombol tambah produk untuk membuka modal tambah data.
 */
document.getElementById("addButton").addEventListener("click", function () {
  document.getElementById("addModal").showModal();
});

/**
 * Menutup modal tambah data.
 */
function closeAddModal() {
  document.getElementById("addModal").close();
}

/**
 * Menangani submit form tambah data, mengirimkan data ke server dan memperbarui tampilan.
 */
document.getElementById("addForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(this);

  try {
    const response = await fetch("api/create.php", {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    if (response.ok) {
      // Refresh data
      const updatedResponse = await fetch("api/read.php");
      const updatedData = await updatedResponse.json();

      setState(
        updatedData.data,
        document.querySelector(".products-area-wrapper")
      );
      closeAddModal();
    } else {
      throw new Error(responseData.message);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
});

/**
 * Membuka modal edit dengan data produk yang akan diedit.
 * @param {Object} productData - Data produk yang akan diisi ke dalam form modal.
 */
function openEditModal(productData) {
  const editModal = document.getElementById("editModal");
  document.getElementById("editId").value = productData.id;
  document.getElementById("editName").value = productData.name;
  document.getElementById("editPrice").value = productData.price;
  document.getElementById("editDescription").value = productData.description;
  editModal.showModal();
}

/**
 * Menutup modal edit.
 */
function closeEditModal() {
  const editModal = document.getElementById("editModal");
  editModal.close();
}

/**
 * Menangani submit form edit data, mengirimkan data yang diedit ke server dan memperbarui tampilan.
 */
document.getElementById("editForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  console.log("Form Data:", Object.fromEntries(formData));

  try {
    const response = await fetch("api/update.php", {
      method: "POST",
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Error updating data");
    }

    const updatedResponse = await fetch("api/read.php");
    const updatedData = await updatedResponse.json();

    setState(
      updatedData.data,
      document.querySelector(".products-area-wrapper")
    );

    closeEditModal();
  } catch (error) {
    console.error("Error:", error);
  }
});

/**
 * Fungsi yang digunakan untuk menghapus data dari server.
 * Setelah konfirmasi dari pengguna, data dihapus melalui API dan tampilan di-update.
 *
 * @param {Event} event - Event yang memicu fungsi, biasanya click event.
 * @param {Element} container - Elemen DOM yang berisi baris produk, biasanya berupa div dengan class `.products-area-wrapper`.
 */
async function deleteData(event, container) {
  const id = event.target
    .closest(".products-row")
    .querySelector(".id")
    .textContent.replace("Id:", "")
    .trim();
  const name = event.target
    .closest(".products-row")
    .querySelector(".name")
    .textContent.replace("Nama:", "")
    .trim();

  const confirmed = confirm(`Hapus ${name}?`);

  if (!confirmed) return;

  try {
    var request = await fetch(`api/delete.php?id=${id}`, { method: "DELETE" });
    var response = await request.json();
    ensureStatusCode(request, response);

    request = await fetch("api/read.php");
    response = await request.json();
    ensureStatusCode(request, response);

    setState(response.data, container);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Fungsi untuk mengupdate tampilan berdasarkan data terkini dari server.
 * Fungsi ini membersihkan container dan mengisi ulang dengan data yang ada atau menampilkan pesan jika tidak ada data.
 * 
 * Gunakan fungsi ini ketika terjadi perubahan pada data, misalnya setelah create, update, atau delete.
 * Bisa juga digunakan ketika data di read pertama kali.
 *
 * @param {Array} data - Array objek produk yang diterima dari API.
 * @param {Element} container - Elemen DOM yang akan di-update dengan data baru, biasanya berupa div dengan class `.products-area-wrapper`.
 */
function setState(data, container) {
  const body = container.querySelector(".products-body");
  body.innerHTML = "";

  if (data && data.length > 0) {
    data.forEach((item) => {
      const row = document.createElement("div");
      row.className = "products-row";

      const idCell = document.createElement("div");
      idCell.className = "product-cell id";
      idCell.innerHTML = `<span class="cell-label">Id:</span>${item.id}`;
      row.appendChild(idCell);

      const nameCell = document.createElement("div");
      nameCell.className = "product-cell name";
      nameCell.innerHTML = `<span class="cell-label">Nama:</span>${item.name}`;
      row.appendChild(nameCell);

      const priceCell = document.createElement("div");
      priceCell.className = "product-cell price";
      priceCell.innerHTML = `<span class="cell-label">Harga:</span>Rp${item.price}`;
      row.appendChild(priceCell);

      const descriptionCell = document.createElement("div");
      descriptionCell.className = "product-cell description";
      const shortDescription = item.description.substring(0, 50);
      descriptionCell.innerHTML = `<span class="cell-label">Deskripsi:</span>${shortDescription}${item.description.length > 50 ? "..." : ""}`;
      row.appendChild(descriptionCell);

      const actionCell = document.createElement("div");
      actionCell.className = "product-cell action";
      actionCell.innerHTML = `<button class="edit-button">Edit</button> <button class="delete-button">Hapus</button>`;
      row.appendChild(actionCell);

      body.appendChild(row);

      const editButton = row.querySelector(".edit-button");
      editButton.addEventListener("click", () => {
        openEditModal(item);
      });
    });
  } else {
    body.innerHTML = "<p>No products available.</p>";
  }
}

/**
 * Memastikan bahwa status response dari fetch sesuai dengan ekspektasi (misalnya, status OK).
 * Jika status response tidak sesuai, fungsi ini akan melempar error.
 *
 * @param {Response} request - Objek response dari fetch API.
 * @param {Object} response - Objek yang di-parse dari JSON response yang mungkin berisi pesan error atau data lain.
 */
function ensureStatusCode(request, response) {
  if (!request.ok) throw new Error(`Error while trying to fetch data: ${response.message}`);
}

// Mengatur tampilan filter
document.querySelector(".jsFilter").addEventListener("click", function () {
  document.querySelector(".filter-menu").classList.toggle("active");
});

// Mengatur tampilan grid
document.querySelector(".grid").addEventListener("click", function () {
  document.querySelector(".list").classList.remove("active");
  document.querySelector(".grid").classList.add("active");
  document.querySelector(".products-area-wrapper").classList.add("gridView");
  document.querySelector(".products-area-wrapper").classList.remove("tableView");
});

// Mengatur tampilan list
document.querySelector(".list").addEventListener("click", function () {
  document.querySelector(".list").classList.add("active");
  document.querySelector(".grid").classList.remove("active");
  document.querySelector(".products-area-wrapper").classList.remove("gridView");
  document.querySelector(".products-area-wrapper").classList.add("tableView");
});

// Mengatur mode switch
var modeSwitch = document.querySelector(".mode-switch");
modeSwitch.addEventListener("click", function () {
  document.documentElement.classList.toggle("light");
  modeSwitch.classList.toggle("active");
});
