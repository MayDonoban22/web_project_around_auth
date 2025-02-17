import Popup from "./Main/popup/Popup";

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
      buttonText="Aceptar"
      onSubmit={onClose}
    >
      {isSuccess ? (
        <img src="/check-icon.png" alt="check icon" />
      ) : (
        <img src="/uncheck.png" alt="uncheck icon" />
      )}
      <div
        className={`popup__icon ${
          isSuccess ? "popup__icon_success" : "popup__icon_error"
        }`}
      ></div>
    </Popup>
  );
}

export default InfoTooltip;
