const Button = ({ name, type, onClick }) => {
  return (
    <button type={type} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
