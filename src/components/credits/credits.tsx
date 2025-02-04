import { setNotfication, setOpen } from "src/store/modal_slice";
import Arrow from "../arrow/arrow";
import ProgressBar from "../progress_bar/progress_bar";
import styles from "./credits.module.scss"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "src/store/user_slice";

const Credits = () => {
  const {user} = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.credits === 0) {
      dispatch(setOpen(true))
      dispatch(setNotfication({
        title: "Failure!",
        message: "You lost all the credits"
      }));
    }
  }, [user])
  return (
    <section className={styles.credits}>
      <header className={styles.header}>
        <span>CREDITS</span>
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