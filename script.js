let selectedStudent = null;

function generateSeats() {
  const cols = document.getElementById("cols").value;
  const rows = document.getElementById("rows").value;
  const seatsDiv = document.getElementById("seats");

  seatsDiv.innerHTML = "";
  seatsDiv.style.gridTemplateColumns = `repeat(${cols}, 100px)`;

  for (let i = 0; i < cols * rows; i++) {
    const seat = document.createElement("div");
    seat.className = "seat";
    seat.addEventListener("click", () => handleSeatClick(seat));
    seatsDiv.appendChild(seat);
  }
}

function handleSeatClick(seat) {
  const nameInput = document.getElementById("studentName");
  const photoInput = document.getElementById("studentPhoto");

  // 🟩 Seat already has a student
  if (seat.dataset.name) {
    // Click same student again → remove
    if (selectedStudent === seat) {
      clearSeat(seat);
      selectedStudent = null;
      return;
    }

    // Select student for moving
    if (!selectedStudent) {
      selectedStudent = seat;
      seat.style.outline = "3px solid orange";
      return;
    }
  }

  // 🟦 Move selected student to empty seat
  if (selectedStudent && !seat.dataset.name) {
    moveStudent(selectedStudent, seat);
    selectedStudent.style.outline = "none";
    selectedStudent = null;
    return;
  }

  // 🟨 Place NEW student (only if not already exists)
  if (!seat.dataset.name) {
    if (!nameInput.value || photoInput.files.length === 0) {
      alert("Please enter a student name and select a photo.");
      return;
    }

    // Prevent duplicate student
    if (isStudentExists(nameInput.value)) {
      alert("This student is already seated.");
      return;
    }

    placeNewStudent(seat, nameInput.value, photoInput.files[0]);
  }
}

function placeNewStudent(seat, name, photoFile) {
  const reader = new FileReader();
  reader.onload = function () {
    seat.innerHTML = `
      <img src="${reader.result}">
      <div class="name">${name}</div>
    `;
    seat.classList.add("filled");
    seat.dataset.name = name;
    seat.dataset.photo = reader.result;
  };
  reader.readAsDataURL(photoFile);
}

function moveStudent(fromSeat, toSeat) {
  toSeat.innerHTML = fromSeat.innerHTML;
  toSeat.classList.add("filled");
  toSeat.dataset.name = fromSeat.dataset.name;
  toSeat.dataset.photo = fromSeat.dataset.photo;

  clearSeat(fromSeat);
}

function clearSeat(seat) {
  seat.innerHTML = "";
  seat.classList.remove("filled");
  seat.style.outline = "none";
  delete seat.dataset.name;
  delete seat.dataset.photo;
}

function isStudentExists(name) {
  const seats = document.querySelectorAll(".seat");
  return Array.from(seats).some(seat => seat.dataset.name === name);
}
