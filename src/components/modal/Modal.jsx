import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./modal.scss";
import axios from "axios";
import { toast } from "react-toastify";

function Modal({ handleModal, GetCatigoriesAPI }) {
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [image, setImage] = useState(null);

  const handleCategoryChange = (e) => {
    setNameEn(e.target.value);
  };
  const handleTitleChange = (e) => {
    setNameRu(e.target.value);
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // PostItemsApi
  const postItemsApi = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name_en", nameEn);
    formData.append("name_ru", nameRu);
    formData.append("images", image);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://autoapi.dezinfeksiyatashkent.uz/api/categories",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        GetCatigoriesAPI();
        handleModal();
      }
    } catch (error) {
      //   console.error("Xato:", error);
      toast.error("An error occurred, please try again!");
    }
  };

  return (
    <div className="modal__overlay" onClick={handleModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Add Category</h2>
          <button className="modal__close-button" onClick={handleModal}>
            <AiOutlineClose size={24} />
          </button>
        </div>
        <form onSubmit={postItemsApi} className="modal__form">
          <label className="modal__label">
            Name (EN):
            <input
              type="text"
              value={nameEn}
              onChange={handleCategoryChange}
              required
              className="modal__input"
            />
          </label>
          <label className="modal__label">
            Name (RU):
            <input
              type="text"
              value={nameRu}
              onChange={handleTitleChange}
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
              required
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
