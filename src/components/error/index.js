import "./_error.scss";

const ErrorBox = (props) => {
  const { error } = props;
  return (
    <div className="error-box">
      <p>{error}. Please refresh your browser</p>
    </div>
  );
};

export default ErrorBox;
