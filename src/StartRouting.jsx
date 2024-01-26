import React from 'react'
import styles from "./style";
import { Navbar, MapDisplay, MapLeaf } from "./components";

const StartRouting = () => {
  return (
    <div id="about" className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
    <div className={`bg-primary ${styles.flexStart} justify-center`}>
      <div >
        <MapLeaf/>
      </div>
    </div>
    <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
      </div>
    </div>
  </div>
  )
}

export default StartRouting