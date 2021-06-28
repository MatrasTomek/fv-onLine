import { BackButton } from "../../components";

import styles from "./rodo.module.scss";

const Rodo = () => {
  return (
    <div className={styles.wrapper}>
      <h1> Polityka RODO i Ciasteczek.</h1>
      <h3>Informacje o użytkowniku</h3>
      <p>
        Podczas przeglądania stron użytkownik może zostać poproszony o podanie
        swoich danych osobowych. Użytkownik jest proszony tylko o te dane które
        są niezbędne do zakończenia danej czynności. Obowiązkowe dane są
        odpowiednio oznaczone - ich nie podanie może przerwać czynność.
        Użytkownik korzystając ze strony. Użytkownik korzystając ze strony i
        przekazując świadomie i dobrowolnie swoje dane osobowe wyraża zgodę
        naich gromadzenie i wykorzystywanie zgodnie z powyższą polityką przez
        firme ND Tomasz Matras. Użytkownik ma prawo w każdej chwili do
        uzupełniania, aktualizacji lub usunięcia danych osobowych, które nam
        przekazał, jeśli są one niekompletne, nieaktualne lub nieprawdziwe.
        Zmiany w swoich danych użytkownik może dokonać korzystając ze swojej
        skrzynki e-mail wysyłając wiadomość na adres:
      </p>
      <a href="mailto: tomasz.matras@developerweb.pl">
        tomasz.matras@developerweb.pl
      </a>
      <p>
        Właściciel strony może gromadzić dane przesłane automatycznie
        przezprzeglądarkę użytkownika przeglądającego stronę (to głównie IP
        użytkownika, nazwa systemu operacyjnego użytkownika, nazwę i wersję
        przeglądarki). Dane te gromadzone są głównie w celach statystycznych.
        Nie zawierają one żadnych danych osobistych użytkownika.
      </p>
      <h3>Pliki tymczasowe</h3>
      <p>
        Pliki cookies wykorzystywane są w celu dostosowania zawartości podstron
        do preferencji użytkownika, optymalizacji korzystania ze strony
        internetowej oraz w celach statystycznych, aby pomóc nam w
        dostosowywaniu struktury, funkcjonalności i zawartości serwisu. Są one
        zapisywane na urządzeniu końcowym użytkownika. Ta strona nie wymaga
        akceptacji ciasteczek, jednak ich akceptacja pozwoli w pełni korzystać
        ze wszystkich funkcjonalności serwisu. W każdej chwili użytkownik może
        zmienić w swojej przeglądarce ustawienia dotyczące plików cookie, w tym
        również je zablokować,niemniej w takim przypadku nie gwarantujemy
        poprawnego działania serwisu. Sposób blokowania lub kasowania tych
        plików różni się w zależności od używanej przeglądarki internetowej.
        Więcej informacji o tym ustawieniu można znaleźć na stornie internetowej
        producenta Twojej przeglądarki. Pamiętaj!mCiasteczka nie są szkodliwe
        ani dla użytkownika, ani dla jego komputera i danych znajdujących się na
        nim.
      </p>

      <h3>Pozostałe informacje</h3>
      <p>
        Niniejsza polityka prywatności jest dostępna na stronie
        www.developerweb.pl/rodo i jest dostępna dla każdego odwiedzającego
        stronę. Właściciel strony zastrzega sobie prawo do wprowadzania zmian w
        Polityce Prywatności. Każda zmiana powyższej polityki będzie
        opublikowana na stronie www.developerweb.pl/rodo. Internauta
        odwiedzający stronę www.developerweb.pl, akceptuje powyższą politykę.
        Użytkownik, który nie akceptuje warunków powyższej polityki zobowiązany
        jest do powstrzymania się od przeglądania stron serwisu.
      </p>
      <div className={styles.button}>
        <BackButton />
      </div>
    </div>
  );
};

export default Rodo;
