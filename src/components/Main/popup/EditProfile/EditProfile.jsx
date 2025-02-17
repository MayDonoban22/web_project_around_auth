import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import Popup from "../Popup";

export default function EditProfile(props) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser?.name || "May Donoban Espitia");
  const [description, setDescription] = useState(
    currentUser?.about || "Industrial"
  );

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = () => {
    props.handleEditProfile({ name, about: description });
  };

  return (
    <Popup
      name="popup-profile"
      title="Editar perfil"
      onSubmit={handleSubmit}
      isOpen={props.isEditProfilePopupOpen}
      onClose={props.onClose}
    >
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
        id="input-name"
        minLength="2"
        maxLength="40"
        placeholder="Nombre"
        className="popup__item"
        required
      />
      <span className="popup__input-error input-name-error"></span>
      <input
        type="text"
        name="about"
        value={description}
        onChange={handleDescriptionChange}
        id="input-about"
        minLength="2"
        maxLength="200"
        placeholder="Acerca de mi"
        className="popup__item"
        required
      />
      <span className="popup__input-error input-about-error"></span>
    </Popup>
  );
}
