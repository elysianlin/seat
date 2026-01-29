function generateSeats() {
  const cols = document.getElementById("cols").value;
  const rows = document.getElementById("rows").value;
  const seatsDiv = document.getElementById("seats");

  seatsDiv.innerHTML = "";
  seatsDiv.style.gridTemplateColumns = `repeat(${cols}, 100px)`;

  for (let i = 0; i < cols * rows; i++) {
    const seat = document.createElement("div");
    seat.className = "seat";
    seat.addEventListener("click", () => placeStudent(seat));
    seatsDiv.appendChild(seat);
  }
}

function placeStudent(seat) {
  const nameInput = document.getElementById("studentName");
  const photoInput = document.getElementById("studentPhoto");

  if (!nameInput.value || photoInput.files.length === 0) {
    alert("Please enter a student name and select a photo.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    seat.innerHTML = `
      <img src="${reader.result}">
      <div class="name">${nameInput.value}</div>
    `;
    seat.classList.add("filled");
  };
  reader.readAsDataURL(photoInput.files[0]);
}
