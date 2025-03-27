import {
  createSpanError,
  errorsRemove,
  formatCardNumber,
  viewError,
  formatNames,
} from "./functions.js";

/**
 * @type {HTMLFormElement} tag element form
 * @description tag elemento form
 */
const form = document.querySelector("#form-card-details");
const formGroups = form.querySelectorAll(
  'fieldset[aria-describedby="form-group"]'
);
/**
 * @type {NodeListOf<HTMLInputElement>}
 * @description all inputs
 */
const inputs = form.querySelectorAll(".box-input input");

const cardNumberElement = document.querySelector("#card-details-number");
const cardNameElement = document.querySelector("#card-details-name");
const cardDataElement = document.querySelector("#card-details-data");
const cardCvcElement = document.querySelector("#card-details-cvc");

/**
 * @type {string}
 * @description comparar inputs pra formatação
 */

let cacheCardNumber = "";

/**
 * @type {boolean}
 * @description verificar se tem erro
 */
let checkError = false;

/**
 * @type {string}
 * @description cache de data
 */
let cacheData = "";

// events input
inputs.forEach((input) => {
  // create erros
  createSpanError(input);

  // VALIDATIONS
  input.addEventListener("focusin", () => {
    if (input.classList.contains("error")) input.removeAttribute("class");
  });

  // VALIDATIONS
  input.addEventListener("input", (e) => {
    if (input.value !== "") {
      errorsRemove(input);
    }

    if (input.value === "") {
      viewError(input, `Can´t be blank`);
    }
    if (input.id === "cardHolder-name") {
      if (input.value.trim().length > 40) {
        input.value = input.value.slice(0, 41);
      }

      if (input.value.match(/\d/)) {
        input.value = input.value.slice(0, input.value.length - 1);
      }

      if (input.value.trim().length < 13) {
        viewError(input, "must have at least 13 characters");
      }
    }

    // rest of the inputs accept number
    if (input.id !== "cardHolder-name") {
      const inputClear = input.value.trim();
      const currentInput = inputClear.charAt(input.value.trim().length - 1);

      if (Number(currentInput) !== 0 && !Number(currentInput)) {
        input.value = input.value.slice(0, input.value.length - 1);
      }
    }

    // card number
    if (input.id === "card-number") {
      const inputClear = input.value.replaceAll(" ", "");

      if (input.value.length > 18) {
        input.value = input.value.slice(0, 19);
      }

      if (inputClear.length % 4 === 0) {
        if (cacheCardNumber !== inputClear) formatCardNumber(input);

        cacheCardNumber = inputClear;
      }
    }

    // dates
    if (input.id === "date-Mounth" || input.id === "date-Year") {
      if (input.value.length > 2) {
        input.value = input.value.slice(0, 2);
      }
    }

    if (input.id === "cvc") {
      if (input.value.length > 3) {
        input.value = input.value.slice(0, 3);
      }

      if (input.value.length < 3) {
        viewError(input, "must have 3 characters");
      }
    }
  });
});

// Form
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  checkError = false;

  inputs.forEach((input) => {
    errorsRemove(input);

    // VALIDATIONS

    if (input.id === "cardHolder-name" && input.value.trim().length < 13) {
      viewError(input, "must have at least 13 characters");
      checkError = true;
    }

    if (input.id === "card-number") {
      const inputClear = input.value.replaceAll(" ", "");
      formatCardNumber(input);
      if (inputClear.length !== 16) {
        viewError(input, `Wrong format, numbers only`);
        checkError = true;
      }
    }

    if (input.value === "") {
      viewError(input, `Can´t be blank`);
      checkError = true;
    }

    if (checkError) return;

    // entering data into the card
    if (input.id === "cardHolder-name") {
      cardNameElement.textContent = formatNames(input.value.trim());
    }

    if (input.id === "card-number") {
      cardNumberElement.textContent = input.value;
    }

    if (input.id === "date-Mounth" || input.id === "date-Year") {
      input.value = input.value.padStart(2, "0");
      cacheData += input.value;
      if (input.id === "date-Year") {
        const dataCard = cacheData.split("");
        dataCard.splice(2, 0, "/");
        cardDataElement.textContent = dataCard.join("");
        cacheData = "";
      }
    }

    if (input.id === "cvc") {
      cardCvcElement.textContent = input.value;
    }
  });

  if (checkError) return;

  formGroups.forEach((elementForm) => {
    if (
      elementForm.classList.contains("card-confirmed") &&
      elementForm.classList.contains("active")
    ) {
      // clear
      // input.value = "";
      inputs.forEach((input) => (input.value = ""));
    }
    elementForm.classList.toggle("active");
  });
});
