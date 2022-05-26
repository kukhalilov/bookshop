const form = document.getElementById('form');
const name = document.getElementById('name');
const surname = document.getElementById('surname');
const date = document.getElementById('date');
const street = document.getElementById('street');
const houseNumber = document.getElementById('house-number');
const flatNumber = document.getElementById('flat-number');
const radios = document.querySelectorAll('.radio');
const checkboxes = document.querySelectorAll('.checkbox');
const submitButton = form.querySelector('button');
let customer = document.querySelector('.customer');
let address = document.querySelector('.address');
let summaryDate = document.querySelector('.date');

//Show input error messages
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//show success colour
function showSucces(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//checkRequired fields
function checkRequired(input) {
  if (input.value.trim() === '') {
    showError(input, `${getFieldName(input)} is required`);
    return false;
  } else {
    showSucces(input);
    return true;
  }
}

//check input Length
function checkLength(input, min) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
    return false;
  } else {
    showSucces(input);
    return true;
  }
}

//get FieldName
function getFieldName(input) {
  return input.previousElementSibling.children[0].textContent.replace(' *', '');
}

function onlyLetters(input) {
  if (/^[a-z]+$/i.test(input.value)) {
    showSucces(input);
    return true;
  } else {
    showError(input, `${getFieldName(input)} must only contain letters`);
    return false;
  }
}

function onlyLettersAndNumbers(input) {
  if (/^[a-z0-9]+$/i.test(input.value)) {
    showSucces(input);
    return true;
  } else {
    showError(
      input,
      `${getFieldName(input)} must only contain letters and numbers`
    );
    return false;
  }
}

function isDashUsageCorrect(input) {
  if (/^[\d]+-?[\d-]*\d+$/.test(input.value) || !input.value.includes('-')) {
    showSucces(input);
    return true;
  } else {
    showError(
      input,
      `Flat Number must not contain dash at the start or end of the input`
    );
    return false;
  }
}

function validateName() {
  let isLongEnough = checkLength(name, 4);
  if (isLongEnough) {
    let hasOnlyLettters = onlyLetters(name);
    if (hasOnlyLettters) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function validateSurname() {
  let isLongEnough = checkLength(surname, 5);
  if (isLongEnough) {
    let hasOnlyLettters = onlyLetters(surname);
    if (hasOnlyLettters) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function validateDate() {
  const today = new Date();
  today.setHours(23, 59, 59, 998);
  let isSet = checkRequired(date);
  if (isSet) {
    if (new Date(date.value).getTime() > today.getTime()) {
      showSucces(date);
      return true;
    } else {
      showError(date, `Date must be not earlier than tomorrow`);
      return false;
    }
  }
}

function validateStreet() {
  let isLongEnough = checkLength(street, 5);
  if (isLongEnough) {
    let hasOnlyLetttersAndNumbers = onlyLettersAndNumbers(street);
    if (hasOnlyLetttersAndNumbers) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function validateHouseNumber() {
  if (
    Number.isInteger(Number(houseNumber.value)) &&
    Number(houseNumber.value) > 0
  ) {
    showSucces(houseNumber);
    return true;
  } else {
    showError(houseNumber, 'House Number must be a positive integer');
    return false;
  }
}

function validateFlatNumber() {
  if (
    Number.isInteger(Number(flatNumber.value.replace(/-/g, ''))) &&
    Number(flatNumber.value.replace(/-/g, '')) > 0
  ) {
    let isDashUsedCorrectly = isDashUsageCorrect(flatNumber);
    if (isDashUsedCorrectly) {
      showSucces(flatNumber);
      return true;
    } else {
      showError(flatNumber, 'You can use dash only in the middle');
      return false;
    }
  } else {
    showError(flatNumber, 'Flat Number must be a positive integer');
    return false;
  }
}

function validatePaymentType() {
  let checkedRadios = document.querySelectorAll('.radio:checked');
  if (checkedRadios.length == 0) {
    showError(form.querySelector('.radio'), 'Payment Type is required');
    return false;
  } else {
    showSucces(form.querySelector('.radio'));
    return true;
  }
}

function validateGiftType() {
  let checkedCheckboxes = document.querySelectorAll('.checkbox:checked');
  if (checkedCheckboxes.length > 2) {
    showError(form.querySelector('.checkbox'), 'You can choose up to 2 gifts');
    return false;
  } else {
    showSucces(form.querySelector('.checkbox'));
    return true;
  }
}

function validateEntireForm() {
  let isNameValid = validateName();
  let isSurnameValid = validateSurname();
  let isDateValid = validateDate();
  let isStreetValid = validateStreet();
  let isHouseNumberValid = validateHouseNumber();
  let isFlatNumberValid = validateFlatNumber();
  let isPaymentTypeValid = validatePaymentType();
  let isGiftTypesValid = validateGiftType();
  if (
    isNameValid &&
    isSurnameValid &&
    isDateValid &&
    isStreetValid &&
    isHouseNumberValid &&
    isFlatNumberValid &&
    isPaymentTypeValid &&
    isGiftTypesValid
  ) {
    submitButton.disabled = false;
    submitButton.addEventListener('click', (ev) => {
      ev.preventDefault();
      showOrderSummarize();
    });
  } else {
    submitButton.disabled = true;
  }
}

function showOrderSummarize() {
    main.querySelector('.modal-summarize').style.display = 'block'
    customer.innerHTML = `Customer: <b>${name.value} ${surname.value}</b>`
    address.innerHTML = `Address: <b>${street.value} Street House ${houseNumber.value} Flat ${flatNumber.value}</b>`
    summaryDate.innerHTML = `Your order will arrive at: <b>${date.value}</b>`
}
