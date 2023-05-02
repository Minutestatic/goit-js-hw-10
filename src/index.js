import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(evt) {
  const currentInputValue = evt.target.value.trim();
  if (!currentInputValue) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(currentInputValue)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (data.length >= 2 && data.length <= 10) {
        countryList.innerHTML = citySearchResult(data);
        countryInfo.innerHTML = '';
      }
      if (data.length === 1) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = citiInfoResult(data);
      }
    })
    .catch(err => {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
      console.log(err);
    });
}

function citySearchResult(countrys) {
  return countrys
    .map(
      ({ name: { official }, flags: { svg, alt } }) =>
        `<li class="country-iteam">
          <img src="${svg}" alt="${alt}" width ="40">
          <p>${official}</p>
         </li>`
    )
    .join('');
}

function citiInfoResult(country) {
  console.log(country);
  return country
    .map(
      ({
        name: { official },
        flags: { svg, alt },
        capital,
        population,
        languages,
      }) =>
        `
        <ul>
  <li class="country-iteam">
    <img src="${svg}" alt="${alt}" width="100" />
    <h1>${official}</h1>
  </li>
  <li class="country-iteam">
    <p>
      <span class="span-txt">Capital: </span>${capital}
    </p>
  </li>
  <li class="country-iteam">
    <p>
      <span class="span-txt">Population: </span>${population}
    </p>
  </li>
  <li class="country-iteam">
    <p>
      <span class="span-txt">languages: </span>${Object.values(languages).join(
        ', '
      )}
    </p>
  </li>
</ul>`
    )
    .join('');
}
