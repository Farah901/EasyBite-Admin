import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food items.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the list.");
    }
  };

  const removeFood = async (foodId) => {
    try {
      if(confirm('Are u sure u want to remove this item?')){
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Failed to remove food item.");
      }}
    } catch (error) {
      toast.error("An error occurred while removing the item.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-container">
      <h2 className="list-heading">All Foods List</h2>
      <div className="list-table">
        <div className="list-table-header">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {/* Dynamic Items */}
        {list.length === 0 ? (
          <p className="no-data">No food items available.</p>
        ) : (
          list.map((item, index) => (
            <div key={index} className="list-table-row">
              <img src={`${item.image}`} alt={item.name} className="food-image" />
              <span>{item.name}</span>
              <span>{item.category}</span>
              <span>${item.price}</span>
              <button
                className="remove-button"
                onClick={() => removeFood(item._id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
