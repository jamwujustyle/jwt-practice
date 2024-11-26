document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const registerBtn = document.querySelector(".register-btn");

  registerBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput;
  });
});
