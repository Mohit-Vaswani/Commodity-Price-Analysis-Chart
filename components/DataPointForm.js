import React, { useState } from 'react';

const DataPointForm = ({ onAddDataPoint }) => {
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPrice = parseFloat(price);
    if (!isNaN(newPrice)) {
      onAddDataPoint({ timestamp: new Date().getTime(), price: newPrice });
    }
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className='addDataForm'>
      <label>Add New Data Point:</label>
      <input
        type="number"
        step="0.01"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default DataPointForm;
