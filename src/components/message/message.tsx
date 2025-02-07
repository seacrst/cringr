import { useDispatch, useSelector } from "react-redux";
import { selectMessage, setVisibility } from "src/store/message_slice";
import styles from "./message.module.scss";
import cn from "classnames"
import notify from "assets/audio/output.mp3";
import {Howl} from "howler";

import { FC, useEffect, useState } from "react";

interface Props {
  id: number
}

const Message: FC<Props> = ({id}) => {
  const dispatch = useDispatch();
  const { message, visible, color } = useSelector(selectMessage);
  const [state, setState] = useState(false);

  useEffect(() => {
    if (visible) {
      const t1 = setTimeout(() => {
        setState(true);
      }, 300);

      const t2 = setTimeout(() => {
        dispatch(setVisibility([false, id]))
      }, 4200);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      }
    } else {
      setState(false);
    }
  }, [visible]);

  useEffect(() => {
    if (visible && message) {
      const t = setTimeout(() => {
        const sound = new Howl({
          src: [notify],
          loop: false,
          volume: 0.2,
          autoplay: true,
        });
        
        if (!sound.playing) {
          sound.play("into");
        }
      }, 500);

      return () => clearTimeout(t);
    }
  }, [visible]);
  
  return (
    <div style={{color: `${color === "red" ? "#ff5410" : "#00dd90"}`}} className={cn(styles.box, {[styles.visible]: visible && state})}>
      <p className={styles.text}>{message}</p>
    </div>
  )
};
export default Message;