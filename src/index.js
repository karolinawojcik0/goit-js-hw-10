import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchCats, fetchCatsByID } from './cat-api';

const select = document.querySelector('#sel');
const catContainer = document.querySelector('.cat-info');
const loaderParagraph = document.querySelector('.loader');
const errorParagraph = document.querySelector('.error');
const loaderAnimation = document.querySelector('.loaderAnimation');

loaderParagraph.style.display = 'none';
errorParagraph.style.display = 'none';
loaderAnimation.style.display = 'none';

select.addEventListener('change', e => {
  e.preventDefault();
  loaderParagraph.style.display = 'block';
  loaderAnimation.style.display = 'block';
  const breedID = select.value;
  fetchCatsByID(breedID)
    .then(catData => {
      const imageURL = catData[0].url;
      const header = catData[0].breeds[0].name;
      const description = catData[0].breeds[0].description;
      const temperament = catData[0].breeds[0].temperament;
      loaderAnimation.style.display = 'none';

      let markup = `<img src=${imageURL} class="catimg"><div><h1>${header}</h1><p>${description}</p><p><b>Temperament:</b> ${temperament}</p></div>`;
      catContainer.innerHTML = markup;
      loaderParagraph.style.display = 'none';
      errorParagraph.style.display = 'none';
    })
    .catch(error => {
      loaderParagraph.style.display = 'none';
      errorParagraph.style.display = 'block';
      markup = '';
      catContainer.innerHTML = markup;
      loaderAnimation.style.display = 'none';

      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});

fetchCats()
  .then(cat => {
    cat.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      select.appendChild(option);
    });
    new SlimSelect({
      select: '#sel',
      settings: {
        placeholderText: 'choose your cat',
      },
    });
  })
  .catch(error => console.log(error));