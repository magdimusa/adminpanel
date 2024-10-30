import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "./table.scss";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import Loader from "../loader/Loader";
import Modal from "../modal/Modal";
import EditModal from "../modal/Editmodal";

const Table = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const itemsPerPage = 5;
  const location = useLocation()?.pathname;

  // Open and Close Modal Functions
  const handleModal = () => {
    setModal((prev) => !prev);
  };

  const handleEditModal = (category) => {
    setSelectedCategory(category);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
    setSelectedCategory(null);
  };

  // Get Categories API
  const GetCatigoriesAPI = async () => {
    try {
      const response = await axios.get(
        `https://autoapi.dezinfeksiyatashkent.uz/api/${location}`
      );
      if (response.data?.success) {
        setCategories(response.data.data);
      } else {
        toast.warning("No data", { autoClose: 1500 });
      }
    } catch (error) {
      toast.error("Failed to fetch categories", { autoClose: 1500 });
    }
  };

  // Delete Categories
  const DeleteCatigories = async (itemID) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://autoapi.dezinfeksiyatashkent.uz/api/${location}/${itemID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Item was deleted successfully!", { autoClose: 1500 });
      GetCatigoriesAPI();
    } catch {
      toast.error("Can't delete this item!", { autoClose: 1500 });
    }
  };

  useEffect(() => {
    GetCatigoriesAPI();
  }, [location]);

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Displayed Categories
  const displayedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {categories.length ? (
        <div className="table">
          <button className="table__add-button" onClick={handleModal}>
            Add {location.slice(1, 2).toUpperCase() + location.slice(2)}
          </button>
          {modal && (
            <Modal
              GetCatigoriesAPI={GetCatigoriesAPI}
              handleModal={handleModal}
            />
          )}
          {editModal && (
            <EditModal
              GetCatigoriesAPI={GetCatigoriesAPI}
              category={selectedCategory}
              handleModal={closeEditModal}
            />
          )}
          <table className="table__content">
            <thead>
              {location === "/categories" ? (
                <tr className="table__row">
                  <th className="table__header">T/N</th>
                  <th className="table__header">Name (EN)</th>
                  <th className="table__header">Name (RU)</th>
                  <th className="table__header">Created At</th>
                  <th className="table__header">Image</th>
                  <th className="table__header">Action</th>
                </tr>
              ) : location === "/brands" ? (
                <tr className="table__row">
                  <th className="table__header">T/N</th>
                  <th className="table__header">Brands</th>
                  <th className="table__header">Image</th>
                  <th className="table__header">Action</th>
                </tr>
              ) : location === "/models" ? (
                <tr className="table__row">
                  <th className="table__header">T/N</th>
                  <th className="table__header">Model</th>
                  <th className="table__header">Brand</th>
                  <th className="table__header">Action</th>
                </tr>
              ) : location === "/locations" ? (
                <tr className="table__row">
                  <th className="table__header">T/N</th>
                  <th className="table__header">Name</th>
                  <th className="table__header">Location</th>
                  <th className="table__header">Image</th>
                  <th className="table__header">Action</th>
                </tr>
              ) : location === "/cities" ? (
                <tr className="table__row">
                  <th className="table__header">T/N</th>
                  <th className="table__header">Name</th>
                  <th className="table__header">Text</th>
                  <th className="table__header">Image</th>
                  <th className="table__header">Action</th>
                </tr>
              ) : location == "/cars" ? (
                <tr className="table__row">
                  <th className="table__header">T/N</th>
                  <th className="table__header">Brand</th>
                  <th className="table__header">Model</th>
                  <th className="table__header">Category</th>
                  <th className="table__header">Color</th>
                  <th className="table__header">City</th>
                  <th className="table__header">Action</th>
                </tr>
              ) : null}
            </thead>
            <tbody>
              {location === "/categories"
                ? displayedCategories?.map((elem, index) => (
                    <tr className="table__row" key={elem.id}>
                      <td className="table__cell">{index + 1}</td>
                      <td className="table__cell">{elem.name_en}</td>
                      <td className="table__cell">{elem.name_ru}</td>
                      <td className="table__cell">{elem.created_at}</td>
                      <td className="table__cell">
                        <img
                          src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem?.image_src}`}
                          alt={elem.name_en}
                          className="table__image"
                        />
                      </td>
                      <td className="table__cell">
                        <button
                          className="table__button table__button--edit"
                          onClick={() => handleEditModal(elem)}
                        >
                          ✏️
                        </button>
                        <button
                          className="table__button table__button--delete"
                          onClick={() => DeleteCatigories(elem.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                : location === "/brands"
                ? displayedCategories?.map((elem, index) => (
                    <tr className="table__row" key={elem.id}>
                      <td className="table__cell">{index + 1}</td>
                      <td className="table__cell">{elem.title}</td>
                      <td className="table__cell">
                        <img
                          src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem?.image_src}`}
                          alt={elem.name_en}
                          className="table__image"
                        />
                      </td>
                      <td className="table__cell">
                        <button
                          className="table__button table__button--edit"
                          onClick={() => handleEditModal(elem)}
                        >
                          ✏️
                        </button>
                        <button
                          className="table__button table__button--delete"
                          onClick={() => DeleteCatigories(elem.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                : location === "/models"
                ? displayedCategories?.map((elem, index) => (
                    <tr className="table__row" key={elem.id}>
                      <td className="table__cell">{index + 1}</td>
                      <td className="table__cell">{elem.name}</td>
                      <td className="table__cell">{elem.brand_title}</td>
                      <td className="table__cell">
                        <button
                          className="table__button table__button--edit"
                          onClick={() => handleEditModal(elem)}
                        >
                          ✏️
                        </button>
                        <button
                          className="table__button table__button--delete"
                          onClick={() => DeleteCatigories(elem.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                : location === "/locations"
                ? displayedCategories?.map((elem, index) => (
                    <tr className="table__row" key={elem.id}>
                      <td className="table__cell">{index + 1}</td>
                      <td className="table__cell">{elem.name}</td>
                      <td className="table__cell">{elem.text}</td>
                      <td className="table__cell">
                        <img
                          src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem?.image_src}`}
                          alt={elem.name_en}
                          className="table__image"
                        />
                      </td>
                      <td className="table__cell">
                        <button
                          className="table__button table__button--edit"
                          onClick={() => handleEditModal(elem)}
                        >
                          ✏️
                        </button>
                        <button
                          className="table__button table__button--delete"
                          onClick={() => DeleteCatigories(elem.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                : location === "/cities"
                ? displayedCategories?.map((elem, index) => (
                    <tr className="table__row" key={elem.id}>
                      <td className="table__cell">{index + 1}</td>
                      <td className="table__cell">{elem.name}</td>
                      <td className="table__cell">{elem.text}</td>
                      <td className="table__cell">
                        <img
                          src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem?.image_src}`}
                          alt={elem.name_en}
                          className="table__image"
                        />
                      </td>
                      <td className="table__cell">
                        <button
                          className="table__button table__button--edit"
                          onClick={() => handleEditModal(elem)}
                        >
                          ✏️
                        </button>
                        <button
                          className="table__button table__button--delete"
                          onClick={() => DeleteCatigories(elem.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                : location === "/cars"
                ? displayedCategories?.map((elem, index) => (
                    <tr className="table__row" key={elem.id}>
                      <td className="table__cell">{index + 1}</td>
                      <td className="table__cell">{elem.brand.title}</td>
                      <td className="table__cell">{elem.model.name}</td>
                      <td className="table__cell">{elem.category.name_en}</td>
                      <td className="table__cell">{elem.color}</td>
                      <td className="table__cell">{elem.city.name}</td>

                      <td className="table__cell">
                        <button
                          className="table__button table__button--edit"
                          onClick={() => handleEditModal(elem)}
                        >
                          ✏️
                        </button>
                        <button
                          className="table__button table__button--delete"
                          onClick={() => DeleteCatigories(elem.id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="pagination__button"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              <GrFormPrevious />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`pagination__button ${
                  currentPage === index + 1 ? "pagination__button--active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="pagination__button"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              <GrFormNext />
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Table;
