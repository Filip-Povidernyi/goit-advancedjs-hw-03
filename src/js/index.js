import { breeds, catByBreed } from "./cat-api";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SlimSelect from "slim-select";



const select = document.querySelector('.breed-select');
const body = document.querySelector('body');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');

error.classList.add('cover');
select.classList.add('is-hidden');
loader.innerHTML = '';
body.style.backgroundColor = '#252525';

const errorHandler = (err) => {
    iziToast.error({
        message: `${err} fetching information! Try again!`,
        position: 'topRight',
        timeout: 5000,
    });
};

const selectOnCange = (evt) => {
    evt.preventDefault();
    const breerSelect = evt.currentTarget.value;

    body.style.backgroundColor = '#252525';
    loader.classList.remove('is-hidden');
    catInfo.innerHTML = '';

    catByBreed(breerSelect)
        .then(data => {
            const markup = `
            <img class="cat-img" src="${data.url}" alt="${data.breeds[0].name}" />
            <div class="breed-info">
                <h1 class="cat-name">${data.breeds[0].name}</h1>
                <p class="description">${data.breeds[0].description}</p>
                <p class="temperament"><b>${data.breeds[0].temperament}</b></p>
            </div>`;
            catInfo.innerHTML = markup;
        })
        .catch((err) => {
            errorHandler(err);
        })
        .finally(() => {
            loader.classList.add('is-hidden');
            body.style.backgroundColor = '#fff';
        });
};

const getBreeds = (data) => {
    const markup = data.map(({ id, name }) =>
        `<option value ="${id}">${name}</option>`);

    select.insertAdjacentHTML('beforeend', markup.join(''));
    select.style.display = 'flex';

    new SlimSelect({
        select: '.breed-select',
        settings: {
            placeholderText: 'Search breeds',
        }
    });
};


breeds()
    .then(data => {
        getBreeds(data);
    })
    .catch((err) => {
        errorHandler(err);
    })
    .finally(() => {
        body.style.backgroundColor = '#fff';
        loader.classList.add('is-hidden');
        select.classList.remove('is-hidden');
    });

select.addEventListener('change', selectOnCange);
