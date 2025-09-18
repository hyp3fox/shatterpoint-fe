'use client'

import { useEffect, useState } from 'react'

export default function CreateSquad() {
  const [query, setQuery] = useState("");
  const [inventory, setInventory] = useState({ primary: null, secondary: null, supporting: [] });
  const [units, setUnits] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");


  useEffect(() => {
    // Connect to local Laravel API instance
    fetch("http://127.0.0.1:8000/units")
      .then((res) => res.json())
      .then((data) => {
      console.log(data);
      setUnits(data);     
    })
    .catch((err) => console.error(err));
  }, []);

  // Load inventory from localStorage
  useEffect(() => {
    const savedInventory = JSON.parse(localStorage.getItem("characterInventory")) || { primary: null, secondary: null, supporting: [] };
    setInventory(savedInventory);
  }, []);

    // Save inventory to localStorage when changes occur
  useEffect(() => {
    localStorage.setItem("characterInventory", JSON.stringify(inventory));
  }, [inventory]);

  const addToInventory = (unit) => {
    if (unit.unit_type === "primary" && !inventory.primary) {
      setInventory({ ...inventory, primary: unit });
    } else if (unit.unit_type === "secondary" && !inventory.secondary) {
      setInventory({ ...inventory, secondary: unit });
    } else if (unit.unit_type === "supporting") {
      if (!inventory.supporting.some(item => item.id === unit.id)) {
        setInventory({ ...inventory, supporting: [...inventory.supporting, unit] });
      }
    }
  };

  const removeFromInventory = (unit_type, id) => {
    if (unit_type === "primary") {
      setInventory({ ...inventory, primary: null });
    } else if (unit_type === "secondary") {
      setInventory({ ...inventory, secondary: null });
    } else if (unit_type === "supporting") {
      setInventory({ ...inventory, supporting: inventory.supporting.filter(item => item.id !== id) });
    }
  };

  const filteredData = units.filter((unit) => {
    const name = unit.unit_name ? unit.unit_name.toLowerCase() : "";
    const unitType = unit.unit_type ? unit.unit_type.toLowerCase() : "";
    const matchesQuery = name.includes(query.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || unitType === activeFilter.toLowerCase();
    return matchesQuery && matchesFilter;
  });



  return (
    <div className="px-4">
       {/* 3-Column Create Squad Display */}
      <div className="grid grid-cols-3 gap-4 mb-10 mt-2">
        {/* Primary */}
        <div className="character-card shadow-md p-4 text-center rounded-lg">
          <h3 className="font-bold mb-2">Primary</h3>
          {inventory.primary ? (
            <div className="flex justify-between items-center">
              <span>{inventory.primary.unit_name}</span>
              <button
                onClick={() => removeFromInventory("primary")}
                className="ml-2 shatterdex-primary-btn hover:underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveFilter("primary")}
              className={`shatterdex-primary-btn shatterpoint-btn-transition mb-3 px-3 py-1 rounded text-sm ${
              activeFilter === "primary" ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              +
            </button>
          )}
        </div>

        {/* Secondary */}
        <div className="character-card shadow-md p-4 text-center rounded-lg">
          <h3 className="font-bold mb-2">Secondary</h3>
          {inventory.secondary ? (
            <div className="flex justify-between items-center">
              <span>{inventory.secondary.unit_name}</span>
              <button
                onClick={() => removeFromInventory("secondary")}
                className="shatterdex-primary-btn shatterdex-btn-transition ml-2 text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveFilter("secondary")}
              className={`shatterdex-primary-btn shatterpoint-btn-transition mb-3 px-3 py-1 rounded text-sm ${
              activeFilter === "primary" ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              +
            </button>
          )}
        </div>

        {/* Supporting */}
        <div className="character-card p-4 shadow-md text-center rounded-lg">
          <h3 className="font-bold mb-2">Supporting</h3>
          {inventory.supporting.length > 0 ? (
            <ul>
              {inventory.supporting.map((item) => (
                <li key={item.id} className="flex justify-between items-center mb-1">
                  <span>{item.unit_name}</span>
                  <button
                    onClick={() => removeFromInventory("supporting", item.id)}
                    className="shatterdex-primary-btn shatterdex-btn-transition ml-2 text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <button
              onClick={() => setActiveFilter("supporting")}
              className={`shatterdex-primary-btn shatterpoint-btn-transition mb-3 px-3 py-1 rounded text-sm ${
              activeFilter === "primary" ? "bg-blue-600 text-white" : "bg-gray-300"
              }`}
            >
              +
            </button>
          )}
        </div>
      </div>
      
      <input
        className="main-search w-full p-2 rounded-lg shadow-md mb-5"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

    {/* Character Search Results */}
      {filteredData.length > 0 ? (
        filteredData.map(unit => (
          <div className="character-card max-w-lg w-full lg:max-w-full lg:flex p-4 flex flex-col justify-between leading-normal rounded-2xl shadow-md mb-3 mt-3" key={unit.id}>
            <div className="mb-8">
              <div className="font-bold text-xl mb-2 ml-1">{unit.unit_name}</div>
              <p className="text-base ml-1">{unit.unit_type} | {unit.force_available} Force</p>
            </div>
            <div className="flex items-center justify-between ml-1">
              <button
                onClick={() => addToInventory(unit)}
                disabled={
                  (unit.unit_type === "primary" && inventory.primary) ||
                  (unit.unit_type === "secondary" && inventory.secondary) ||
                  (unit.unit_type === "supporting" && inventory.supporting.some(item => item.id === unit.id))
                }
                className={`shatterdex-primary-btn shatterdex-btn-transitionpx-2 py-1 rounded-2xl text-xs ${
                  (unit.unit_type === "primary" && inventory.primary) ||
                  (unit.unit_type === "secondary" && inventory.secondary) ||
                  (unit.unit_type === "supporting" && inventory.supporting.some(item => item.id === unit.id))
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white"
                }`}
              >
                Add {unit.unit_type}
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}