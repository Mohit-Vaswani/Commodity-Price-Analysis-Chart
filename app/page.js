"use client"

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import CommodityChart from '../components/Charts';
import DataPointForm from '@/components/DataPointForm';

Modal.setAppElement('body'); 

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filterMinutes, setFilterMinutes] = useState(10); 


  const handleFilterChange = (e) => {
    const selectedValue = Number(e.target.value);
    setFilterMinutes(selectedValue);
    localStorage.setItem('filterMinutes', selectedValue);
  };

  useEffect(() => {
    const storedFilterMinutes = localStorage.getItem('filterMinutes');
    if (storedFilterMinutes !== null) {
      setFilterMinutes(Number(storedFilterMinutes));
    }

    const storedData = JSON.parse(localStorage.getItem('data'));
    if (storedData !== null) {
      setData(storedData);
    }
  }, []);

  const addDataPoint = (newDataPoint) => {
    const updatedData = [...data, newDataPoint];
    setData(updatedData.sort((a, b) => a.timestamp - b.timestamp));
    setModalIsOpen(false);
    localStorage.setItem('data', JSON.stringify(updatedData));
  };

  const filterData = (minutes) => {
    const currentTime = new Date().getTime();
    return data.filter((item) => currentTime - item.timestamp <= minutes * 60 * 1000);
  };

  return (
    <div className='mainComponent'>
      <h1>Commodity Price Analysis</h1>
      <button onClick={() => setModalIsOpen(true)}>Add Data Point</button>

      <div className='filter'>
        <label>Filter by:</label>
        <select
          value={filterMinutes}
          onChange={handleFilterChange}
        >
          <option value={10}>Last 10 minutes</option>
          <option value={60}>Last 1 hour</option>
        </select>
      </div>

      <CommodityChart data={filterData(filterMinutes)} />
    
      <Modal isOpen={modalIsOpen} className="">
        <button onClick={() => setModalIsOpen(false)}>Close</button>
        <DataPointForm onAddDataPoint={addDataPoint} />
      </Modal>
    </div>
  );
};

export default Home;
