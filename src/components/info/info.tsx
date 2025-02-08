export default Info;
import { useDispatch } from "react-redux";
import styles from "./info.module.scss";
import { setInfo } from "src/store/menu_slice";
import mailIcon from "assets/icons/mail.svg";

function Info() {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(setInfo(false));
  };

  return (
    <div className={styles.modal}>
      <img className={styles.icon} src={mailIcon} alt="message" />
      <article className={styles.box}>
        <header className={styles.title}>
          <h3>Use Mouse to like or repost disinformation. You must fill out the CHAOS bar to win.
          If you empty the Credits bar - you lose.</h3>
        </header>
        <p>Hello World, Disinfo Bot!</p>
        <p>I Vanya, your father (sozdatel koroche). You have destroy West dolls!</p>
        <ol className={styles.list}>
          <li>You must seed C.H.A.O.S .!. (Cognitive Hacking Assault Operation Success).</li>
          <li>SO make it you have LIKE disinfo POSTS! (It is this for because we made you!111).</li>
          <li>To you only is 10 Likes.</li>
        </ol>
        <p>If in you is all CHAOS you win !)))))</p>
        <p>If in you is nothing CREDITS - I YOU RESET! (you lose).</p>
        <p>Mind two.</p>
      </article>
      <button className={styles.bt} onClick={close}>CLOSE</button>
    </div>
  );
};