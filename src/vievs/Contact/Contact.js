import { Link } from "react-router-dom";
import { useState } from "react";

import { Button, BackButton } from "../../components";

import styles from "./contact.module.scss";

const Contact = () => {
  const [status, setStatus] = useState("");

  const handleSubmitForm = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        setStatus("SUCCESS");
      } else {
        setStatus("ERROR");
      }
    };
    xhr.send(data);
  };

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={handleSubmitForm}
        action="https://formspree.io/f/xoqprbeg"
        method="POST"
      >
        <div className={styles.formItem}>
          <label>Telefon:</label>
          <input type="text" name="phone" required />
        </div>
        <div className={styles.formItem}>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>

        <div className={styles.agreed}>
          <input
            type="checkbox"
            name="confirmation"
            value="Akceptuję politykę RODO, chce otrzymać informację na temat aplikacji faktury onLine"
            required
          />
          <label>
            Chcę otrzymać informacje na temat aplikacji faktury onLine.
            Jednocześnie akceptuję politykę ciasteczek i RODO
          </label>
          <Link to="/rodo">zobacz politykę</Link>
        </div>
        <div className={styles.formButton}>
          <Button type="submit" name={"wyślij"} />
        </div>
        <div className={styles.confirmation}>
          {status === "SUCCESS" ? (
            <p>
              Dziękuję, Twoje zapytanie zostało wysłane - odpowiemy na nie jak
              najszybciej.
            </p>
          ) : (
            ""
          )}
          {status === "ERROR" && (
            <p>Ooops! Pola formularza nie są wypełnione</p>
          )}
        </div>
      </form>
      <div className={styles.backButton}>
        <BackButton />
      </div>
    </div>
  );
};

export default Contact;
