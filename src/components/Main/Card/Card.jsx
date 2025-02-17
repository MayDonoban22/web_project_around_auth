function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  const cardLikeButtonClassName = `content__description-like ${
    props.card.isLiked ? "content__description-like-focus" : ""
  }`;

  function handleLike() {
    props.onLikeClick(props.card);
  }

  function handleDelete() {
    props.onEditDeleteTrashclick(props.card);
  }

  return (
    <div
      className="content__element content__element-template"
      id="card-element"
    >
      <img
        onClick={handleClick}
        src={props.card.link}
        alt="Places"
        className="content__element-picture"
      />
      <div className="content__description">
        <p className="content__description-text">{props.card.name}</p>
        <div className="content__likes">
          <button
            onClick={handleLike}
            className={cardLikeButtonClassName}
          ></button>
          <p className="content__like-number"></p>
        </div>
      </div>
      <button onClick={handleDelete} className="content__bin"></button>
    </div>
  );
}

export default Card;
