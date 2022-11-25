import axios from 'axios';
import { useEffect, useState } from 'react';

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    const [country] = countries;
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="Flag" />
      </div>
    );
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>{country.name.common}</li>
      ))}
    </ul>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <div>
        <span>find countries</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;
