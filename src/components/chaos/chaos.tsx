import { useDispatch, useSelector } from "react-redux";
import Arrow from "../arrow/arrow";
import ProgressBar from "../progress_bar/progress_bar";
import styles from "./chaos.module.scss"
import { selectUser } from "src/store/user_slice";
import { useEffect } from "react";
import { setNotfication, setOpen } from "src/store/modal_slice";

const Chaos = () => {
  const {user} = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.chaos === 100) {
      dispatch(setOpen(true));
      dispatch(setNotfication({
        title: "🎉You Won!",
        message: "Get your 20 wooden 🤪"
      }));
    }
  }, [user]);
  
  return (
    <section className={styles.chaos}>
      <header className={styles.header}>
        <span>C.H.A.O.S</span>
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