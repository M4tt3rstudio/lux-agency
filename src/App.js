import React, { useState } from 'react';
import PropertyGallery from './components/PropertyGallery';
import FilterButtons from './components/FilterButtons';
import './App.css'; // tu pourras y ajouter du style ensuite

function App() {
  const [filter, setFilter] = useState('tous');

  return (
    <div className="app">
      <h1>Lux Agency</h1>
      <FilterButtons filter={filter} setFilter={setFilter} />
      <PropertyGallery filter={filter} />
    </div>
  );
}

export default App;
