import Card from "../card";
import "./_card-container.scss";

const CardContainer = (props) => {
  const { templates, lastCard, firstCard, category } = props;

  const currentTemplateCards = templates.slice(firstCard, lastCard);
  return (
    <div className="card-container">
      <div className="card-container-title">{category} templates</div>
      {currentTemplateCards.map((template, index) => (
        <Card key={index} template={template} />
      ))}
    </div>
  );
};

export default CardContainer;
