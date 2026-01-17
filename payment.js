function showFields() {
    const method = document.querySelector('input[name="pay"]:checked').value;

    document.getElementById("cardFields").style.display =
        method === "Card" ? "block" : "none";

    document.getElementById("addressField").style.display =
        method === "COD" ? "block" : "none";
}

function makePayment() {
    const username = document.getElementById("username").value.trim();
    const contact = document.getElementById("contact").value.trim();

    if (!username || !contact) {
        alert("Please enter name and contact number");
        return;
    }

    const paymentMethod = document.querySelector('input[name="pay"]:checked');
    if (!paymentMethod) {
        alert("Please select payment method");
        return;
    }

    const method = paymentMethod.value;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = localStorage.getItem("total") || 0;

    let extraDetails = "";

    if (method === "Card") {
        const cardNumber = document.getElementById("cardNumber").value;
        const cardName = document.getElementById("cardName").value;
        const expiry = document.getElementById("expiry").value;
        const cvv = document.getElementById("cvv").value;

        if (!cardNumber || !cardName || !expiry || !cvv) {
            alert("Please fill all card details");
            return;
        }

        extraDetails = `
Card Holder: ${cardName}
Card Number: **** **** **** ${cardNumber.slice(-4)}
Expiry: ${expiry}
`;
    }

    if (method === "COD") {
        const address = document.getElementById("address").value.trim();
        if (!address) {
            alert("Please enter delivery address");
            return;
        }

        extraDetails = `
Delivery Address:
${address}
`;
    }

    let history = `🐾 Lucy Online Pet Store - Order History
----------------------------------
Date: ${new Date().toLocaleString()}

Customer Name: ${username}
Contact Number: ${contact}

Payment Method: ${method}

Items Purchased:
`;

    cart.forEach((item, i) => {
        history += `${i + 1}. ${item.name} - ₹${item.price}\n`;
    });

    history += `
Total Amount: ₹${total}
${extraDetails}
Payment Status: SUCCESS
----------------------------------
`;

    const blob = new Blob([history], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Lucy_PetStore_Order_History.txt";
    link.click();

    localStorage.clear();
    document.getElementById("payStatus").innerText =
    "✅ Payment Successful! Please share your feedback below.";

document.getElementById("feedbackSection").style.display = "block";
}
function saveFeedback() {
    const name = document.getElementById("fbName").value;
    const message = document.getElementById("fbMessage").value;

    if (name === "" || message === "") {
        alert("Please fill all fields");
        return;
    }

    let feedbackText = "🐾 Lucy Pet Store - Feedback\n\n";
    feedbackText += "Name: " + name + "\n";
    feedbackText += "Feedback: " + message + "\n";
    feedbackText += "Date: " + new Date().toLocaleString();

    const blob = new Blob([feedbackText], { type: "text/plain" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "LucyPetStore_Feedback.txt";
    link.click();

    alert("Thank you for your feedback!");

    localStorage.clear();
    window.location.href = "index.html";
}
