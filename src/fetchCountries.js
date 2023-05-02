const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries(currentInputValue) {
  const URL = `${BASE_URL}${currentInputValue}?fields=name,capital,population,flags,languages`;
  return fetch(URL).then(resp => {
    if (!resp.ok || resp.status === 404) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { fetchCountries };
