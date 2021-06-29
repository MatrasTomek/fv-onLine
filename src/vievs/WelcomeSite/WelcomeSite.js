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
            Testując aplikację nie masz upawnień do niektórych oznaczoncy w
            aplikacji funkcji, ale nie ponosisz tez żadnych kosztów z tytułu
            użytkowania.
          </li>
          <li>
            W module testowym nie jestś połączony z bazą danych, wykorzystywana
            jest pamięć Twojej przegladarki i pliki cookie. Żadne dane nie są od
            Ciebie pobierane, wysyłane i przechowywane.
          </li>
          <li>
            Pełna wersja może być zintegrowana z dowolą bazą danych, lub
            posiadać wałsny CRM.
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
              google
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WelcomeSite;
