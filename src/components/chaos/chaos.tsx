import { useDispatch, useSelector } from "react-redux";
import Arrow from "../arrow/arrow";
import ProgressBar from "../progress_bar/progress_bar";
import styles from "./chaos.module.scss"
import { selectUser } from "src/store/user_slice";
import { useEffect } from "react";
import { setNotfication } from "src/store/notification_slice";

const Chaos = () => {
  const {user} = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.chaos === 100) {
      dispatch(setNotfication({
        open: true,
        type: "victory",
        title: "🎉Congratulations! You won the session! Follower +1🤖",
        message: `at ${new Date().toDateString()} Vanya wrote:\n Horosho!) This West dolls must know they location! Take 20 wooden.`
      }));
    }
  }, [user]);
  
  return (
    <section className={styles.chaos}>
      <header className={styles.header}>
        <span>C.H.A.O.S</span>
        <span>Get full to win</span>
      </header>

      <div className={styles.left}>
        <ProgressBar kind="chaos"/>
        <span>
          <Arrow kind="chaos"/>
        </span>
      </div>
    </section>
  );
};

export default Chaos;