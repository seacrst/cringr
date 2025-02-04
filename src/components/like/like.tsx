import styles from "./like.module.scss"
import heart from "assets/icons/heart.svg";
import liked from "assets/icons/liked.svg";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { rand } from "src/lib";
import { Post } from "src/parts";
import { setVisibility } from "src/store/message_slice";
import { decreaseChaos, decreaseCredits, decreaseLikes, increaseChaos, increaseCredits } from "src/store/user_slice";

interface Props {
  id: number
}

const Like: FC<Pick<Post, "onLike"> & Props> = ({onLike: {chaos, credits}, id}) => {
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();

  const handleLike = () => {
    setLike(true);
    dispatch(setVisibility([true, id]));
    dispatch(decreaseLikes())

    if (chaos.add) {
      dispatch(increaseChaos(rand(chaos.add.min, chaos.add.max)));
    }

    if (chaos.sub) {
      dispatch(decreaseChaos(rand(chaos.sub.min, chaos.sub.max)));
    }

    if (credits.add) {
      dispatch(increaseCredits(rand(credits.add.min, credits.add.max)))
    }

    if (credits.sub) {
      dispatch(decreaseCredits(rand(credits.sub.min, credits.sub.max)));
    }
  }

  return (
    <button onClick={handleLike} className={styles.like} disabled={like}>
    {like ? <img src={liked} alt="like" /> :<img src={heart} alt="like" />}
    LIKE
    </button>
  );
};

export default Like;