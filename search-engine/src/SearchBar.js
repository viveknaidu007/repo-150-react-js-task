// src/SearchBar.js
import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch JSON data
    fetch('/data/countries.json')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched Data:', data); // Debugging log
        setData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (event) => {
    const input = event.target.value;
    setQuery(input);

    if (input.trim() === '') {
      setSuggestions([]);
      return;
    }

    const lowerCaseInput = input.toLowerCase();
    const filteredSuggestions = data.filter(item =>
      item.country.toLowerCase().includes(lowerCaseInput) ||
      item.capital.toLowerCase().includes(lowerCaseInput)
    );

    console.log('Filtered Suggestions:', filteredSuggestions); // Debugging log

    setSuggestions(filteredSuggestions);
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
