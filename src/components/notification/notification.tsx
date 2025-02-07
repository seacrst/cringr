import { useDispatch, useSelector } from "react-redux";
import styles from "./notification.module.scss";
import cn from "classnames";
import { closeNotificationModal, selectModal, setInitialNotification } from "src/store/notification_slice";
import bell from "assets/icons/notifications.svg";
import { useEffect, useState } from "react";
import won from "assets/audio/game-bonus-144751.mp3";
import failure from "assets/audio/080205_life-lost-game-over-89697.mp3";
import {Howl} from "howler";
import { selectPost, selectPosts, setCommented, setInitialPost, setInitialPosts, setRepostId } from "src/store/post_slice";
import { resetFollowers, selectUser, setChaos, setCredits, setDecreasedLikes, setFails, setFollowers, setInitialUser } from "src/store/user_slice";

import sendIcon from "assets/icons/send.svg";
import commentIcon from "assets/icons/comment_icon.svg";
import TypingText from "../typing_text/typing_text";
import { setMessage, setVisibility } from "src/store/message_slice";
import { moderates } from "src/parts";
import { MAX_FAILS } from "src/lib";

const Notification = () => {
  const { open, message, title, type } = useSelector(selectModal);
  const { post } = useSelector(selectPost);
  const { shuffle } = useSelector(selectPosts);
  const { user } = useSelector(selectUser);

  const [typingText, setTypingText] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setInitialNotification())
    dispatch(closeNotificationModal());
  };

  const handleButton = () => {
    dispatch(closeNotificationModal());
    dispatch(setInitialPost());
    dispatch(setInitialPosts());
    dispatch(setInitialUser());
  };

  const handleSend = () => {
    const {chaos: {value: chaos}, credits: {value: credits}} = shuffle.find(p => p.id === post.postId)!;
    const g = moderates.green.find(m => credits >= m.inChange[0] && credits <= m.inChange[1]);
    const r = moderates.red.find(m => chaos >= m.inChange[0] && chaos >= m.inChange[1]);
    const m = Math.abs(chaos) >= Math.abs(credits) ? r : g;

    dispatch(setInitialNotification());
    dispatch(setMessage([m?.message ?? "", m?.type === "chaos" ? "red" : "green"]));
    dispatch(setCommented([post.postId]));
    dispatch(setVisibility([true, post.postId]));
    dispatch(setChaos(chaos));
    dispatch(setCredits(credits));
  };

  const confirm = () => {
    dispatch(setInitialNotification());
  };
  
  const confirmInfo = () => {
    dispatch(setInitialNotification());
    dispatch(setRepostId([post.postId]));
    dispatch(setDecreasedLikes(2))
  };

  useEffect(() => {
    if (type === "comment" && open) {
      const t = setTimeout(() => {
        setTypingText(true);
      }, 500);

      return () => clearTimeout(t);
    }
  }, [type, message]);

  useEffect(() => {
    if (type === "victory" && open) {
      dispatch(setFollowers(1));
      sessionStorage.setItem("followers", `${user.followers + 1}`);

      const sound = new Howl({
        src: [won],
        loop: false,
        volume: 0.7,
        autoplay: false
      });
      
      if (!sound.playing()) {
        sound.play();
      }
    }

    if (open && type === "failure") {
      if (user.fails >= MAX_FAILS) {
        dispatch(resetFollowers());
        dispatch(setFails(0));
        sessionStorage.setItem("fails", "0");
        sessionStorage.setItem("followers", "0");
      }

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
  }, [open, type]);

  return (
    <div className={cn(styles.modal, {[styles.open]: open})}>
      {type === "comment" ? <img className={styles.bell} src={commentIcon} alt="comment" /> : <img className={styles.bell} src={bell} alt="bell" />}
      <div className={cn(styles.textBox, {[styles.commentBox]: type === "comment"})}>
        <p className={styles.title}>{title}</p>
        {type !== "comment" && <p className={styles.msg}>{message}</p>}
        {typingText && type === "comment" && <TypingText text={message} onComplete={() => {}}/>}
      </div>
      {type !== "victory" && type !== "failure" && <span className={styles.x} onClick={handleClose}>&times;</span>}
      {(type === "failure" || type === "victory") && <button onClick={handleButton} className={styles.bt}>TRY AGAIN</button>}
      {(type === "comment") && 
      <button onClick={handleSend} className={cn(styles.btSend, styles.bt)}>
        SEND
        <img src={sendIcon} alt="send" />
      </button>}
      {type === "info" && <button onClick={confirmInfo} className={styles.bt}>CONFIRM</button>}
      {type === "bonus" && <button onClick={confirm} className={styles.bt}>CLOSE</button>}
    </div>
  );
};

export default Notification;