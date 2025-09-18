'use client'

import { useEffect, useState } from 'react'

export default function ApiTest() {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/units")
      .then((res) => res.json())
      .then(data => console.log(data));
      //.then((data) => setUnits(data))
      //.catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Shatterpoint Units</h1>
      <ul>
        {units.map((unit) => (
          <li key={unit.id}>
            {unit.name} - {unit.affiliation} ({unit.type})
          </li>
        ))}
      </ul>
    </div>
  );
}