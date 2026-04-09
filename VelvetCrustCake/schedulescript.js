document.addEventListener('DOMContentLoaded', function() {
    const orderSummary = document.getElementById('order-summary');
    const scheduleDetails = document.getElementById('schedule-details');

    // Load complete order from localStorage
    const completeOrder = JSON.parse(localStorage.getItem('completeOrder'));
    if (completeOrder) {
        const cakeOrder = completeOrder.cakeOrder;

        orderSummary.innerHTML = `
            <p><strong>Customer:</strong> ${completeOrder.name}</p>
            <p><strong>Email:</strong> ${completeOrder.email}</p>
            <p><strong>Phone:</strong> ${completeOrder.phone}</p>
            <p><strong>Cake Size:</strong> ${cakeOrder.size}</p>
            <p><strong>Flavor:</strong> ${cakeOrder.flavor}</p>
            <p><strong>Frosting:</strong> ${cakeOrder.frosting}</p>
            <p><strong>Toppings:</strong> ${cakeOrder.toppings.length > 0 ? cakeOrder.toppings.join(', ') : 'None'}</p>
            <p><strong>Message:</strong> ${cakeOrder.message || 'None'}</p>
            <p><strong>Special Requests:</strong> ${completeOrder.specialRequests || 'None'}</p>
        `;

        scheduleDetails.innerHTML = `
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Pickup/Delivery Date:</strong> ${new Date(completeOrder.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${completeOrder.time}</p>
            <p><strong>Method:</strong> ${completeOrder.delivery === 'delivery' ? 'Delivery' : 'Pickup'}</p>
            ${completeOrder.delivery === 'delivery' ? `<p><strong>Address:</strong> ${completeOrder.address}</p>` : ''}
            <p><strong>Status:</strong> Order Confirmed - Preparation Starting</p>
        `;
    } else {
        // If no order data, redirect to home
        window.location.href = 'home.html';
    }
});