function handleForm(form) {
    const card = document.querySelector('.business-card');

    ['orgname', 'fullname', 'job_title', 'email', 'address'].forEach(fieldName => {
        const input = form.elements[fieldName];
        const cardElement = card.querySelector(`.card-item--${fieldName}`);
        if (input && cardElement) {
            cardElement.textContent = input.value;
        }
    });

    const phoneInputs = form.querySelectorAll('input[name="phone"]');
    const cardPhonesContainer = card.querySelector('.card-item--phones');
    cardPhonesContainer.innerHTML = ''; 
    phoneInputs.forEach(input => {
        if (input.value) { 
            const phoneDiv = document.createElement('div');
            phoneDiv.className = 'card-info';
            phoneDiv.textContent = input.value;
            cardPhonesContainer.appendChild(phoneDiv);
        }
    });

     ['fullname', 'job_title'].forEach(fieldName => {
        const cardElement = card.querySelector(`.card-item--${fieldName}`);
        if (!cardElement) return; 
        
        const colorInput = form.querySelector(`input[name="${fieldName}_color"]:checked`);
        if (colorInput) cardElement.style.color = colorInput.value;

        const alignInput = form.querySelector(`input[name="${fieldName}_align"]:checked`);
        if (alignInput) cardElement.style.textAlign = alignInput.value;

        const sizeInput = form.querySelector(`input[name="${fieldName}_size"]:checked`);
        if (sizeInput) cardElement.style.fontSize = sizeInput.value;
    });

    ['email', 'address'].forEach(fieldName => {
        const cardElement = card.querySelector(`.card-item--${fieldName}`);
        const checkbox = form.elements[`${fieldName}_show`];
        if (cardElement && checkbox) {
            cardElement.style.display = checkbox.checked ? 'block' : 'none';
        }
    });
}

document.addEventListener('click', function(event) {
    const addBtn = event.target.closest('button[name="add-phone-btn"]');
    const removeBtn = event.target.closest('.remove-phone-btn');

    if (addBtn) {
        const phoneFieldsContainer = addBtn.previousElementSibling;
        const phoneFields = phoneFieldsContainer.querySelectorAll('.phone-field-wrapper');

        const maxPhones = 3;
        if (phoneFields.length >= maxPhones) {
            alert(`Вы можете добавить не более ${maxPhones} номеров.`);
            return;
        }

        const newPhoneField = document.createElement('div');
        newPhoneField.className = 'phone-field-wrapper';
        newPhoneField.innerHTML = `
            <label>Телефон</label>
            <input type="text" name="phone">
            <button type="button" class="remove-phone-btn">
                <img src="./img/minus.png" alt="Удалить">
            </button>
        `;
        phoneFieldsContainer.appendChild(newPhoneField);
    }

    if (removeBtn) {
        removeBtn.closest('.phone-field-wrapper').remove();
    }
});

