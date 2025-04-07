'use client'

import React, { useState } from 'react'
import characters from '../../../characters.json'
import Image from 'next/image'

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const filteredData = characters.units.filter(unit =>
      unit.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <div className="p-4 max-w-lg mx-auto">
        <input className="w-full p-2 border rounded-md" type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
        
        {filteredData.length > 0 ? (
          filteredData.map(item => (
            <div className="bg-white border-2 border-gray-400 max-w-lg w-full lg:max-w-full lg:flex p-4 flex flex-col justify-between leading-normal" key={item.id}>
              <div className="mb-8">

                const result = str.toLowerCase().replace(/[^0-9a-z ]+/g,'').trim().replace(/\s+/g, '-');

                {/* Character Era */}
                {item.era == "Fall of the Jedi" ? <img className="w-10 h-10 rounded-full mr-4" src="/images/fall-of-the-jedi-icon.svg" alt={item.era} /> 
                : item.era == "Reign of the Empire" ? <img className="w-10 h-10 rounded-full mr-4" src="/images/reign-of-the-empire-icon.svg" alt={item.era} />
                : item.era == "Age of Rebellion" ? <img className="w-10 h-10 rounded-full mr-4" src="/images/age-of-rebellion-icon.svg" alt={item.era} />
                : item.era == "The New Republic" ? <img className="w-10 h-10 rounded-full mr-4" src="/images/the-new-republic-icon.svg" alt={item.era} />
                : ""}

                {/* Character Era - DRY */}
                {item.era == "Fall of the Jedi" ? <img className="w-10 h-10 rounded-full mr-4" src="/images/fall-of-the-jedi-icon.svg" alt={item.era} /> 
                : item.era == "Reign of the Empire" ? <img className="w-10 h-10 rounded-full mr-4" src="/images/reign-of-the-empire-icon.svg" alt={item.era} />
                : item.era == "Age of Rebellion" ? <img className="w-10 h-10 rounded-full mr-4" src="/images/age-of-rebellion-icon.svg" alt={item.era} />
                : item.era == "The New Republic" ? <img className="w-10 h-10 rounded-full mr-4" src="/images/the-new-republic-icon.svg" alt={item.era} />
                : ""}  


                {/* Character Name */}
                <div className="text-gray-900 font-bold text-xl mb-2">{item.name}</div>

                {/* Character Stats */}
                <p className="text-gray-700 text-base">
                  {item.sp ? item.sp + "SP" + " | " : item.pc +  "PC" + " | "} {item.force} Force | {item.stamina} Stamina | {item.durability} Durability
                </p>  
              </div>

              {/* Character Tags */}
              <div className="flex items-center">
                <section className="tag-list text-gray-900 leading-none text-sm">
                  {item.keywords.map((keyword, index) =>  (
                    <span className="tag" key={index}>{keyword}</span>
                  ))}
                </section>
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    );
  };

export default SearchBar