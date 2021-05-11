import { useHistory } from "react-router-dom";

const BackButton = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };
  return <button onClick={handleGoBack}>wstecz</button>;
};

export default BackButton;
