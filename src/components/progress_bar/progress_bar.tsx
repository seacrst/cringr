import { FC } from "react";
import cn from "classnames";
import styles from "./progress_bar.module.scss";
import { useSelector } from "react-redux";
import { selectUser } from "src/store/user_slice";


interface Props {
  kind: "chaos" | "credits"
}

const ProgressBar: FC<Props> = ({kind}) => {
  const {user: {chaos, credits}} = useSelector(selectUser);

  return (
    <div className={cn(styles[kind], styles.bar)}>
      <div className={styles[`filling_${kind}`]} style={{height: `${kind === "chaos" ? chaos : credits}%`}}></div>
    </div>
  )
};

export default ProgressBar;