'use client'

import React, { useState } from 'react'
import characters from '../../../characters.json'
import Image from 'next/image'

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const filteredData = characters.units.filter(unit =>
      unit.name.toLowerCase().includes(query.toLowerCase())
    );

    const eraIcons = {
      "Fall of the Jedi": "/images/fall-of-the-jedi-icon.svg",
      "Reign of the Empire": "/images/reign-of-the-empire-icon.svg",
      "Age of Rebellion": "/images/age-of-rebellion-icon.svg",
      "The New Republic": "/images/the-new-republic-icon.svg",
    }

    return (
      <div className="p-4 max-w-lg mx-auto">
        <input className="w-full p-2 border rounded-md mb-5" type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
        
        {filteredData.length > 0 ? (
          filteredData.map(character => (
            <div className="bg-white border-2 border-gray-400 max-w-lg w-full lg:max-w-full lg:flex p-4 flex flex-col justify-between leading-normal mb-3" key={character.id}>
              <div className="mb-8">

                {/* Character Era - DRY */}
                <div className="flex characters-center w-10 h-10 rounded-full overflow-hidden">
                {
                  (Array.isArray(character.era) ? character.era : [character.era]).length === 1 ? (
                    <img
                      className="w-full h-full object-cover"
                      src={`/images/${(Array.isArray(character.era) ? character.era[0] : character.era).toLowerCase().replace(/\s+/g, "-")}-icon.svg`}
                      alt={Array.isArray(character.era) ? character.era[0] : character.era}
                    />
                  ) : (
                    <>
                      <img
                        className="w-1/2 h-full object-cover object-left"
                        src={`/images/${character.era[0].toLowerCase().replace(/\s+/g, "-")}-icon.svg`}
                        alt={character.era[0]}
                      />
                      <img
                        className="w-1/2 h-full object-cover object-right"
                        src={`/images/${character.era[1].toLowerCase().replace(/\s+/g, "-")}-icon.svg`}
                        alt={character.era[1]}
                      />
                    </>
                  )
                }
              </div>


                {/* Character Name */}
                <div className="text-gray-900 font-bold text-xl mb-2 ml-1">{character.name}</div>

                {/* Character Stats */}
                <p className="text-gray-700 text-base ml-1">
                  {character.sp ? character.sp + "SP" + " | " : character.pc +  "PC" + " | "} {character.force} Force | {character.stamina} Stamina | {character.durability} Durability
                </p>  
              </div>

              {/* Character Tags */}
              <div className="flex characters-center ml-1">
                <section className="tag-list text-gray-900 leading-none text-sm">
                  {character.keywords.map((keyword, index) =>  (
                    <span className={"tag-" + keyword.toLowerCase().replace(/\s+/g, "-")} key={index}>{keyword}</span>
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