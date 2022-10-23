import Notiflix from 'notiflix';

const COUNTRIES_API_URL = 'https://restcountries.com/v3.1/name/';


function fetchCountries(name) {
    return fetch(COUNTRIES_API_URL + name + `?fields=name,capital,population,flags,languages`)
    .then(response => response.json());
  }

  export { fetchCountries };