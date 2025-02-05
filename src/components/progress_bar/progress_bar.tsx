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
  const styleChs = (x: number) => kind === "chaos" && chaos >= x && !(chaos >= 100) && credits > 0;
  const styleCred = (x: number) => kind === "credits" && credits <= x && !(credits <= 0) && chaos < 100;
  return (
    <div className={cn
      (styles[kind], 
        styles.bar, 
        {[styles.pulseChs1]: styleChs(80)}, 
        {[styles.pulseChs2]: styleChs(90)}, 
        {[styles.pulseChs3]: styleChs(95)}, 
        {[styles.pulseCred1]: styleCred(20)},
        {[styles.pulseCred2]: styleCred(10)},
        {[styles.pulseCred3]: styleCred(5)}
      )}
        >
      <div className={styles[`filling_${kind}`]} style={{transition: "height .3s", height: `${kind === "chaos" ? chaos : credits}%`}}></div>
    </div>
  )
};

export default ProgressBar;