const toggle = document.getElementById("toggle-tema");

toggle.addEventListener("click", () => {
	document.body.classList.toggle("dark");
	toggle.textContent = document.body.classList.contains("dark") ? "Tema chiaro" : "Tema scuro";
});
