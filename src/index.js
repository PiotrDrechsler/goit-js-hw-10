import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const inputCountry = document.querySelector('input#search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

//search countries database
function inputHandler(event) {
    const searchInput = event.target.value.trim();
            
    clean();

    fetchCountries(searchInput)
        .then(data => {
            if (data.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name'
                );
                return;
            } 
            countryDataMarkup(data);
        })
        .catch(err => {
            Notify.failure('Oops, there is no country with that name');
        });
};

//creating countries list markup
function createListMarkup(data) {
    return data
        .map(({ name, flags }) =>
            `<li class="country-list__item"><img class="country-list__image" src="${flags.svg}" alt="${name.common}" height="40px" "/><p class="country-list__post">${name.common}</p></li>`
        )
        .join('');
};

//creating country info markup
function createDataMarkup(data) {
    const countryEl = data[0];
    const { name, capital, population, flags, languages } = countryEl;
        return `
                <li class="country__item">
                    <div class="country__flag-name-container">
                        <img src="${flags.svg}" alt="${name.common}" height="30px"/></p>
                        <h1 class="country__title">${name.official}</h2>
                    </div>
                    <p><b>Capital:</b> ${capital}
                    <p><b>Population:</b> ${population}</p>
                    <p><b>Languages:</b> ${Object.values(data[0].languages)}</p>
                </li>
                `;
};

//rendering
function countryDataMarkup(data) {
    if (data.length === 1) {
        const dataMarkup = createDataMarkup(data);
        infoCountry.innerHTML = dataMarkup;
    } else {
        const listMarkup = createListMarkup(data);
        listCountry.innerHTML = listMarkup; 
    };
};

//input event listener 
inputCountry.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

//clear markup
function clean() {
    infoCountry.innerHTML = '';
    listCountry.innerHTML = '';
};