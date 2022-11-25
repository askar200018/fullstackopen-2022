import axios from 'axios';
import { useEffect, useState } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;

const CityWeather = ({ cityName }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [cityName]);

  if (!weather) {
    return <p>Loading Weather</p>;
  }

  return (
    <div>
      <h3>Weather in {cityName}</h3>
      <p>temperature {weather.main.temp}</p>

      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Img weather"
      />
      <p>wind {weather.wind.speed}</p>
    </div>
  );
};

const CountryItem = ({ country }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <li>
        {country.name.common}{' '}
        <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
      </li>
      {show && (
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
      )}
    </div>
  );
};

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
        <CityWeather cityName={country.capital} />
      </div>
    );
  }

  return (
    <ul>
      {countries.map((country) => (
        <CountryItem key={country.cca3} country={country} />
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
