document.addEventListener('DOMContentLoaded', function() {
    const cakeDetails = document.getElementById('cake-details');
    const orderForm = document.getElementById('order-form');
    const deliverySelect = document.getElementById('delivery');
    const addressGroup = document.getElementById('address-group');

    // Load cake order from localStorage
    const cakeOrder = JSON.parse(localStorage.getItem('cakeOrder'));
    if (cakeOrder) {
        cakeDetails.innerHTML = `
            <p><strong>Size:</strong> ${cakeOrder.size}</p>
            <p><strong>Flavor:</strong> ${cakeOrder.flavor}</p>
            <p><strong>Frosting:</strong> ${cakeOrder.frosting}</p>
            <p><strong>Toppings:</strong> ${cakeOrder.toppings.length > 0 ? cakeOrder.toppings.join(', ') : 'None'}</p>
            <p><strong>Message:</strong> ${cakeOrder.message || 'None'}</p>
        `;
    }

    // Toggle delivery address field
    deliverySelect.addEventListener('change', function() {
        if (this.value === 'delivery') {
            addressGroup.style.display = 'block';
            document.getElementById('address').required = true;
        } else {
            addressGroup.style.display = 'none';
            document.getElementById('address').required = false;
        }
    });

    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(orderForm);
        const orderData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            date: formData.get('date'),
            time: formData.get('time'),
            delivery: formData.get('delivery'),
            address: formData.get('address'),
            specialRequests: formData.get('special-requests'),
            cakeOrder: cakeOrder
        };

        // Store complete order in localStorage
        localStorage.setItem('completeOrder', JSON.stringify(orderData));

        // Redirect to schedule page
        window.location.href = 'schedule.html';
    });
});