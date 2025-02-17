import { Link } from "react-router-dom";
import { useState } from "react";
import "../blocks/login.css";

const Login = ({ handleLogin }) => {
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
    handleLogin(data);
  };

  return (
    <div className="login">
      <p className="login__welcome">Inicia sesión</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <label htmlFor="correo-electronico"></label>
        <input
          id="email"
          required
          name="email"
          type="text"
          placeholder="Correo electronico"
          value={data.username}
          onChange={handleChange}
        />
        <input
          id="password"
          required
          name="password"
          type="password"
          placeholder="Contraseña"
          value={data.password}
          onChange={handleChange}
        />
        <div className="login__button-container">
          <button type="submit" className="login__link">
            Iniciar sesión
          </button>
        </div>
      </form>

      <div className="login__signup">
        <p>¿Aún no eres miembro?</p>
        <Link to="/register" className="signup__link">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

export default Login;
