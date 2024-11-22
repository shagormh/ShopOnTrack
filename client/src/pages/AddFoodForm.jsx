import React, { useState } from 'react';

function AddFoodForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? e.target.files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('image', formData.image);

    try {
      const response = await fetch('http://127.0.0.1:3000/api/food/add', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      // Handle successful submission, e.g., display success message, clear form
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display error message
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "15px"}}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>

      <label htmlFor="price">Price:</label>
      <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />

      <label htmlFor="category">Category:</label>
      <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required />

      <label htmlFor="image">Image:</label>
      <input type="file" id="image" name="image" onChange={handleChange} required />

      <button type="submit">Add Food</button>
    </form>
  );
}

export default AddFoodForm;
