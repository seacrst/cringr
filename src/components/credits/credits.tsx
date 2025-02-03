import Arrow from "../arrow/arrow";
import ProgressBar from "../progress_bar/progress_bar";
import styles from "./credits.module.scss"

const Credits = () => {
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