import { ExtensionInterface } from '../interfaces/extension';

export const dataExtensions = (async function (): Promise<ExtensionInterface[]> {
  // const pathDB = './src/database/data.json';
  const pathDB = './database/data.json';
  const response = await fetch(pathDB);
  const result = await response.json();
  return result;
})();
