import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import './styles.css';
import iziToast from "izitoast";
import SlimSelect from 'slim-select';

const selector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const divCatInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');

error.classList.add('is-hidden');

async function markupCreate() {
    try {
        const breeds = await fetchBreeds();
        loader.style.display = 'none';
        renBreeds(breeds);
        selector.style.display = 'flex';
        slimSelect();
    } catch (error) {
        handlerError(error);
    } finally {
        loader.classList.add('is-hidden');
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
    selector.innerHTML = `<select class="breed-select" id="selectElem">${markup}</select>`;
};

async function selectorHandler(event) {

    try {
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
    } catch {
        handlerError();
    };
};

function slimSelect() {
    new SlimSelect('.breed-select');
};

function handlerError() {

    iziToast.error({
        message: 'Error fetching cat information! Try again!',
        position: 'topRight',
    });
};
