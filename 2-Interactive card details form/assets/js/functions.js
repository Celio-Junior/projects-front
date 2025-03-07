/**
 * @param {HTMLInputElement} input
 * @returns {void}
 * */
export function errorsRemove(input) {
  /**@type {HTMLSpanElement} */
  const spanError = input.nextElementSibling;
  if (spanError && spanError.classList.contains("error"))
    spanError.removeAttribute("class");
  if (input.classList.contains("error")) input.removeAttribute("class");
}

/**
 *
 * @param {HTMLInputElement} element
 * @param {string} text
 * @returns {void}
 *
 */

export function viewError(element, text = "") {
  element.classList.add("error");
  const spanError = element.nextElementSibling
    ? element.nextElementSibling
    : element.previousElementSibling;
  if (!spanError.classList.contains("error")) spanError.classList.add("error");
  spanError.innerHTML = text;
}

/**
 * @param {HTMLInputElement} input
 * @returns {void}
 */
export function createSpanError(input) {
  const span = document.createElement("span");
  if (input.id === "date-Year") return;
  // span.classList.add("error");
  input.insertAdjacentElement("afterend", span);
}

/**
 * @param {HTMLInputElement} element
 * @returns {void}
 */
export function formatCardNumber(element) {
  const value = element.value.replaceAll(" ", "").split("");
  for (let i = 0; i < value.length; i++) {
    if (i === 3) value.splice(4, 0, " ");
    if (i === 7) value.splice(9, 0, " ");
    if (i === 12) value.splice(14, 0, " ");
  }
  element.value = value.join("");
}

/**
 *
 * @param {string} nameComplete
 * @returns {string}
 */
export function formatNames(nameComplete) {
  const nameSplit = nameComplete.split(" ");
  console.log(nameComplete.length);
  let character = "";

  const mediaNameReduced = Math.floor(nameSplit.length / 2);

  if (nameComplete.length < 20 || nameSplit.length < 3) return nameComplete;

  character = nameSplit[mediaNameReduced].charAt(0).toUpperCase();
  character += ".";
  nameSplit[mediaNameReduced] = character;

  return nameSplit.join(" ");
}
