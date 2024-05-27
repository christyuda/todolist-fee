import { endpointLogin } from "../js/url.js";

document
  .getElementById("signInButton")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const emailOrUsername = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = {
      username: emailOrUsername,
      password: password,
    };

    fetch(endpointLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Password salah. Silakan coba lagi.");
          } else {
            throw new Error(
              "Terjadi kesalahan pada server. Silakan coba lagi nanti."
            );
          }
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        if (data.token) {
          localStorage.setItem("LOGIN", data.token);
          document.cookie = `LOGIN=${data.token};path=/;max-age=3600`;
          Swal.fire({
            icon: "success",
            title: "Login Berhasil",
            text: "Anda akan diarahkan ke halaman dashboard",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "dashboard.html";
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Token tidak diterima",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error Login",
          text: error.message,
        });
      });
  });
