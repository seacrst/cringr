import { FC } from "react";
import styles from "./arrow.module.scss";
import arr_down_chs from "assets/icons/arr_down_chs.svg"
import arr_up_chs from "assets/icons/arr_up_chs.svg"

import arr_down_cr from "assets/icons/arr_down_cr.svg"
import arr_up_cr from "assets/icons/arr_up_cr.svg"

interface Props {
  kind: "credits" | "chaos"
}

const Arrow: FC<Props> = ({kind}) => {
  return (
    <div className={styles.arr}>
      {kind === "chaos" ? (
        <img src={arr_down_chs} alt="arr" />
      ) : (
        <img src={arr_down_cr} alt="arr" />
      )}
    </div>
  );
};

export default Arrow;