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

document.addEventListener("DOMContentLoaded", function() {
  validateEntireForm;
});

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

function isDateInTheFuture(date) {
  let today = new Date();
  today.setHours(23, 59, 59, 998);
  if (new Date(date.value).getTime() > today.getTime()) {
    showSucces(date);
    return true;
  } else {
    showError(date, `Date must be not earlier than tomorrow`);
    return false;
  }
}

function validateName() {
  sessionStorage.setItem('isNameLongEnough', checkLength(name, 4));
  if (sessionStorage.getItem('isNameLongEnough') === 'true') {
    sessionStorage.setItem('hasNameGotOnlyLettters', onlyLetters(name));
  }
}

function isNameValid() {
  if ((sessionStorage.isNameLongEnough === 'true' && sessionStorage.hasNameGotOnlyLettters === 'true') || (sessionStorage.isNameLongEnough === 'true' && (sessionStorage.hasNameGotOnlyLettters == undefined))) {
    return true;
  } else {
    return false;
  }
}

function validateSurname() {
  sessionStorage.setItem('isSurnameLongEnough', checkLength(surname, 5));
  if (sessionStorage.getItem('isSurnameLongEnough') === 'true') {
    sessionStorage.setItem('hasSurnameGotOnlyLettters', onlyLetters(surname));
  }
}

function isSurnameValid() {
  if (((sessionStorage.isSurnameLongEnough === 'true' && sessionStorage.hasSurnameGotOnlyLettters === 'true') || (sessionStorage.isSurnameLongEnough === 'true' && (sessionStorage.hasSurnameGotOnlyLettters == undefined)))) {
    console.log(sessionStorage.isSurnameLongEnough)
      return true;
    } else {
      return false;
    }
}

function validateDate() {
  sessionStorage.setItem('isDateSet', checkRequired(date));
  if (sessionStorage.getItem('isDateSet') === 'true') {
    sessionStorage.setItem('isDateInFuture', isDateInTheFuture(date));
  }
}

function isDateValid() {
  if ((sessionStorage.isDateSet === 'true' && sessionStorage.isDateInFuture === 'true') || (sessionStorage.isDateSet === 'true' && (sessionStorage.isDateInFuture == undefined))) {
      return true;
    } else {
      return false;
    }
}

function validateStreet() {
  sessionStorage.setItem('isStreetLongEnough', checkLength(street, 5));
  if (sessionStorage.getItem('isStreetLongEnough') === 'true') {
    sessionStorage.setItem(
      'hasStreetGotOnlyLetttersAndNumbers',
      onlyLettersAndNumbers(street)
    );
  }
}

function isStreetValid() {
  if ((sessionStorage.isStreetLongEnough === 'true' && sessionStorage.hasStreetGotOnlyLetttersAndNumbers === 'true') || (sessionStorage.isStreetLongEnough === 'true' && (sessionStorage.hasStreetGotOnlyLetttersAndNumbers == undefined))) {
      return true;
    } else {
      return false;
    }
}

function isHouseNumberPositiveInteger(houseNumber) {
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

function validateHouseNumber() {
  sessionStorage.setItem(
    'isHouseNumberCorrect',
    isHouseNumberPositiveInteger(houseNumber)
  );
}

function isHouseNumberValid() {
  if (sessionStorage.isHouseNumberCorrect === 'true') {
    return true;
  } else {
    return false;
  }
}

function isFlatNumberPositiveInteger(flatNumber) {
  if (
    Number.isInteger(Number(flatNumber.value.replace(/-/g, ''))) &&
    Number(flatNumber.value.replace(/-/g, '')) > 0
  ) {
    showSucces(flatNumber);
    return true;
  } else {
    showError(flatNumber, 'Flat Number must be a positive integer');
    return false;
  }
}

function validateFlatNumber() {
  sessionStorage.setItem(
    'isFlatNumPosInt',
    isFlatNumberPositiveInteger(flatNumber)
  );
  if (sessionStorage.getItem('isFlatNumPosInt') === 'true') {
    sessionStorage.setItem('isDashUsedCorrectly', isDashUsageCorrect(flatNumber));
  }
}

function isFlatNumberValid() {
  if ((sessionStorage.isFlatNumPosInt === 'true' && sessionStorage.isDashUsedCorrectly === 'true') || (sessionStorage.isFlatNumPosInt === 'true' && (sessionStorage.isDashUsedCorrectly == undefined))) {
      return true;
    } else {
      return false;
    }
}

function isCheckedRadiosMoreThan0(checkedRadios) {
  if (checkedRadios.length == 0) {
    console.log('length 0', checkedRadios)
    showError(form.querySelector('.radio'), 'Payment Type is required');
    return false;
  } else {
    console.log('length not 0', checkedRadios)
    showSucces(form.querySelector('.radio'));
    return true;
  }
}

function validatePaymentType() {
  let checkedRadios = Array.from(document.querySelectorAll('.radio:checked'));
  sessionStorage.setItem(
    'isAnyRadioChecked',
    isCheckedRadiosMoreThan0(checkedRadios)
  );
}

function isPaymentTypeValid() {
  if (sessionStorage.isAnyRadioChecked === 'true') {
    return true;
  } else {
    return false;
  }
}

function isCheckedCheckboxesUpTo2(checkedOnes) {
  if (checkedOnes.length == 0) {
    showSucces(form.querySelector('.checkbox'));
    return true;
  }
  if (checkedOnes.length > 2) {
    showError(form.querySelector('.checkbox'), 'You can choose up to 2 gifts');
    return false;
  } else {
    showSucces(form.querySelector('.checkbox'));
    return true;
  }
}

function validateGiftType() {
  checkedCheckboxes = document.querySelectorAll('.checkbox:checked');
  sessionStorage.setItem(
    'isGiftSelectionsValid',
    isCheckedCheckboxesUpTo2(checkedCheckboxes)
  );
}

function isGiftTypesValid() {
  if (sessionStorage.isGiftSelectionsValid === 'true') {
    return true;
  } else {
    return false;
  }
}

function validateEntireForm() {
  let isNameValid1 = isNameValid();
  let isSurnameValid1 = isSurnameValid();
  let isDateValid1 = isDateValid();
  let isStreetValid1 = isStreetValid();
  let isHouseNumberValid1 = isHouseNumberValid();
  let isFlatNumberValid1 = isFlatNumberValid();
  let isPaymentTypeValid1 = isPaymentTypeValid();
  let isGiftTypesValid1 = isGiftTypesValid();
  if (
    isNameValid1 &&
    isSurnameValid1 &&
    isDateValid1 &&
    isStreetValid1 &&
    isHouseNumberValid1 &&
    isFlatNumberValid1 &&
    isPaymentTypeValid1 &&
    isGiftTypesValid1
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
  main.querySelector('.modal-summarize').style.display = 'block';
  customer.innerHTML = `Customer: <b>${name.value} ${surname.value}</b>`;
  address.innerHTML = `Address: <b>${street.value} Street House ${houseNumber.value} Flat ${flatNumber.value}</b>`;
  summaryDate.innerHTML = `Your order will arrive at: <b>${date.value}</b>`;
}
