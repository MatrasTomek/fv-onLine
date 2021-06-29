import { Link } from "react-router-dom";
import styles from "./welcomeSite.module.scss";

const WelcomeSite = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Witaj w aplikacji do wystawiania faktur</h1>
      <div className={styles.info}>
        <ul>
          <li>
            Wersja testowa nie wymaga logowania i pozwala bezpłatnie wystawiać
            proste faktury.
          </li>

          <li>
            Testując aplikację nie masz uprawnień do niektórych oznaczonch w
            aplikacji funkcji, ale nie ponosisz też żadnych kosztów z tytułu
            użytkowania.
          </li>
          <li>
            W module testowym nie jesteś połączony z bazą danych, wykorzystywana
            jest pamięć Twojej przeglądarki i pliki cookie. Żadne dane nie są od
            Ciebie pobierane, wysyłane i przechowywane.
          </li>
          <li>
            Pełna wersja może być zintegrowana z dowolną bazą danych, lub
            posiadać wałasny CRM.
          </li>
          <li>
            Zapoznaj się z zasadami{" "}
            <Link to={"/rodo"}>RODO i polityką Cookies</Link>
          </li>

          <li>
            Jesteś zainteresowany pełną wersją?{" "}
            <Link to={"/contact"}>kliknij tutaj</Link>
          </li>
          <li>
            Chcesz mnie wesprzeć? Opublikuj opinie na temat aplikacji w{" "}
            <a target="blank" href="https://goo.gl/maps/Bz1SxDYVLoFyK6Qz5">
              {" "}
              Google
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WelcomeSite;
