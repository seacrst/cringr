import styles from "./like.module.scss"
import heart from "assets/icons/heart.svg";
import liked from "assets/icons/liked.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { increaseChaos } from "src/store/user_slice";

const Like = () => {
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();

  const handleLike = () => {
    setLike(true);
    dispatch(increaseChaos(30))
  }

  return (
    <button onClick={handleLike} className={styles.like}>
    {like ? <img src={liked} alt="like" /> :<img src={heart} alt="like" />}
    LIKE
    </button>
  );
};

export default Like;