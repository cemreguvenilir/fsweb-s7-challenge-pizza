import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

const initialForm = {
  id: "",
  name: "",
  size: "",
  dough: "",
  ingredients: [],
  note: "",
  number: 1,
  price: "",
};

const Form = () => {
  const [formData, setFormData] = useState(initialForm);
  const [ekMalzeme, setEkMalzeme] = useState(0);

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
    const { value, type, checked, name } = e.target;
    /* if (type === "checkbox") {
      let newFormData;
      if (formData.ingredients.includes(value)) {
        newFormData = formData.ingredients.filter((m) => m !== value);
      } else {
        newFormData = [...formData.ingredients, value];
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });*/

    let fieldData = type === "checkbox" ? checked : value;
    const newFormData = {
      ...formData,
      [name]: fieldData,
    };
    setFormData(newFormData);
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log(formData);
  }

  axios
    .post("https://reqres.in/api/users", formData)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));

  return (
    <>
      <div className="header">
        <h1>Teknolojik Yemekler</h1>
        <nav>
          <ul>
            <li className="navItem">Ana Sayfa</li>
            <li className="navItem">Seçenekler</li>
            <li className="navItem">Sipariş Oluştur </li>
          </ul>
        </nav>
      </div>
      <div className="total">
        <div className="container">
          <h2>Position Absolute Acı Pizza</h2>
          <div className="pizzaInfo">
            <div className="price">85.50 </div>{" "}
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

                <label htmlFor="big">
                  {" "}
                  <input
                    type="radio"
                    id="big"
                    name="size"
                    value="big"
                    checked={formData.size === "big"}
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
                <select id="dough-dropdown" name="dough">
                  <option value="" disabled selected hidden>
                    Hamur Kalınlığı
                  </option>
                  <option
                    checked={formData.dough === "thin"}
                    onChange={(e) => changeHandler(e)}
                    value="thin"
                  >
                    İnce
                  </option>
                  <option
                    checked={formData.dough === "normal"}
                    onChange={(e) => changeHandler(e)}
                    value="normal"
                  >
                    Normal
                  </option>
                  <option
                    checked={formData.dough === "thick"}
                    onChange={(e) => changeHandler(e)}
                    value="thick"
                  >
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
                          value={index}
                          // checked={formData.ingredients.includes(index)}
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
            <button className="countButton"> - </button>
            <input id="count" type="number" value="number" />
            <button className="countButton"> + </button>
          </div>
          <div className="boxButton">
            <div className="sumOrder">
              <h3>Sipariş Toplamı</h3>
              <div className="ingredientSum">
                <div>Seçimler</div> <div>25tl</div>
              </div>
              <div className="totalSum">
                <div>Toplam</div> <div>110.50tl</div>
              </div>
            </div>
            <button className="order-button" id="order-button" type="submit">
              SİPARİŞ VER
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Form;
