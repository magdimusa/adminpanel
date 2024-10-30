import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./modal.scss";
import axios from "axios";
import { toast } from "react-toastify";

function Editmodal({ handleModal, category, GetCatigoriesAPI }) {
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (category) {
      setNameEn(category.name_en);
      setNameRu(category.name_ru);
    }
  }, [category]);

  const handleEnChange = (e) => {
    setNameEn(e.target.value);
  };

  const handleRuChange = (e) => {
    setNameRu(e.target.value);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const updateItemsApi = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ru", nameRu);
    if (image) {
      formData.append("images", image);
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${category.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success) {
        toast.success(response.data.message);
        GetCatigoriesAPI();
        handleModal();
      } else {
        toast.error("Xatolik yuz berdi!");
      }
    } catch (error) {
      console.error("Xato:", error);
      toast.error("Xatolik yuz berdi, iltimos qaytadan urinib ko'ring!");
    }
  };

  return (
    <div className="modal__overlay" onClick={handleModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Edit Category</h2>
          <button className="modal__close-button" onClick={handleModal}>
            <AiOutlineClose size={24} />
          </button>
        </div>
        <form onSubmit={updateItemsApi} className="modal__form">
          <label className="modal__label">
            Name (UZ):
            <input
              type="text"
              value={nameEn}
              onChange={handleEnChange}
              required
              className="modal__input"
            />
          </label>
          <label className="modal__label">
            Name (RU):
            <input
              type="text"
              value={nameRu}
              onChange={handleRuChange}
              required
              className="modal__input"
            />
          </label>
          <label className="modal__label">
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="modal__input"
            />
          </label>
          <div className="modal__button-container">
            <button
              type="button"
              onClick={handleModal}
              className="modal__button modal__button--cancel"
            >
              Cancel
            </button>
            <button type="submit" className="modal__button modal__button--save">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Editmodal;
