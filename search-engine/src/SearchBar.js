// src/SearchBar.js
import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load JSON data from the local file
    fetch('/data/countries.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (event) => {
    const input = event.target.value;
    setQuery(input);
    if (input.length > 2) {
      const filteredSuggestions = data.filter(item =>
        item.country.toLowerCase().includes(input.toLowerCase()) ||
        item.capital.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.country);
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a country or capital..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleSuggestionClick(item)}>
              {item.country} ({item.capital})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
