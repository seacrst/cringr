import { useDispatch, useSelector } from "react-redux";
import { selectMessage, setVisibility } from "src/store/message_slice";
import styles from "./message.module.scss";
import cn from "classnames"
import { FC, useEffect, useState } from "react";

interface Props {
  id: number
}

const Message: FC<Props> = ({id}) => {
  const dispatch = useDispatch();
  const { message, visible } = useSelector(selectMessage);
  const [state, setState] = useState(false);

  useEffect(() => {
    if (visible) {
      const t1 = setTimeout(() => {
        setState(true);
      }, 50);

      const t2 = setTimeout(() => {
        dispatch(setVisibility([false, id]))
      }, 3000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      }
    } else {
      setState(false);
    }
  }, [visible])
  
  return (
    <div className={cn(styles.box, {[styles.visible]: visible && state})}>
      <p className={styles.text}>{message}</p>
    </div>
  )
};
export default Message;