document.addEventListener('DOMContentLoaded', function() {
    const sizeSelect = document.getElementById('size');
    const flavorSelect = document.getElementById('flavor');
    const frostingSelect = document.getElementById('frosting');
    const toppingsCheckboxes = document.querySelectorAll('.toppings input');
    const messageInput = document.getElementById('message');
    const cakeImage = document.getElementById('cake-image');
    const proceedBtn = document.getElementById('proceed-order');

    const flavorImages = {
        'chocolate': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYzrxLOjZkZxpg1v8PBrS4adabutpqxdqNNg&s',
        'vanilla': 'https://www.seriouseats.com/thmb/aJRoRhN0yFe8LXFz1CGJ_pekjp0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2017__05__20170412-vanilla-layer-cake-vicky-wasik-23-5da8c6517dcd43da91f048a75f6e8bc5.jpg',
        'strawberry': 'https://grandbaby-cakes.com/wp-content/uploads/2020/06/strawberry-shortcake-cake-25.jpg',
        'lemon': 'https://preppykitchen.com/wp-content/uploads/2022/06/Lemon-Cake-Recipe.jpg',
        'red-velvet': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4H_upkKpj3kwNyECs89KDUSHegVW3xTy66A&s',
        'carrot': 'https://static01.nyt.com/images/2026/03/19/multimedia/19FD-carrotcake-tkgm/19FD-carrotcake-tkgm-googleFourByThree.jpg'
    };

    function updateCakeImage() {
        const selectedFlavor = flavorSelect.value;
        cakeImage.src = flavorImages[selectedFlavor];
    }

    flavorSelect.addEventListener('change', updateCakeImage);

    proceedBtn.addEventListener('click', function() {
        const selectedSize = sizeSelect.value;
        const selectedFlavor = flavorSelect.value;
        const selectedFrosting = frostingSelect.value;
        const selectedToppings = Array.from(toppingsCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        const message = messageInput.value;

        const cakeOrder = {
            size: selectedSize,
            flavor: selectedFlavor,
            frosting: selectedFrosting,
            toppings: selectedToppings,
            message: message
        };

        // Store in localStorage for the next page
        localStorage.setItem('cakeOrder', JSON.stringify(cakeOrder));

        // Redirect to order page
        window.location.href = 'order.html';
    });

    // Initialize
    updateCakeImage();
});