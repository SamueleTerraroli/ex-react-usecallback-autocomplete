function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value)
    }, delay);
  };
}


import React, { useState, useCallback } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Funzione per recuperare i suggerimenti con debounce
  const fetchSuggestions = useCallback(
    debounce(async (newQuery) => {
      console.log(newQuery)
      const response = await fetch(
        `https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${newQuery}`
      );
      const data = await response.json();
      setSuggestions(data);
    }, 300),
    []
  );

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    fetchSuggestions(newQuery); // Chiama la funzione con debounce
  };

  return (
    <div className="container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Digita qui..."
        className="search-input"
      />
      {query && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion.name}</li>
          ))}
        </ul>
      )}
    </div>
  );

};


export default App
