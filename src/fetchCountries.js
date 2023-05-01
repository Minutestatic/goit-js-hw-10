const BASE_URL = 'https://restcountries.com/v3.1/name/';

function fetchCountries() {
  const URL = `${BASE_URL}${country}?fields=name,capital,population,flags,languages`;
  return fetch(URL).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

export { fetchCountries };

// fetchCountries()
//   .then(data => console.log(data))
//   .catch(err => console.log(err));
