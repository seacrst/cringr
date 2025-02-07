import { setNotfication } from "src/store/notification_slice";
import Arrow from "../arrow/arrow";
import ProgressBar from "../progress_bar/progress_bar";
import styles from "./credits.module.scss"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFail, selectUser } from "src/store/user_slice";

const Credits = () => {
  const {user} = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.credits === 0) {
      sessionStorage.setItem("fails", `${user.fails + 1}`);
      dispatch(setNotfication({
        open: true,
        type: "failure",
        title: "Failure!",
        message: "You lost all the credits"
      }));
      dispatch(addFail());
    }
  }, [user.credits]);

  return (
    <section className={styles.credits}>
      <header className={styles.header}>
        <span>CREDITS</span>
        <span>&nbsp;</span>
      </header>

      <div className={styles.right}>
        <span>
          <Arrow kind="credits"/>
        </span>
        <ProgressBar kind="credits"/>
      </div>
    </section>
  );
};

export default Credits;