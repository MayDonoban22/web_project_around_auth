import { Link } from "react-router-dom";
import { useState } from "react";
import "../blocks/register.css";

const Register = ({ handleRegistration }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  return (
    <div className="register">
      <p className="register__welcome">Regístrate</p>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Correo electronico"
          value={data.email}
          onChange={handleChange}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Contraseña"
          value={data.password}
          onChange={handleChange}
        />
        <div className="register__button-container">
          <button type="submit" className="register__link">
            Regístrate
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p>¿Ya eres miembro? </p>
        <Link to="/login" className="register__login-link">
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
};

export default Register;
