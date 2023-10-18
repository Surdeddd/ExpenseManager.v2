import app from "../../config/firebase.config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
const auth = getAuth(app);
document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.getElementById("registration-form");
  const error1 = document.getElementById("error-container");
  const nameInput = document.getElementById("name-input");
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  nameInput.addEventListener("keydown", function (e) {
    if (/\d/.test(e.key)) {
      e.preventDefault();
    }
  });
  nameInput.addEventListener("input", function (e) {
    const input = e.target;
    const firstLetter = input.value.charAt(0);
    const restOfName = input.value.slice(1);
    const formattedInput = firstLetter.toUpperCase() + restOfName;
    input.value = formattedInput;
  });
  //проверка на гланую букву ицивры в имени
  signUpForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name-input").value;
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    if (!name) {
      error1.innerText = "Введите имя";
      setTimeout(() => {
        error1.innerText = "";
      }, 3000);
      return;
    }
    if (!password) {
      error1.innerText = "Введите пароль";
      setTimeout(() => {
        error1.innerText = "";
      }, 3000);
      return;
    }
    if (!email) {
      error1.innerText = "Введите email";
      setTimeout(() => {
        error1.innerText = "";
      }, 3000);
      return;
    }
    //ошибки при пустых полях
    if (!passwordPattern.test(password)) {
      let errorText = "";
      if (!/(?=.*[A-Za-z])/.test(password)) {
        errorText = "Пароль должен содержать хотя бы одну букву";
      } else if (!/(?=.*\d)/.test(password)) {
        errorText = "Пароль должен содержать хотя бы одну цифру";
      }
      error1.innerText = errorText;
      setTimeout(() => {
        error1.innerText = "";
      }, 3000);
      return;
    }
    //проверка на пустые поля
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Регистрация прошла успешно!", userCredential);
      Swal.fire({
        icon: "success",
        title: "Отлично",
        text: "Вы успешно зарегистрировались!",
        confirmButtonColor: "#299D91",
      });
      //модальное окно
    } catch (error) {
      console.error("Ошибка при регистрации", error.message);
      switch (error.code) {
        case "auth/email-already-in-use":
          error1.innerText = "Пользоваетль уже существует";
          break;
        case "auth/invalid-email":
          error1.innerText = "Введите корректный email";
          break;
        default:
          error1.innerText = "Произошла ошибка!";
          break;
      }
      setTimeout(() => {
        error1.innerText = "";
      }, 3000);
    }
  });
});
