const Button = ({ name, type, onClick, id, disabled }) => {
  return (
    <button id={id} type={type} onClick={onClick} disabled={disabled}>
      {name}
    </button>
  );
};

export default Button;
