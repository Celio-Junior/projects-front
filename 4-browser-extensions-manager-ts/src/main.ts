// imports css
import '@styles/global.css';
import '@styles/header.css';
import '@styles/main.css';
// loader logo svg
import './elements/header-logo';
//button thema
import './elements/button-thema';
import { dataExtensions } from './elements';
import { extensionTemplateElement } from './elements/extension';

(async function () {
  const extensionContainerElement =
    document.querySelector<HTMLDivElement>('#container-extensions');

  const buttonsNavigation = document.querySelectorAll<HTMLButtonElement>(
    '.navigation button[type="button"]',
  );

  if (!extensionContainerElement) return;
  const data = await dataExtensions;

  // parte de carrega e dos input ativado ta pronto(eu acho)
  data.forEach((extension) => {
    const boxElement = document.createElement('div');
    boxElement.classList.add('box-extension');
    boxElement.innerHTML = extensionTemplateElement(extension);

    const inputCheckBox = boxElement.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    const buttonIsActive = boxElement.querySelector('.extension-active') as HTMLButtonElement;
    const buttonRemove = boxElement.querySelector('.button-remove') as HTMLButtonElement;

    buttonChecked(inputCheckBox);
    buttonClick(inputCheckBox, buttonIsActive);
    removeExtension(boxElement, buttonRemove);
    extensionContainerElement.append(boxElement);
  });

  const allExtensionElement =
    extensionContainerElement.querySelectorAll<HTMLDivElement>('.box-extension');

  navigationSelect(buttonsNavigation, allExtensionElement);
  console.log('main file');
})();

function removeExtension(elementRemove: HTMLDivElement, button: HTMLButtonElement) {
  button.addEventListener('click', () => elementRemove.remove());
}

function buttonChecked(inputCheckBox: HTMLInputElement) {
  const check = inputCheckBox.getAttribute('data-active') === 'true';
  inputCheckBox.checked = check;
}

function buttonClick(inputCheckBox: HTMLInputElement, span: HTMLSpanElement) {
  span.addEventListener('click', () => {
    const checked = inputCheckBox.getAttribute('data-active') === 'true';
    inputCheckBox.setAttribute('data-active', `${!checked}`);
    buttonChecked(inputCheckBox);
  });
}

function navigationSelect(
  buttons: NodeListOf<HTMLButtonElement>,
  allExtension: NodeListOf<HTMLDivElement>,
) {
  buttons.forEach((button, i) => {
    button.addEventListener('click', () => {
      buttonNavigationStyle(buttons, i);

      if (button.id === 'button-all') {
        allExtension.forEach((elementMain) => (elementMain.style.display = 'flex'));
      }

      if (button.id === 'button-active') {
        allExtension.forEach((elementMain) => {
          const checkElement = elementMain.querySelector<HTMLInputElement>(
            'input[type="checkbox"]',
          );
          if (!checkElement) return;

          if (checkElement.checked) {
            elementMain.style.display = 'flex';
          } else {
            elementMain.style.display = 'none';
          }
        });
      }

      if (button.id === 'button-inactive') {
        allExtension.forEach((elementMain) => {
          const checkElement = elementMain.querySelector<HTMLInputElement>(
            'input[type="checkbox"]',
          );
          if (!checkElement) return;

          if (!checkElement.checked) {
            elementMain.style.display = 'flex';
          } else {
            elementMain.style.display = 'none';
          }
        });
      }
    });
  });
}

function buttonNavigationStyle(buttons: NodeListOf<HTMLButtonElement>, indice: number) {
  buttons.forEach((button, i) => {
    if (i === indice) button.classList.add('active');
    if (i !== indice && button.classList.contains('active'))
      return button.classList.remove('active');
  });
}
