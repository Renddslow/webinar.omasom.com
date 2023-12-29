(() => {
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    console.log(form);
  });
})();
