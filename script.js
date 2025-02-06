// Get input fields
const weightInput = document.getElementById("weight");
const feetInput = document.getElementById("feet");
const inchesInput = document.getElementById("inches");
const modal = document.getElementById("bmiModal");
const okBtn = document.getElementById("okBtn");

// Function to calculate BMI
function calculateBMI() {
    const weight = Number(weightInput.value);
    const feet = Number(feetInput.value);
    const inches = Number(inchesInput.value);

    if (weight === 0 || feet === 0) {
        showModal("Please enter valid weight and height.");
        return;
    }

    const heightInCM = (feet * 30.48) + (inches * 2.54);
    const heightInMeters = heightInCM / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiFixed = bmi.toFixed(2);

    let category = "";
    if (bmi < 18.5) {
        category = "You're underweight. Take care of your health!";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = "You're normal. Keep it up!";
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = "You're overweight. Take care of your health!";
    } else {
        category = "You're in danger & need to take care of your health!";
    }

    showModal(`Your BMI is <b>${bmiFixed}</b>.<br>${category}`);
}

// Function to handle "Enter" keypress
function handleEnter(event) {
    if (event.key === "Enter") {
        if (document.activeElement === weightInput) {
            feetInput.focus();  // Move to feet input
        } else if (document.activeElement === feetInput) {
            inchesInput.focus();  // Move to inches input
        } else if (document.activeElement === inchesInput) {
            calculateBMI();  // Calculate BMI and show modal
        } else if (document.activeElement === okBtn) {
            closeModal();  // Close modal if "OK" is focused and Enter is pressed
        } else if (modal.style.display === "block") {
            okBtn.focus();  // Focus on the "OK" button in the modal after it's shown
        }
    }
}

// Add event listeners to input fields & document
weightInput.addEventListener("keydown", handleEnter);
feetInput.addEventListener("keydown", handleEnter);
inchesInput.addEventListener("keydown", handleEnter);
okBtn.addEventListener("keydown", handleEnter); // Add Enter key functionality for OK button

document.addEventListener("keydown", handleEnter); // Modal Close on Enter

// Show Modal Function
function showModal(message) {
    document.getElementById("bmiResult").innerHTML = message;
    modal.style.display = "block";
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);
}

// Close Modal Function
function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 400);
}
