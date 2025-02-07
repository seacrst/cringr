import { FC, useEffect, useState } from "react";
import styles from "./arrow.module.scss";
import arr_down_chs from "assets/icons/arr_down_chs.svg"
import arr_up_chs from "assets/icons/arr_up_chs.svg"

import arr_down_cr from "assets/icons/arr_down_cr.svg"
import arr_up_cr from "assets/icons/arr_up_cr.svg"

import { useSelector } from "react-redux";
import { selectCreditsHints, selectPost, selectPosts } from "src/store/post_slice";
import { selectUser } from "src/store/user_slice";

interface Props {
  kind: "credits" | "chaos"
}

const Arrow: FC<Props> = ({kind}) => {
  const {post: {currentId}} = useSelector(selectPost);
  const {posts} = useSelector(selectPosts);
  const {user} = useSelector(selectUser);

  const [flag, setFlag] = useState({
    chaos: NaN,
    cred: NaN
  })
  const { loseHint } = useSelector(selectCreditsHints);

  const none = <div style={{width: "64px", height: "64px", background: "transparent"}}/>;
  
  useEffect(() => {
    const post = posts.find(post => post.id === currentId)!;

    if (currentId) {
      setFlag({
        chaos: post.chaos.value,
        cred: post.credits.value
      });
    }
  }, [currentId, user.chaos, user.credits, posts]);

  if (loseHint && kind === "credits") {
    return (
      <div className={styles.arr}>
        <img src={arr_down_cr} alt="arr" />
      </div>
    )
  }

  if (currentId === 0 || isNaN(flag.chaos) && isNaN(flag.cred)) {
    return none;
  }

  if (kind === "chaos" && user.chaos + flag.chaos === user.chaos || kind === "credits" && user.credits + flag.cred === user.credits) {
    return none;
  }
  
  return (
    <div className={styles.arr}>
      {kind === "chaos" ? (
        user.chaos + flag.chaos < user.chaos ? <img src={arr_down_chs} alt="arr" /> : <img src={arr_up_chs} alt="arr" />
      ) : (
        user.credits + flag.cred < user.credits ? <img src={arr_down_cr} alt="arr" /> : <img src={arr_up_cr} alt="arr" />
      )}
    </div>
  );
};

export default Arrow;