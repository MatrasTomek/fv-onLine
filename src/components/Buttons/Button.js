const Button = ({ name, type, onClick, id }) => {
  return (
    <button id={id} type={type} onClick={onClick}>
      {name}
    </button>
  );
};

export default Button;
