import React from 'react';

export default function FilterButtons({ filter, setFilter }) {
  const types = ['tous', 'terrain', 'maison', 'vente', 'location'];

  return (
    <div className="filter-buttons">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className={filter === type ? 'active' : ''}
        >
          {type.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
