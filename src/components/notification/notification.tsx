import { useDispatch, useSelector } from "react-redux";
import styles from "./notification.module.scss";
import cn from "classnames";
import { selectModal, setOpen } from "src/store/modal_slice";
import bell from "assets/icons/notifications.svg";
import { useEffect } from "react";
import won from "assets/audio/game-bonus-144751.mp3";
import failure from "assets/audio/080205_life-lost-game-over-89697.mp3";
import {Howl} from "howler";
import { setInitialPost, setInitialPosts } from "src/store/post_slice";
import { setFollowers, setInitialUser } from "src/store/user_slice";

const Notification = () => {
  const { open, message, title } = useSelector(selectModal);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const handleButton = () => {
    dispatch(setOpen(false));
    dispatch(setInitialPost());
    dispatch(setInitialPosts());
    dispatch(setInitialUser());
  };

  useEffect(() => {
    if (open && title.endsWith("Won!")) {
      const sound = new Howl({
        src: [won],
        loop: false,
        volume: 0.7,
        autoplay: false
      });

      dispatch(setFollowers(1));
      
      if (!sound.playing()) {
        sound.play();
      }
    }

    if (open && title.startsWith("Failure")) {
      const sound = new Howl({
        src: [failure],
        loop: false,
        volume: 0.7,
        autoplay: false
      });
      
      if (!sound.playing()) {
        sound.play();
      }
    }
  }, [open]);

  return (
    <div className={cn(styles.modal, {[styles.open]: open})}>
      <img className={styles.bell} src={bell} alt="bell" />
      <div className={styles.textBox}>
        <p className={styles.title}>{title}</p>
        <p className={styles.msg}>{message}</p>
      </div>
      {!(title.startsWith("Failure") || title.endsWith("Won!")) && <span className={styles.x} onClick={handleClose}>&times;</span>}
      {(title.startsWith("Failure") || title.endsWith("Won!")) && <button onClick={handleButton} className={styles.bt}>TRY AGAIN</button>}
    </div>
  );
};

export default Notification;