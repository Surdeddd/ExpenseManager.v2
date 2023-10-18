import app from "../../config/firebase.config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(app);
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const errorContainer = document.getElementById("error-container");

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    if (!email) {
      errorContainer.innerText = "Введите email";
      setTimeout(() => {
        errorContainer.innerText = "";
      }, 3000);
      return;
    }

    if (!password) {
      errorContainer.innerText = "Введите пароль";
      setTimeout(() => {
        errorContainer.innerText = "";
      }, 3000);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Успешный вход", userCredential.user);
    } catch (error) {
      console.error("Ошибка входа", error);
      errorContainer.innerText = "неверные данные ";
      setTimeout(() => {
        errorContainer.innerText = "";
      }, 3000);
    }
  });
});
