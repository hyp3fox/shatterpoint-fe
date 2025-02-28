'use client'

import React, { useState } from 'react'
import characters from '../../../characters.json'

const SearchBar = () => {
    const [query, setQuery] = useState("");
    console.log(characters);
    const filteredData = characters.units.filter(unit =>
      unit.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <div className="p-4 max-w-md mx-auto">
        <input className="w-full p-2 border rounded-md" type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
        
        {filteredData.length > 0 ? (
            filteredData.map(item => (
              <div className="max-w-sm w-full lg:max-w-full lg:flex" key={item.id}>
                <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                    <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt={item.era} />
                    <div className="text-gray-900 font-bold text-xl mb-2">{item.name}</div>
                    <p className="text-gray-700 text-base">
                    {item.sp ? item.sp + "SP" + " " : item.pc +  "PC" + " "} {item.force} Force | {item.stamina} Stamina | {item.durability} Durability</p>
                    </div>
                    <div className="flex items-center">
                    <div className="text-sm">
                        <ul className="text-gray-900 leading-none tag-list">
                          {item.keywords.map((keyword, index) =>  (
                            <li className="tag" key={index}>{keyword}</li>
                          ))}
                        </ul>
                    </div>
                    </div>
                </div>
              </div>
            ))
          ) : (
           <p>No results found</p>
          )}
        
        
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