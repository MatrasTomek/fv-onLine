import { Button, BackButton } from "../../components";

import styles from "./instruction.module.scss";

const Instruction = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Instrukcja obsługi aplikacji Zlecenia on-line</h1>
      <ul>
        <li>
          <p>Po kliknięciu przycisku</p> <Button name={"testuj"} />
          <p>lub</p> <Button name={"menu"} />
          <p>masz dostęp do modułu zleceń.</p>
        </li>
        <li>
          <p>Zanim dodasz zlecenie – ustaw parametry firmy</p>
          <Button name={"parametry firmy"} />
          <p>
            podając dane swojej firmy. Dane te są przechowywany wyłącznie
            lokalnie na Twojej przeglądarce. Bez podanych parametrów Twojej
            firmy na wydruku zlecenia nie pojawi się zleceniodawca.
          </p>
        </li>
        <li>
          <p>Następnie kliknij</p> <Button name={"dodaj zlecenie"} />
          <p>
            w module testowym nie masz dostępu do bazy danych, wszystkie dane
            należy wprowadzić ręcznie. Jeżeli chcesz uzyskać dostęp do pełnej
            wersji
          </p>
          <a href="">KLIKNIJ TUTAJ</a>
        </li>
        <li>
          <p>Klikając przyciski </p> <Button name={"dodaj"} />
          <p>dodasz klienta, przewoźnika, dane zlecenia oraz fracht i termin</p>
        </li>
        <li>
          <p>
            Postępuj zgodnie z wymaganiami formularzy, niektóre dane są wymagane
          </p>
        </li>
        <li>
          {" "}
          <p>Po uzupełnieniu danych zlecenia pojawi się przycisk</p>
          <Button name={"zapisz"} />
          <p>
            – kliknięcie zapisze Twoje zlecenie lokalnie w pamięci przeglądarki
            oraz da Tobie możliwość jego wydruku.
          </p>
        </li>
      </ul>
      <div className={styles.button}>
        <BackButton />
      </div>
    </div>
  );
};

export default Instruction;
