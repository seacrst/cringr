import styles from "./loader.module.scss";
import logo from "assets/images/CringrLogo.png";

const Loader = () => {
  return (
    <div className={styles.box}>
      <img className={styles.logo} src={logo} alt="logo" />
    </div>
  )
};

export default Loader;