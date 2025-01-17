'use client';

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

interface Picture {
  id: number;
  title: string;
  image: string;
}

const PictureGallery: React.FC = () => {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    image: null as File | null,
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await axios.get('https://api.quantumkids.in/picture-gallery');
        setPictures(response.data);
      } catch (error) {
        console.error('Error fetching pictures:', error);
      }
    };

    fetchPictures();
  }, []);

  const deletePicture = async (id: number) => {
    try {
      await axios.delete(`https://api.quantumkids.in/picture-gallery/${id}`);
      setPictures(pictures.filter((picture) => picture.id !== id));
    } catch (error) {
      console.error('Error deleting picture:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      image: e.target.files ? e.target.files[0] : null,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.title || !formData.image) {
      alert('Please provide both title and image');
      return;
    }
  
    const pictureData = new FormData();
    pictureData.append('title', formData.title);
    if (formData.image) {
      pictureData.append('image', formData.image);
    }
  
    try {
      if (editId) {
        const response = await axios.patch(`https://api.quantumkids.in/picture-gallery/${editId}`, pictureData);
        setPictures(
          pictures.map((picture) =>
            picture.id === editId
              ? { ...response.data }
              : picture,
          ),
        );
        setEditId(null);
      } else {
        const response = await axios.post('https://api.quantumkids.in/picture-gallery', pictureData);
        setPictures([...pictures, response.data]);
      }
  
      setFormData({ title: '', image: null });
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error uploading picture:', error);
    }
  };
  

  const handleEdit = (picture: Picture) => {
    setFormData({ title: picture.title, image: null });
    setEditId(picture.id);
    setModalIsOpen(true);
  };

  const openModal = () => {
    setFormData({ title: '', image: null });
    setEditId(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Picture Gallery</h1>
      <button
        onClick={openModal}
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Picture
      </button>

      {modalIsOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editId ? 'Edit Picture' : 'Add Picture'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editId ? 'Update Picture' : 'Add Picture'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {pictures.map((picture) => (
          <div key={picture.id} className="picture-item border rounded-lg p-4 shadow-md">
            <img
              src={picture.image}
              alt={picture.title}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-bold mb-2">{picture.title}</h2>
            <div className="flex justify-between">
              <button
                onClick={() => handleEdit(picture)}
                className="py-1 px-3 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deletePicture(picture.id)}
                className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PictureGallery;
