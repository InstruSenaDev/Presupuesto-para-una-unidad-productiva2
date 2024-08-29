
if (togglePassword && contraseñaInicio) {
    togglePassword.addEventListener("click", function () {
    const type =
        contraseñaInicio.getAttribute("type") === "password"
        ? "text"
        : "password";
    contraseñaInicio.setAttribute("type", type);
    this.classList.toggle("bx-show");
    this.classList.toggle("bx-hide");
    });
}