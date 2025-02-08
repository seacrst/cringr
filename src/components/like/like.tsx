import styles from "./like.module.scss"
import heart from "assets/icons/heart.svg";
import liked from "assets/icons/liked.svg";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import pop from "assets/audio/multi-pop-1-188165.mp3"
import { Howl } from "howler";
import { setMessage, setVisibility } from "src/store/message_slice";
import { decreaseLikes, selectUser, setChaos, setCredits, setStreak } from "src/store/user_slice";
import { moderates } from "src/parts";
import { addLikedIds, selectPosts, setLikedId } from "src/store/post_slice";

interface Props {
  id: number
  credits: number,
  chaos: number,
}

const Like: FC<Props> = ({chaos, credits, id}) => {
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(selectUser);
  const {shuffle, reposted} = useSelector(selectPosts);

  const handleLike = () => {
    const sound = new Howl({
      src: [pop],
      loop: false,
      volume: 0.5,
      autoplay: true,
    });

    if (!sound.playing) {
      sound.play();
    }

    if (user.chaos + chaos > user.chaos) {
      dispatch(setStreak(1));
    }
    
    setLike(true);
    dispatch(setLikedId(id));
    dispatch(addLikedIds([id]));

    const g = moderates.green.find(m => credits >= m.inChange[0] && credits <= m.inChange[1]);
    const r = moderates.red.find(m => chaos >= m.inChange[0] && chaos <= m.inChange[1]);
    const m = Math.abs(chaos) >= Math.abs(credits) ? r : g;

    dispatch(setMessage([m?.message ?? "", m?.type === "chaos" ? "red" : "green"]))
    dispatch(decreaseLikes());
    dispatch(setVisibility([true, id]));
    dispatch(setChaos(chaos));
    dispatch(setCredits(credits));
  };

  useEffect(() => {
    setLike(false);

    return () => {
      dispatch(setLikedId(0));
    }
  }, [shuffle, reposted]); 

  return (
    <button onClick={handleLike} className={styles.like} disabled={like}>
      {like ? <img src={liked} alt="like" /> :<img src={heart} alt="like" />}
      LIKE
    </button>
  );
};

export default Like;