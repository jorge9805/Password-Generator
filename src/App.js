import React, { useCallback, useEffect, useState } from "react";

import {
  capitalLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./constants/constants";

function App() {
  const [checked, setChecked] = useState({
    capitalLetters: false,
    lowerCaseLetters: false,
    numbers: false,
    specialCharacters: false,
  });
  const [passwordLength, setPasswordLength] = useState(12);
  const [password, setPassword] = useState("your password");
  const generatePassword = useCallback(() => {
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      let arrayChecked = [];
      for (let ele in checked) {
        if (checked[ele]) {
          arrayChecked.push(ele);
        }
      }
      console.log(arrayChecked);
      const type =
        arrayChecked[Math.floor(Math.random() * arrayChecked.length)];
      console.log(type);
      password += generateSymbol(type);
    }
    console.log(password);
    setPassword(password);
  }, [checked, passwordLength]);
  const handlePasswordLength = (e) => {
    setPasswordLength(e.target.value);
  };
  const handleChange = (e) => {
    console.log(e.target);
    setChecked({ ...checked, [e.target.name]: !checked[e.target.name] });
  };
  console.log(checked);
  const generateSymbol = (type) => {
    if (type === "capitalLetters") {
      return capitalLetters[Math.floor(Math.random() * capitalLetters.length)];
    }
    if (type === "lowerCaseLetters") {
      return lowerCaseLetters[
        Math.floor(Math.random() * lowerCaseLetters.length)
      ];
    }
    if (type === "specialCharacters") {
      return specialCharacters[
        Math.floor(Math.random() * specialCharacters.length)
      ];
    } else {
      return Math.floor(Math.random() * 10);
    }
  };

  useEffect(() => {
    generatePassword();
  }, [checked, generatePassword]);
  return (
    <div className="container d-flex flex-column p-3 align-items-center">
      <p className="h1 text-center p-5 font-weight-bold ">Password Generator</p>
      <div
        className="card text-white border-primary mb-3"
        style={{ maxWidth: "37rem" }}
      >
        <div className="card-header text-dark">
          <p className="h3 font-weight-bold">Settings</p>
        </div>
        <div className="card-body text-secondary">
          <section className="d-flex flex-row justify-content-center p-4">
            <section className="d-flex flex-column p-3 m-3">
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  type="checkbox"
                  name="capitalLetters"
                  id="capitalLetters"
                  checked={checked.capitalLetters}
                  onChange={handleChange}
                />
                <label
                  className="custom-control-label"
                  htmlFor="capitalLetters"
                >
                  Capital Letters
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  type="checkbox"
                  name="lowerCaseLetters"
                  id="lowerCaseLetters"
                  checked={checked.lowerCaseLetters}
                  onChange={handleChange}
                />
                <label
                  className="custom-control-label"
                  htmlFor="lowerCaseLetters"
                >
                  LowerCase Letters
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  type="checkbox"
                  name="numbers"
                  id="numbers"
                  checked={checked.numbers}
                  onChange={handleChange}
                />
                <label className="custom-control-label" htmlFor="numbers">
                  Numbers
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  className="custom-control-input"
                  type="checkbox"
                  name="specialCharacters"
                  id="specialCharacters"
                  checked={checked.specialCharacters}
                  onChange={handleChange}
                />
                <label
                  className="custom-control-label"
                  htmlFor="specialCharacters"
                >
                  Special Characters
                </label>
              </div>
            </section>
            <section className="d-flex flex-column p-3 m-3">
              <label for="customRange1" className="form-label">
                <p className="h3">Password Length</p>
              </label>
              <div className="d-flex flex-row justify-content-around">
                <p className="h4">{passwordLength}</p>
                <input
                  type="range"
                  className="form-range"
                  id="customRange1"
                  value={passwordLength}
                  onChange={handlePasswordLength}
                  name="passwordLength"
                />
              </div>
            </section>
          </section>
        </div>
      </div>
      <div className="card border-primary" style={{ width: "37rem" }}>
        <div className="card-header text-dark">
          <p className="h2 font weight-bold">Your Password:</p>
          <button
            onClick={() => navigator.clipboard.writeText(password)}
            className="btn btn-primary"
          >
            Copy
          </button>
        </div>
        <p class="h4 card-text text-center p-3">{password}</p>
      </div>
    </div>
  );
}

export default App;
