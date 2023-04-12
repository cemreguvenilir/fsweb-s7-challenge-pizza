import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";
import { Link } from "react-router-dom";
import * as yup from "yup";

const initialForm = {
  id: "",
  size: "",
  dough: "",
  ingredients: [],
  note: "",
  name: "",
  email: "",
  address: "",
  number: 1,
  price: "",
};

let schema = yup.object().shape({
  size: yup
    .string()
    .oneOf(["small", "medium", "large"], "Birini seçmelisiniz")
    .required(),
  dough: yup
    .string()
    .oneOf(["thin", "normal", "thick"], "Birini seçmelisiniz")
    .required(),
  ingredients: yup.array().max(10, "En fazla 10 adet malzeme seçebilirsin"),

  name: yup
    .string()
    .required("Lütfen isminizi giriniz.")
    .min(2, "İsim en az 3 karakterli olmalıdır"),

  email: yup
    .string()
    .email()
    .required("Lütfen mailinizi giriniz."),
  address: yup.string().required("Lütfen adresinizi giriniz."),
  note: yup.string().max(30, "en fazla 30 karakter yazabilirsiniz "),
});

const Form = () => {
  const [formData, setFormData] = useState(initialForm);
  const [ekMalzeme, setEkMalzeme] = useState(0);
  const [counter, setCounter] = useState(1);
  const [pizzaPrice, setPizzaPrice] = useState(0);
  const [buttonDisabledMi, setButtonDisabledMi] = useState(true);

  const [errors, setErrors] = useState({
    size: "",
    dough: "",
    ingredients: "",
    name: "",
    email: "",
    address: "",
    note: "",
  });

  useEffect(() => {
    schema.isValid(formData).then((valid) => setButtonDisabledMi(!valid));
  }, [formData]);

  const sizePrice = {
    small: 90,
    medium: 120,
    large: 150,
  };

  const ingredients = [
    "Pepperoni",
    "Sosis",
    "Kanada Jambonu",
    "Tavuk Izgara",
    "Soğan",
    "Domates",
    "Mısır",
    "Sucuk",
    "Jalepeno",
    "Sarımsak",
    "Biber",
    "Salam",
    "Ananas",
    "Kabak",
  ];
  function changeHandler(e) {
    const { value, type, name } = e.target;

    if (type === "radio") {
      setPizzaPrice(sizePrice[value]);
    }
    const newFormData = {
      ...formData,
      [e.target.name]: value,
    };
    setFormData(newFormData);
    setFormData({ ...formData, [name]: value });

    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setErrors({ ...errors, [name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [name]: err.errors[0] });
      });
  }

  const setCheck = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });

    if (e.target.checked === true) {
      setEkMalzeme(ekMalzeme + 5);
    } else {
      setEkMalzeme(ekMalzeme - 5);
    }
  };

  function submitHandler(e) {
    e.preventDefault();
  }

  axios
    .post("https://reqres.in/api/users", formData)
    .then(function(response) {
      console.log(response.data);
    })
    .catch((error) => console.log(error));

  if (counter < 1) {
    setCounter(1);
  }
  const arttir = () => {
    setCounter(counter + 1);
  };

  const azalt = () => {
    setCounter(counter - 1);
  };

  return (
    <>
      <div className="header">
        <h1>
          <Link to="/">Teknolojik Yemekler</Link>
        </h1>
        <nav>
          <ul>
            <li className="navItem">
              <Link to="/"> Ana Sayfa </Link>
            </li>
            <li className="navItem">Seçenekler</li>
            <li className="navItem">
              <Link to="/pizza">Sipariş Oluştur</Link>{" "}
            </li>
          </ul>
        </nav>
      </div>
      <div className="total">
        <div className="container">
          <h2>Position Absolute Acı Pizza</h2>
          <div className="pizzaInfo">
            <div className="price"> 90 ₺</div>{" "}
            <div className="puan">
              {" "}
              4.9 <span> (200) </span>
            </div>{" "}
          </div>
          <p>
            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
            diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
            ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
            yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan
            kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta
            denir.
          </p>{" "}
          <form onSubmit={submitHandler} id="pizza-form">
            <div className="sizeDough">
              <div className="pizzaSize">
                <h3 className="sizeText">
                  Boyut Seç <span className="star">*</span>
                </h3>

                <label htmlFor="small">
                  <input
                    type="radio"
                    id="small"
                    name="size"
                    value="small"
                    checked={formData.size === "small"}
                    onChange={changeHandler}
                  />
                  Küçük
                </label>

                <label htmlFor="medium">
                  <input
                    type="radio"
                    id="medium"
                    name="size"
                    value="medium"
                    checked={formData.size === "medium"}
                    onChange={changeHandler}
                  />
                  Orta
                </label>

                <label htmlFor="large">
                  {" "}
                  <input
                    type="radio"
                    id="large"
                    name="size"
                    value="large"
                    checked={formData.size === "large"}
                    onChange={changeHandler}
                  />
                  Büyük
                </label>
                {errors.size && <p>{errors.size} </p>}
              </div>
              <div className="pizzaDough">
                <label htmlFor="dough">
                  <h3 className="doughText">
                    Hamur Seç <span className="star">*</span>
                  </h3>
                </label>
                <select
                  id="dough-dropdown"
                  name="dough"
                  value={formData.dough}
                  onChange={changeHandler}
                >
                  <option value="" disabled selected hidden>
                    Hamur Kalınlığı
                  </option>
                  <option checked={formData.dough === "thin"} value="thin">
                    İnce
                  </option>
                  <option checked={formData.dough === "normal"} value="normal">
                    Normal
                  </option>
                  <option checked={formData.dough === "thick"} value="thick">
                    Kalın
                  </option>
                </select>
                {errors.dough && <p>{errors.dough} </p>}
              </div>
            </div>
            <div className="ingredients">
              <h3>Ek malzemeler</h3>
              <p className="ingredientsText">
                En fazla 10 malzeme seçebilirsiniz. 5₺
              </p>
              {ingredients.map((e, index) => {
                return (
                  <>
                    <div key={index}>
                      <label className="labelCheck" htmlFor={index}>
                        <input
                          type="checkbox"
                          id={index}
                          name={e}
                          value={e}
                          onChange={setCheck}
                        ></input>
                        {e}{" "}
                      </label>
                      {errors.ingredients && <p>{errors.ingredients} </p>}
                    </div>
                  </>
                );
              })}
            </div>

            <div className="contact">
              <h3 className="contactText">
                İletişim Bilgileri <span className="star">*</span>
              </h3>
              <label htmlFor="name">İsim: </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={changeHandler}
              />
              {errors.name && <p>{errors.name} </p>}
              <label htmlFor="email">E-mail: </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
              />
              {errors.email && <p>{errors.email} </p>}
              <label htmlFor="address">Adres: </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={changeHandler}
              />
              {errors.address && <p>{errors.address} </p>}
            </div>

            <div className="orderNote"></div>
            <label htmlFor="orderNote">
              <h3>Sipariş Notu</h3>
            </label>
            <input
              type="text"
              id="special-text"
              name="note"
              value={formData.note}
              onChange={changeHandler}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
            />
            {errors.note && <p>{errors.note} </p>}
          </form>
        </div>
        <hr className="lastPart" />
        <div className="orderPart">
          <div className="numberButton">
            <button onClick={azalt} className="countButton">
              {" "}
              -{" "}
            </button>
            <input id="count" type="number" value={counter} />
            <button onClick={arttir} className="countButton">
              {" "}
              +{" "}
            </button>
          </div>
          <div className="boxButton">
            <div className="sumOrder">
              <h3>Sipariş Toplamı</h3>
              <div className="ingredientSum">
                <div>Seçimler</div> <div>{ekMalzeme} ₺ </div>
              </div>
              <div className="totalSum">
                <div>Toplam</div>{" "}
                <div>{counter * (pizzaPrice + ekMalzeme)} ₺ </div>
              </div>
            </div>
            <Link to="/Success">
              <button
                disabled={buttonDisabledMi}
                className="order-button"
                id="order-button"
                type="submit"
              >
                {" "}
                SİPARİŞ VER
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Form;
