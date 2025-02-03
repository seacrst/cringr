import { useDispatch, useSelector } from "react-redux";
import styles from "./notification.module.scss";
import cn from "classnames";
import { selectModal, setOpen } from "src/store/modal_slice";
import bell from "assets/icons/notifications.svg";

const Notification = () => {
  const { open, message, title } = useSelector(selectModal);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpen(false))
  };

  return (
    <div className={cn(styles.modal, {[styles.open]: open})}>
      <img className={styles.bell} src={bell} alt="bell" />
      <p className={styles.title}>{title}</p>
      <p className={styles.msg}>{message}</p>
      <span className={styles.x} onClick={handleClose}>&times;</span>
    </div>
  );
};

export default Notification;