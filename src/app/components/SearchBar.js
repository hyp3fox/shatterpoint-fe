'use client'

import React, { useState } from 'react'
import characters from '../../../characters.json'

const SearchBar = () => {
    const [query, setQuery] = useState("");
    console.log(character);
    const filteredData = characters.units.filter(unit =>
      unit.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <div className="p-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <ul className="mt-2 border rounded-md p-2">
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <li key={item.id} className="p-1 border-b last:border-0">
                {item.name}
              </li>
            ))
          ) : (
            <li className="p-1 text-gray-500">No results found</li>
          )}
        </ul>
      </div>
    );
  };

export default SearchBar