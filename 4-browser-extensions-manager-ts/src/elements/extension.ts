import { ExtensionInterface } from '../interfaces/extension';

export const extensionTemplateElement = (extension: ExtensionInterface) => {
  const { name, description, logo: pathIMg, isActive } = extension;
  return `
        <div class="box-header">
        <img src=${pathIMg} alt="logo devlens">

        <div class="box-text">
          <h3>${name}</h3>
  
          <p>${description}</p>
        </div>
      </div>

      <div class="nav-input-extension">
        <input data-active=${isActive} type="checkbox">
        <button type="button" class="button button-remove">Remove</button>
        <button type="button" class="extension-active"></button>
      </div>`;
};
