//paths
export const pathLogo = './images/logo.svg';

//elements
const logoElement = document.querySelector<HTMLHeadingElement>('#logo');

let logoWhiteString: string | null = null;

export const loaderSvg = async (path: string, isLight: boolean = false) => {
  if (!logoElement) return;
  const reponse = await fetch(path);
  let svgString = (await reponse.text()).trim();

  if (!logoWhiteString) {
    logoWhiteString = svgString.replace('fill="#091540', 'fill="#eee"');
  }

  if (isLight) svgString = logoWhiteString;

  logoElement.innerHTML = svgString;
};

loaderSvg(pathLogo, true);
