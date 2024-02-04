import React from 'react'
import styles from "./style";
import { Navbar, MapLeaf, MapSidebar} from "./components";


const StartRouting = () => {
  return (
    <div id="about" className="bg-primary w-full overflow-hidden">
    <div className =''>
        <Navbar />
    </div>
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className ='flex' >
        <MapLeaf/>
        <MapSidebar/>
      </div>
    </div>
  </div>
  )
}


export default StartRouting