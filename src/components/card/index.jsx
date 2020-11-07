import "./_card.scss";

const Card = ({ template }) => {
  // console.log(template);
  return (
    <div className="card-item">
      <div className="sec-one">
        <h4>{template.name}</h4>
        <p>{template.description}</p>
      </div>
      <div className="sec-two">
        <a
          href={template.link}
          target="_blank"
          rel="noreferrer"
          className="card-link"
        >
          Use template
        </a>
      </div>
    </div>
  );
};

export default Card;
