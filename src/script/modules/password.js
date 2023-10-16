const passwordInput = document.querySelector("#password-input");
const togglePassword = document.querySelector("#toggle-password");
togglePassword.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});
