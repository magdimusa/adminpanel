import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "./table.scss";

const Table = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const location = useLocation()?.pathname;

  async function GetCatigoriesAPI() {
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
  }

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

  // Sahifada ko‘rsatiladigan elementlar
  const displayedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  async function DeleteCatigories(itemID) {
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
      toast.success("Element Deleted", { autoClose: 1500 });
      GetCatigoriesAPI();
    } catch {
      toast.error("Can't delete this item", { autoClose: 1500 });
    }
  }

  return (
    <div className="table">
      <button className="table__add-button">Add Categories</button>
      <table className="table__content">
        <thead>
          <tr className="table__row">
            <th className="table__header">name_en</th>
            <th className="table__header">name_ru</th>
            <th className="table__header">Image</th>
            <th className="table__header">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedCategories.map((elem) => (
            <tr className="table__row" key={elem.id}>
              <td className="table__cell">{elem.name_en}</td>
              <td className="table__cell">{elem.name_ru}</td>
              <td className="table__cell">
                <img
                  src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem?.image_src}`}
                  alt={elem.name_en}
                  className="table__image"
                />
              </td>
              <td className="table__cell">
                <button className="table__button table__button--edit">
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
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          className="pagination__button"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          Prev
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
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
