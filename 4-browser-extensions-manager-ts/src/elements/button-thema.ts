import { pathLogo, loaderSvg } from './header-logo';

//Elements
const buttonThemaElement = document.querySelector<HTMLButtonElement>('#button-thema');
const iconsThemaElement = buttonThemaElement?.querySelectorAll(
  'img',
) as NodeListOf<HTMLImageElement>;

const body = document.body;

const clickThema = () => {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    body.classList.add('light');

    //muda logo
    loaderSvg(pathLogo, false);

    //icon thema
    iconThema('dark');
  } else {
    body.classList.remove('light');
    body.classList.add('dark');

    //muda logo
    loaderSvg(pathLogo, true);

    //icon thema
    iconThema('light');
  }
};

//talvez eu mudo criando classes
function iconThema(thema: 'dark' | 'light') {
  if (thema === 'dark') {
    iconsThemaElement[0].style.display = 'none';
    iconsThemaElement[1].style.display = 'inline';
    return;
  }
  if (thema === 'light') {
    iconsThemaElement[0].style.display = 'inline';
    iconsThemaElement[1].style.display = 'none';
  }
}

buttonThemaElement?.addEventListener('click', clickThema);
