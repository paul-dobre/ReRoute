import React from 'react'
import styles from "./style";
import { Navbar, Hero, Team, Button, Sponsor, Card, CardInfo, Info } from "./components";

const Home = () => {
  return (
    <div id="about" className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>
    <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Sponsor/>
        <CardInfo/>
        <Info/>
      </div>
    </div>
  </div>
  )
}

export default Home