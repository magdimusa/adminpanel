import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./modal.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function Editmodal({ handleModal, category, GetCatigoriesAPI }) {
  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [brand, setBrand] = useState("");
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  //1st cars "category"
  const [categorilar, setCategorilar] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  //2nd cars "brand"
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  //3rd cars "model"
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  //4th cars "location"
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  //5th cars "city"
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  //other cars states
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [seconds, setSeconds] = useState("");
  const [speed, setSpeed] = useState("");
  const [maxpeople, setMaxpeople] = useState("");
  const [motor, setMotor] = useState("");
  const [transmission, setTransmission] = useState("");
  const [driverSide, setDriverSide] = useState("");
  const [petrol, setPetrol] = useState("");
  const [limitPerDay, setLimitPerDay] = useState("");
  const [deposit, setDeposit] = useState("");
  const [pProtection, setPProtection] = useState("");
  const [priceA, setPriceA] = useState("");
  const [priceU, setPriceU] = useState("");
  const [priceUs, setPriceUS] = useState("");
  const [priceAE, setPriceAE] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  //checkBox
  const [isChecked, setIsChecked] = useState(false);

  //useLocation
  const location = useLocation()?.pathname;
  //useEffect
  useEffect(() => {
    if (category) {
      setNameEn(category?.name_en);
      setNameRu(category?.name_ru);
      //brands
      setBrand(category?.title);
      //locations and cities
      setName(category?.name);
      setText(category?.text);
      //cars
      setColor(category?.color);
      setYear(category?.year);
      setSeconds(category?.seconds);
      setSpeed(category?.max_speed);
      setMaxpeople(category?.max_people);
      setMotor(category?.motor);
      setTransmission(category?.transmission);
      setDriverSide(category?.drive_side);
      setPetrol(category?.petrol);
      setLimitPerDay(category?.limitperday);
      setDeposit(category?.deposit);
      setPProtection(category?.premium_protection);
      setPriceA(category?.price_in_aed);
      setPriceU(category?.price_in_usd);
      setPriceAE(category?.price_in_aed_sale);
      setPriceUS(category?.price_in_usd_sale);
      setIsChecked(category?.inclusive);
    }
  }, [category]);

  const handleEnChange = (e) => {
    setNameEn(e.target.value);
    setBrand(e.target.value);
    setName(e.target.value);
    setText(e.target.value);
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

    switch (location) {
      case "/categories":
        formData.append("name_en", nameEn);
        formData.append("name_ru", nameRu);
        formData.append("images", image);
        break;
      case "/brands":
        formData.append("title", nameEn);
        formData.append("images", image);
        break;
      case "/locations":
      case "/cities":
        formData.append("name", nameEn);
        formData.append("text", nameRu);
        formData.append("images", image);
        break;
      case "/models":
        {
          formData.append("name", nameEn);
          formData.append("brand_id", selectedBrand);
        }
        break;
      case "/cars":
        {
          formData.append("brand_id", selectedBrand);
          formData.append("model_id", selectedModel);
          formData.append("city_id", selectedCity);
          formData.append("color", color);
          formData.append("year", year);
          formData.append("seconds", seconds);
          formData.append("category_id", selectedCategory);
          formData.append("images", image1);
          formData.append("images", image2);
          formData.append("max_speed", speed);
          formData.append("max_people", maxpeople);
          formData.append("transmission", transmission);
          formData.append("motor", motor);
          formData.append("drive_side", driverSide);
          formData.append("petrol", petrol);
          formData.append("limitperday", limitPerDay);
          formData.append("deposit", deposit);
          formData.append("premium_protection", pProtection);
          formData.append("price_in_aed", priceA);
          formData.append("price_in_usd", priceU);
          formData.append("price_in_aed_sale", priceAE);
          formData.append("price_in_usd_sale", priceUs);
          formData.append("location_id", selectedLocation);
          formData.append("inclusive", isChecked);
          formData.append("cover", image3);
        }
        break;
      default:
        return;
    }

    const token = localStorage.getItem("token");

    //Put Api
    try {
      const response = await axios.put(
        `https://autoapi.dezinfeksiyatashkent.uz/api/${location}/${category.id}`,
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

  // getCategorilarApi
  async function getCategorilar() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/categories`)
      .then((data) => {
        if (data?.data?.success) {
          setCategorilar(data?.data?.data);
        }
      });
  }
  useEffect(() => {
    getCategorilar();
  }, []);

  // getBrandsApi
  async function getBrands() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/brands`)
      .then((data) => {
        if (data?.data?.success) {
          setBrands(data?.data?.data);
        }
      });
  }
  useEffect(() => {
    getBrands();
  }, []);

  // getModelsApi
  async function getModels() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/models`)
      .then((data) => {
        if (data?.data?.success) {
          setModels(data?.data?.data);
        }
      });
  }
  useEffect(() => {
    getModels();
  }, []);

  // getLocationsApi
  async function getLocations() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/locations`)
      .then((data) => {
        if (data?.data?.success) {
          setLocations(data?.data?.data);
        }
      });
  }
  useEffect(() => {
    getLocations();
  }, []);

  // getCitiesApi
  async function getCities() {
    await axios
      .get(`https://autoapi.dezinfeksiyatashkent.uz/api/cities`)
      .then((data) => {
        if (data?.data?.success) {
          setCities(data?.data?.data);
        }
      });
  }
  useEffect(() => {
    getCities();
  }, []);

  // Check Box
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="modal__overlay" onClick={handleModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">
            Update{" "}
            {location === "/categories"
              ? "Category"
              : location === "/brands"
              ? "Brand"
              : location === "/models"
              ? "Model"
              : location === "/locations"
              ? "Location"
              : location === "/cities"
              ? "City"
              : location === "/cars"
              ? "Car"
              : null}
          </h2>
          <button className="modal__close-button" onClick={handleModal}>
            <AiOutlineClose size={24} />
          </button>
        </div>
        <form onSubmit={updateItemsApi} className="modal__form">
          {location === "/cars" ? (
            <>
              <label className="modal__label">
                Category *
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setSelectedCategory(e?.target?.value);
                  }}
                  className="modal__input"
                >
                  <option value="" disabled selected>
                    Select category
                  </option>
                  {categorilar?.map((elem) => (
                    <option value={elem?.id}>{elem.name_en}</option>
                  ))}
                </select>
              </label>
              <label className="modal__label">
                Brand *
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setSelectedBrand(e?.target?.value);
                  }}
                  className="modal__input"
                >
                  <option value="" disabled selected>
                    Select brand
                  </option>
                  {brands?.map((elem) => (
                    <option value={elem?.id}>{elem.title}</option>
                  ))}
                </select>
              </label>
              <label className="modal__label">
                Model *
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setSelectedModel(e?.target?.value);
                  }}
                  className="modal__input"
                >
                  <option value="" disabled selected>
                    Select model
                  </option>
                  {models?.map((elem) => (
                    <option value={elem?.id}>{elem.name}</option>
                  ))}
                </select>
              </label>
              <label className="modal__label">
                Location *
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setSelectedLocation(e?.target?.value);
                  }}
                  className="modal__input"
                >
                  <option value="" disabled selected>
                    Select location
                  </option>
                  {locations?.map((elem) => (
                    <option value={elem?.id}>{elem.name}</option>
                  ))}
                </select>
              </label>
              <label className="modal__label">
                City *
                <select
                  name=""
                  id=""
                  onChange={(e) => {
                    setSelectedCity(e?.target?.value);
                  }}
                  className="modal__input"
                >
                  <option value="" disabled selected>
                    Select city
                  </option>
                  {cities?.map((elem) => (
                    <option value={elem?.id}>{elem.name}</option>
                  ))}
                </select>
              </label>

              <label className="modal__label">
                Color *
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Year *
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Seconds *
                <input
                  type="number"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Speed *
                <input
                  type="number"
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Max People *
                <input
                  type="number"
                  value={maxpeople}
                  onChange={(e) => setMaxpeople(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Motor *
                <input
                  type="number"
                  value={motor}
                  onChange={(e) => setMotor(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Transmission *
                <input
                  type="number"
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Driver Side *
                <input
                  type="number"
                  value={driverSide}
                  onChange={(e) => setDriverSide(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Petrol *
                <input
                  type="number"
                  value={petrol}
                  onChange={(e) => setPetrol(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Limit Per Day *
                <input
                  type="number"
                  value={limitPerDay}
                  onChange={(e) => setLimitPerDay(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Deposit
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Premium Protection Price
                <input
                  type="number"
                  value={pProtection}
                  onChange={(e) => setPProtection(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Price in AED *
                <input
                  type="number"
                  value={priceA}
                  onChange={(e) => setPriceA(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Price in USD(Otd) *
                <input
                  type="number"
                  value={priceUs}
                  onChange={(e) => setPriceUS(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Price in AED (Otd) *
                <input
                  type="number"
                  value={priceAE}
                  onChange={(e) => setPriceAE(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Price in USD *
                <input
                  type="number"
                  value={priceU}
                  onChange={(e) => setPriceU(e.target.value)}
                  className="modal__input"
                  required
                />
              </label>

              <label className="inclusive-switch">
                <span className="modal__label">Inclusive *</span>
                <input
                  type="checkbox"
                  value={isChecked}
                  checked={isChecked}
                  onChange={handleToggle}
                  className="inclusive-switch__input"
                />
                <span className="inclusive-switch__slider"></span>
              </label>

              <label className="modal__label">
                Upload car images *
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage1(e.target.files[0])}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Upload the main image *
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage2(e.target.files[0])}
                  className="modal__input"
                  required
                />
              </label>
              <label className="modal__label">
                Upload the cover image *
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage3(e.target.files[0])}
                  className="modal__input"
                  required
                />
              </label>
            </>
          ) : (
            <label className="modal__label">
              {location === "/categories"
                ? "Name (EN) *"
                : location === "/brands"
                ? "Brand name *"
                : location === "/models"
                ? "Model name *"
                : location === "/locations" || location === "/cities"
                ? "Name *"
                : null}
              <input
                type="text"
                value={
                  location === "/categories"
                    ? nameEn
                    : location === "/brands"
                    ? brand
                    : location === "/locations" ||
                      location === "/cities" ||
                      location === "/models"
                    ? name
                    : null
                }
                onChange={handleEnChange}
                required
                className="modal__input"
              />
            </label>
          )}

          {location === "/categories" ||
          location === "/locations" ||
          location === "/cities" ? (
            <label className="modal__label">
              {location === "/categories"
                ? "Name (RU) *"
                : location === "/locations" || location === "/cities"
                ? "Text *"
                : null}
              <input
                type="text"
                value={
                  location === "/categories"
                    ? nameRu
                    : location === "/locations" || location === "/cities"
                    ? text
                    : null
                }
                onChange={handleRuChange}
                required
                className="modal__input"
              />
            </label>
          ) : null}
          {location === "/models" ? (
            <label className="modal__label">
              Brand name *
              <select
                name=""
                id=""
                onChange={(e) => {
                  setSelectedBrand(e?.target?.value);
                }}
                className="modal__input"
              >
                <option value="" disabled selected>
                  Select brand
                </option>
                {models?.map((elem) => (
                  <option value={elem?.id}>{elem.title}</option>
                ))}
              </select>
            </label>
          ) : location === "/cars" ? null : (
            <label className="modal__label">
              Upload Image *
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="modal__input"
              />
            </label>
          )}
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
