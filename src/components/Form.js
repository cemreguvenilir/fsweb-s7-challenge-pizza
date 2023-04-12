import React, { useState } from "react";
import axios from "axios";
import "./Form.css";
import { Link } from "react-router-dom";

const initialForm = {
  id: "",
  name: "",
  size: "",
  dough: "",
  ingredients: [],
  note: "",
  number: 1,
  price: 90,
};

const Form = () => {
  const [formData, setFormData] = useState(initialForm);
  const [ekMalzeme, setEkMalzeme] = useState(0);
  const [counter, setCounter] = useState(1);
  const [pizzaPrice, setPizzaPrice] = useState(0);

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
    let { value, type, checked } = e.target;
    if (type === "checkbox") {
      value = checked;
      if (checked) {
        setEkMalzeme(ekMalzeme + 5);
      } else {
        setEkMalzeme(ekMalzeme - 5);
      }
    }
    if (type === "radio") {
      setPizzaPrice(sizePrice[value]);
    }

    const newFormData = {
      ...formData,
      [e.target.name]: value,
    };
    setFormData(newFormData);

    /*const { value, type, checked, name } = e.target;
    if (type === "checkbox") {
      let newFormData;
      if (formData.ingredients.includes(value)) {
        newFormData = formData.ingredients.filter((m) => m !== value);
      } else {
        newFormData = [...formData.ingredients, value];
      }
      setFormData({
        ...formData,
        [name]: newFormData,
      });
    }*/

    /* let fieldData = type === "checkbox" ? checked : value;
    const newFormData = {
      ...formData,
      [name]: fieldData,
    };
    setFormData(newFormData);*/
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log(formData);
  }

  axios
    .post("https://reqres.in/api/users", formData)
    .then((response) => console.log(response.data))
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
            <div className="price"> {formData.price} ₺</div>{" "}
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
                    onChange={(e) => changeHandler(e)}
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
                    onChange={(e) => changeHandler(e)}
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
                    onChange={(e) => changeHandler(e)}
                  />
                  Büyük
                </label>
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
                  onChange={(e) => changeHandler(e)}
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
                          value={formData.ingredients === "e"}
                          //checked={formData.ingredients.indexOf(e)> -1}
                          onChange={(e) => changeHandler(e)}
                        ></input>
                        {e}{" "}
                      </label>
                    </div>
                  </>
                );
              })}
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
              onChange={(e) => changeHandler(e)}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
            />
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
            <button className="order-button" id="order-button" type="submit">
              {" "}
              <Link to="/success">SİPARİŞ VER</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Form;
