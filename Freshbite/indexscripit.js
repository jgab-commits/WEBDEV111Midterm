 const cardsContainer = document.getElementById('cardsContainer');
        const menuItems = document.querySelectorAll('.menu-item');
        const infoPanel = document.getElementById('infoPanel');

        // Filtering logic
        menuItems.forEach(button => {
            button.addEventListener('click', () => {
                document.querySelector('.menu-item.active').classList.remove('active');
                button.classList.add('active');
                const category = button.dataset.category;
                document.querySelectorAll('.meal-card').forEach(card => {
                    card.style.display = (category === 'all' || card.dataset.category === category) ? 'block' : 'none';
                });
                infoPanel.innerHTML = '<h2>Meal details</h2><p>Select a card to view calorie and macros details.</p>';
                document.querySelectorAll('.meal-card.selected').forEach(c => c.classList.remove('selected'));
            });
        });

        // Card selection
        cardsContainer.addEventListener('click', (event) => {
            const card = event.target.closest('.meal-card');
            if (!card) return;
            document.querySelectorAll('.meal-card.selected').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            const title = card.querySelector('h2').textContent;
            const description = card.querySelector('p').textContent;
            const category = card.dataset.category;
            const macros = {
                'Berry Oatmeal': '360 kcal - Carbs 52g, Protein 12g, Fat 10g',
                'Grilled Salmon Salad': '420 kcal - Carbs 12g, Protein 34g, Fat 24g',
                'Chicken Stir-Fry': '530 kcal - Carbs 42g, Protein 38g, Fat 18g',
                'Greek Yogurt Parfait': '260 kcal - Carbs 30g, Protein 20g, Fat 8g',
                'Quinoa Bowl': '480 kcal - Carbs 54g, Protein 16g, Fat 19g',
                'Veggie Pasta': '560 kcal - Carbs 70g, Protein 20g, Fat 16g'
            };

            infoPanel.innerHTML = `
                <h2>${title}</h2>
                <p>${description}</p>
                <ul>
                    <li>Category: ${category}</li>
                    <li>${macros[title] || 'Nutrition info not available.'}</li>
                    <li>Prep time: 15-30 min</li>
                </ul>
            `;
        });

        const openLoginBtn = document.getElementById('openLogin');
        const rightDrawer = document.getElementById('rightDrawer');
        const drawerBackdrop = document.getElementById('drawerBackdrop');
        const closeDrawer = document.getElementById('closeDrawer');
        const loginForm = document.getElementById('loginForm');

        const drawerOpen = () => {
            rightDrawer.classList.add('open');
            drawerBackdrop.classList.add('open');
        };

        const drawerClose = () => {
            rightDrawer.classList.remove('open');
            drawerBackdrop.classList.remove('open');
        };

        openLoginBtn?.addEventListener('click', drawerOpen);
        closeDrawer?.addEventListener('click', drawerClose);
        drawerBackdrop?.addEventListener('click', drawerClose);

        loginForm?.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Login submitted (demo)');
            drawerClose();
        });
