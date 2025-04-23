import React, { useState, useCallback } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${newQuery}`
    );
    const data = await response.json();
    setSuggestions(data);
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
