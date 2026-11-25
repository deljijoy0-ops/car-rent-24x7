/* ==========================================================================
   VEHICLE RENTAL SYSTEM - SIMPLE JAVASCRIPT
   1. Stores Cars (₹2000 base), Bikes (₹1000 base), and Scooters (₹750 base)
      along with popular brands and allotted 24-hour rates.
   2. Filters vehicles by category (All, Car, Bike, Scooter).
   3. Calculates total rent based on selected vehicle and number of days (24hrs).
   ========================================================================== */

// 1. Vehicle Data Array (Cars, Bikes, Scooters with Brands & 24-Hour Rates)
const vehicles = [
    // ================= CARS (Standard 24 Hrs Rate: ₹2000+) =================
    {
        id: 1,
        category: "Car",
        brand: "Maruti Suzuki",
        model: "Maruti Swift VXI",
        specs: "5 Seater | Petrol | Manual | AC",
        rate24hr: 2000
    },
    {
        id: 2,
        category: "Car",
        brand: "Hyundai",
        model: "Hyundai i20 Sportz",
        specs: "5 Seater | Petrol | Manual | AC",
        rate24hr: 2000
    },
    {
        id: 3,
        category: "Car",
        brand: "Tata Motors",
        model: "Tata Nexon XM",
        specs: "5 Seater SUV | Diesel | Manual | AC",
        rate24hr: 2300
    },
    {
        id: 4,
        category: "Car",
        brand: "Mahindra",
        model: "Mahindra Thar 4x4",
        specs: "4 Seater SUV | Diesel | Automatic | Convertible",
        rate24hr: 3000
    },
    {
        id: 5,
        category: "Car",
        brand: "Toyota",
        model: "Toyota Innova Crysta",
        specs: "7 Seater MUV | Diesel | Manual | Dual AC",
        rate24hr: 3200
    },

    // ================= BIKES (Standard 24 Hrs Rate: ₹1000+) =================
    {
        id: 6,
        category: "Bike",
        brand: "Bajaj",
        model: "Bajaj Pulsar 150",
        specs: "150cc | Petrol | Disc Brake | 45 kmpl",
        rate24hr: 1000
    },
    {
        id: 7,
        category: "Bike",
        brand: "TVS",
        model: "TVS Apache RTR 160",
        specs: "160cc | Petrol | ABS | Digital Meter",
        rate24hr: 1000
    },
    {
        id: 8,
        category: "Bike",
        brand: "Yamaha",
        model: "Yamaha MT-15 V2",
        specs: "155cc | Petrol | Liquid Cooled | 6-Speed",
        rate24hr: 1200
    },
    {
        id: 9,
        category: "Bike",
        brand: "Royal Enfield",
        model: "Royal Enfield Classic 350",
        specs: "350cc | Petrol | Cruiser | Dual Channel ABS",
        rate24hr: 1400
    },

    // ================= SCOOTERS (Standard 24 Hrs Rate: ₹750+) =================
    {
        id: 10,
        category: "Scooter",
        brand: "Honda",
        model: "Honda Activa 6G",
        specs: "110cc | Petrol | Automatic | 50 kmpl",
        rate24hr: 750
    },
    {
        id: 11,
        category: "Scooter",
        brand: "TVS",
        model: "TVS Jupiter 125",
        specs: "125cc | Petrol | Automatic | Large Boot",
        rate24hr: 750
    },
    {
        id: 12,
        category: "Scooter",
        brand: "Suzuki",
        model: "Suzuki Access 125",
        specs: "125cc | Petrol | Automatic | Bluetooth Console",
        rate24hr: 800
    },
    {
        id: 13,
        category: "Scooter",
        brand: "Ola Electric",
        model: "Ola S1 Pro (EV)",
        specs: "Electric | 150 km Range | Fast Charging",
        rate24hr: 850
    }
];

// 2. Function to display vehicles on the webpage
function displayVehicles(selectedCategory, clickedButton) {
    const grid = document.getElementById("vehicleGrid");
    let cardsHTML = "";

    // Update active state on filter buttons if a button was clicked
    if (clickedButton) {
        const buttons = document.querySelectorAll(".filter-btn");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("active");
        }
        clickedButton.classList.add("active");
    }

    // Loop through vehicles and create HTML cards
    for (let i = 0; i < vehicles.length; i++) {
        const v = vehicles[i];

        if (selectedCategory === "All" || v.category === selectedCategory) {
            cardsHTML += `
                <div class="vehicle-card">
                    <div>
                        <span class="badge">${v.category}</span>
                        <h3>${v.model}</h3>
                        <p class="brand-name">Brand: <strong>${v.brand}</strong></p>
                        <div class="specs">${v.specs}</div>
                    </div>
                    <div class="card-footer">
                        <div class="rate-text">
                            ₹${v.rate24hr} <small>/ 24 Hrs</small>
                        </div>
                        <button class="rent-btn" onclick="selectVehicleForBooking(${v.id})">
                            Select to Rent
                        </button>
                    </div>
                </div>
            `;
        }
    }

    grid.innerHTML = cardsHTML;
}

// 3. Populate the Dropdown Menu in the Booking Calculator
function loadBookingDropdown() {
    const selectBox = document.getElementById("vehicleSelect");
    let optionsHTML = `<option value="">-- Choose a Vehicle --</option>`;

    for (let i = 0; i < vehicles.length; i++) {
        const v = vehicles[i];
        optionsHTML += `<option value="${v.id}">${v.category}: ${v.model} (${v.brand}) — ₹${v.rate24hr} / 24 Hrs</option>`;
    }

    selectBox.innerHTML = optionsHTML;
}

// 4. When user clicks "Select to Rent" on a card, scroll to form & select it
function selectVehicleForBooking(vehicleId) {
    const selectBox = document.getElementById("vehicleSelect");
    selectBox.value = vehicleId;

    // Smooth scroll down to the booking calculator box
    document.getElementById("bookingSection").scrollIntoView({ behavior: "smooth" });
}

// 5. Calculate Total Rent & Display Booking Summary
function calculateRent() {
    const customerName = document.getElementById("customerName").value.trim();
    const selectedId = parseInt(document.getElementById("vehicleSelect").value);
    const days = parseInt(document.getElementById("rentDays").value);
    const resultBox = document.getElementById("bookingResult");

    // Simple validation check
    if (customerName === "") {
        alert("Please enter your name.");
        return;
    }
    if (!selectedId) {
        alert("Please select a vehicle to rent.");
        return;
    }
    if (isNaN(days) || days < 1) {
        alert("Please enter a valid number of days (at least 1 day / 24 hrs).");
        return;
    }

    // Find the selected vehicle object
    let chosenVehicle = null;
    for (let i = 0; i < vehicles.length; i++) {
        if (vehicles[i].id === selectedId) {
            chosenVehicle = vehicles[i];
            break;
        }
    }

    // Calculate Total Rent = 24-Hr Rate * Number of Days
    const totalAmount = chosenVehicle.rate24hr * days;
    const totalHours = days * 24;

    // Display the summary inside #bookingResult
    resultBox.style.display = "block";
    resultBox.innerHTML = `
        <h4>Booking Estimate Confirmed!</h4>
        <p><strong>Customer Name:</strong> ${customerName}</p>
        <p><strong>Selected Vehicle:</strong> ${chosenVehicle.model} (${chosenVehicle.brand} - ${chosenVehicle.category})</p>
        <p><strong>Rate per 24 Hours:</strong> ₹${chosenVehicle.rate24hr}</p>
        <p><strong>Duration:</strong> ${days} Day(s) (${totalHours} Hours)</p>
        <hr style="margin: 8px 0; border: 0; border-top: 1px solid #10b981;">
        <p style="font-size: 18px;"><strong>Total Rent Payable: ₹${totalAmount}</strong></p>
    `;
}

// 6. Initialize webpage on load
window.onload = function () {
    displayVehicles("All", null);
    loadBookingDropdown();
};
