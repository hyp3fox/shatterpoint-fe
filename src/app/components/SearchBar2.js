'use client'

import React, { useEffect, useState } from 'react'
import characters from '../../../characters.json'

const SearchBar2 = () => {
  const [query, setQuery] = useState("");
  const [inventory, setInventory] = useState([]);

  // Load inventory from localStorage on mount
  useEffect(() => {
    const savedInventory = JSON.parse(localStorage.getItem("characterInventory")) || [];
    setInventory(savedInventory);
  }, []);

  // Save inventory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("characterInventory", JSON.stringify(inventory));
  }, [inventory]);

  const addToInventory = (character) => {
    if (!inventory.some(item => item.id === character.id)) {
      setInventory([...inventory, character]);

    }
  };

  const removeFromInventory = (characterId) => {
    const updatedInventory = inventory.filter(item => item.id !== characterId);
    setInventory(updatedInventory);
  };

  const filteredData = characters.units.filter(unit =>
    unit.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 max-w-lg mx-auto">
      <input
        className="w-full p-2 border rounded-md mb-5"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* Inventory Display */}
      {inventory.length > 0 && (
        <div className="mt-6 p-4 bg-gray-100 border rounded-md">
          <h3 className="text-lg text-black font-semibold mb-2">My Squad</h3>
          <ul className="list-disc pl-5">
            {inventory.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-1">
                <span className="text-black">{item.name}</span> | <span className="text-black text-small">{item.type}</span>
                <button
                  onClick={() => removeFromInventory(item.id)}
                  className="ml-2 text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {filteredData.length > 0 ? (
        filteredData.map(character => (
          <div className="bg-white border-2 border-gray-400 max-w-lg w-full lg:max-w-full lg:flex p-4 flex flex-col justify-between leading-normal mb-3 mt-3" key={character.id}>
            <div className="mb-8">
              {/* Character Era */}
              <div className="flex items-center w-10 h-10 rounded-full overflow-hidden mb-2">
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

              {/* Character Name & Stats */}
              <div className="text-gray-900 font-bold text-xl mb-2 ml-1">{character.name}</div>
              <p className="text-gray-700 text-base ml-1">
                {character.sp ? character.sp + "SP | " : character.pc + "PC | "}
                {character.force} Force | {character.stamina} Stamina | {character.durability} Durability
              </p>
            </div>

            <div className="flex items-center justify-between ml-1">
              <section className="tag-list text-gray-900 leading-none text-sm">
                {character.keywords.map((keyword, index) => (
                  <span
                    className={"tag-" + keyword.toLowerCase().replace(/\s+/g, "-") + " mr-1"}
                    key={index}
                  >
                    {keyword}
                  </span>
                ))}
              </section>
              <button
                onClick={() => addToInventory(character)}
                className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
              >
                Add to Squad
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchBar2;
