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
 if (data.length > 20) {
 Notify.info('Too many matches found. Please enter a more specific name'
);
return;
}
countryDataMarkup(data);
})
.catch(err => {
 Notify.failure('Oops, there is no country with that name');
});
}

//creating countries list markup
function createListMarkup(data) {
return data
.map(({ name, flags }) =>
`<li>
<img src="${flags.svg}" alt="${name.common}" height="50px" weight="50px"/>${name.common}
</li>`).join('');
}

//creating country info markup
function createDataMarkup(data) {
const countryEl = data[0];
const { name, capital, population, flags, languages } = countryEl;
return `
<li>
<img src="${flags.svg}" alt="${name.common}" height="50px"/></p>
<h1>${name.official}</h2>
<p>Capital: ${capital}
<p>Population: ${population}</p>
<p>Languages: ${Object.values(data[0].languages)}</p>
</li>`;
}


//rendering
function countryDataMarkup(data) {
    
if (data.length === 1) {
const dataMarkup = createDataMarkup(data);
infoCountry.innerHTML = dataMarkup;
} else {
const listMarkup = createListMarkup(data);
listCountry.innerHTML = listMarkup; 
}
}

//input event listener 
inputCountry.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

//clear markup
function clean() {
infoCountry.innerHTML = '';
listCountry.innerHTML = '';
}