import "./_error.scss";

const ErrorBox = (props) => {
  const { error } = props;
  return (
    <div className="error-box">
      <p>
        {error}. <b>Please refresh your browser</b>
      </p>
    </div>
  );
};

export default ErrorBox;
