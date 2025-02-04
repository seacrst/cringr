import { FC, useEffect, useState } from "react";
import styles from "./arrow.module.scss";
import arr_down_chs from "assets/icons/arr_down_chs.svg"
import arr_up_chs from "assets/icons/arr_up_chs.svg"

import arr_down_cr from "assets/icons/arr_down_cr.svg"
import arr_up_cr from "assets/icons/arr_up_cr.svg"
import { useSelector } from "react-redux";
import { selectPost, selectPosts } from "src/store/post_slice";

interface Props {
  kind: "credits" | "chaos"
}

const Arrow: FC<Props> = ({kind}) => {
  const {currentId} = useSelector(selectPost);
  const {posts} = useSelector(selectPosts);
  const post = posts.find(post => post.id === currentId);

  const [flag, setFlag] = useState({
    chaosNeg: post?.onLike.chaos.add === null,
    chaosPos: post?.onLike.chaos.sub === null,
    credPos: post?.onLike.credits.sub === null,
    credNeg: post?.onLike.credits.add === null
  })

  const none = <div style={{width: "64px", height: "64px", background: "transparent"}}/>;

  useEffect(() => {
    const post = posts.find(post => post.id === currentId)!;

    if (currentId) {
      setFlag({
        chaosNeg: post.onLike.chaos.add === null,
        chaosPos: post.onLike.chaos.sub === null,
        credPos: post.onLike.credits.sub === null,
        credNeg: post.onLike.credits.add === null
      });
    }
  }, [currentId])

  if (currentId === 0) {
    return none;
  }

  if (kind === "chaos" && flag.chaosNeg === null && flag.chaosPos === null || kind === "credits" && flag.credNeg === null && flag.credPos === null) {
    return none;
  }
  
  return (
    <div className={styles.arr}>
      {kind === "chaos" ? (
        flag.chaosNeg ? <img src={arr_down_chs} alt="arr" /> : <img src={arr_up_chs} alt="arr" />
      ) : (
        flag.credNeg ? <img src={arr_down_cr} alt="arr" /> : <img src={arr_up_cr} alt="arr" />
      )}
    </div>
  );
};

export default Arrow;