import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./table.scss";
import { useLocation } from "react-router-dom";

const Table = () => {
  const [categories, setCategories] = useState([]);
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
  }, []);

  console.log(categories);
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
      GetCatigoriesAPI(); // Jadvalni yangilash uchun qayta yuklaymiz
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
          {categories.map((elem) => (
            <tr className="table__row" key={elem.id}>
              <td className="table__cell">{elem.name_en}</td>
              <td className="table__cell">{elem.name_ru}</td>
              <td className="table__cell">
                <img
                  src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${elem?.image_src}`} // tasvir manzili to‘g‘ri kelishiga e'tibor bering
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
    </div>
  );
};

export default Table;
