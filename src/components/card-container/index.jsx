import Card from "../card";
import "./_card-container.scss";

const CardContainer = (props) => {
  const { templates, lastCard, firstCard, category, totalTemplates } = props;

  const currentTemplateCards = templates.slice(firstCard, lastCard);
  return (
    <div className="card-container">
      <div className="card-container-title">{category} templates</div>
      <div className="card-container-total">{totalTemplates} templates</div>
      {currentTemplateCards.map((template, index) => (
        <Card key={index} template={template} />
      ))}
    </div>
  );
};

export default CardContainer;
