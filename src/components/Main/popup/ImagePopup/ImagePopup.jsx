function ImagePopup(props) {
  return (
    <>
      <div
        className={`popup ${props.selectedCard ? "popup_show" : ""}`}
        id={props.name}
      >
        <div className="popup__container">
          <button
            className="popup__close"
            type="button"
            onClick={props.onClose}
          ></button>
          <img
            src={props.selectedCard?.link}
            alt=""
            className="popup__picture-src"
          />
          <h3 className="">{props.selectedCard?.name}</h3>
        </div>
        <div className="popup__overlay"></div>
      </div>
    </>
  );
}

export default ImagePopup;
