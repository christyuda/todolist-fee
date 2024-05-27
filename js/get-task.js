import { endpointGetTasks } from "../js/url.js";
function fetchDataFromEndpoint() {
  const url = endpointGetTasks;
  const token = localStorage.getItem("LOGIN") || "";

  if (token) {
    fetch(url, {
      method: "GET",
      headers: {
        LOGIN: `${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Terjadi kesalahan saat mengambil data. Silakan coba lagi."
          );
        }
        return response.json();
      })
      .then((data) => {
        updateTable(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "warning",
          title: "Perhatian!",
          text: error.message,
        });
      });
  } else {
    Swal.fire({
      icon: "warning",
      title: "Perhatian!",
      text: "Anda belum login. Silakan login terlebih dahulu.",
    }).then(() => {
      window.location.href = "index.html";
    });
  }
}

function updateTable(tasks) {
  const tableBody = document.querySelector(".table tbody");
  tableBody.innerHTML = "";

  tasks.forEach((task) => {
    const row = `<tr>
      <td><i class="fab fa-bootstrap fa-lg text-primary me-3"></i><strong>${
        task.judul
      }</strong></td>
      <td>${task.deskripsi}</td>
      <td>${task.due_date}</td>
      <td><span class="badge bg-label-${
        task.completed === "True" ? "False" : "success"
      } me-1">${task.completed}</span></td>
      <td>
        <div class="dropdown">
          <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
            <i class="bx bx-dots-vertical-rounded"></i>
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Edit</a>
            <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
          </div>
        </div>
      </td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}
fetchDataFromEndpoint();
