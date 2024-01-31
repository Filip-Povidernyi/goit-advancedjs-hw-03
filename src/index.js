import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SlimSelect from 'slim-select';
import './slimselect.css';

const selector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const divCatInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');

error.classList.add('is-hidden');
selector.classList.add('is-hidden');

async function markupCreate() {
    try {
        const breeds = await fetchBreeds();
        renBreeds(breeds);
        selector.style.display = 'flex';
        slimSelect();
    } catch (error) {
        handlerError(`${error}! Breeds error`);
    } finally {
        loader.classList.add('is-hidden');
        selector.classList.remove('is-hidden');
    };
};


document.addEventListener('DOMContentLoaded', markupCreate);

selector.addEventListener('change', selectorHandler);

function renBreeds(breeds) {
    const markup = breeds
        .map(({ id, name }) => {
            return `<option value="${id}">${name}</option>`;
        })
        .join('');
    selector.innerHTML = `<select class="breed-select" id="selectElem" placeholder="Cat change">${markup}</select>`;
};

async function selectorHandler(event) {

    try {
        loader.classList.remove('is-hidden');
        event.preventDefault();
        const breedId = event.currentTarget.value
        await fetchCatByBreed(breedId)
            .then(data => {
                divCatInfo.style.display = 'flex';
                const markup = `
                <img class="cat-img" src="${data[0].url}" alt="${data[0].breeds[0].alt_names}" />
                <div class="breed-info">
                  <h1 class="cat-name">${data[0].breeds[0].name}</h1>
                      <p class="description">${data[0].breeds[0].description}</p>
                      <h2 class="temperament">Temperament:</h2>
                      <p class="temp-descr">${data[0].breeds[0].temperament}</p>
                </div>
              `;
                divCatInfo.innerHTML = markup;
            });
    } catch (error) {
        handlerError(`${error}! Cat by breed error`);
    } finally {
        loader.classList.add('is-hidden');
    }
};

function slimSelect() {
    new SlimSelect({
        select: '.breed-select',
        settings: {
            placeholderText: 'Search breeds',
        }
    });
};

function handlerError(error) {

    iziToast.error({
        message: `${error} fetching information! Try again!`,
        position: 'topRight',
    });
};
