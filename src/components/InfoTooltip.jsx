import Popup from "./Main/popup/Popup";
import checkIcon from "../images/check-icon.png";
import uncheckIcon from "../images/uncheck-icon.png";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      name="infoTooltip"
      title={
        isSuccess
          ? "¡Correcto! Ya estás registrado."
          : "Uy, algo salió mal. Por favor, inténtalo de nuevo."
      }
      showText={false}
      showButton={false}
    >
      {isSuccess ? (
        <img
          src={checkIcon}
          className="popup__animated-image"
          alt="check icon"
        />
      ) : (
        <img
          src={uncheckIcon}
          className="popup__animated-image"
          alt="uncheck icon"
        />
      )}
      <h2 className="popup__title">
        {isSuccess
          ? "¡Correcto! Ya estás registrado."
          : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
      </h2>
      <div
        className={`popup__icon ${
          isSuccess ? "popup__icon_success" : "popup__icon_error"
        }`}
      ></div>
    </Popup>
  );
}

export default InfoTooltip;
