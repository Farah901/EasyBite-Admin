import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        toast.success(response.data.message);
        setData({ name: '', description: '', price: '', category: 'Salad' });
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to add product.');
      console.error(error);
    }
  };

  return (
    <div className="add-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <h2>Add New Dish</h2>

        <div className="form-group image-upload">
          <label htmlFor="image">
            <img
              className="upload-preview"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Preview"
            />
            <input
              type="file"
              id="image"
              hidden
              required
              onChange={handleImageChange}
            />
            <div className="upload-text">Click to upload image</div>
          </label>
        </div>

        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Caesar Salad"
            value={data.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            placeholder="Write product description..."
            value={data.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={data.category}
              onChange={handleInputChange}
              required
            >
              <option value="Moroccan">Moroccan</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Mexican">Mexican</option>
              <option value="Italian">Italian</option>
              <option value="Syrian">Syrian</option>
              <option value="American">American</option>
              <option value="Asian">Asian</option>
              <option value="Salad">Salad</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price (MAD)</label>
            <input
              type="number"
              name="price"
              placeholder="20"
              value={data.price}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>
      
    </div>
  );
};

export default Add;
