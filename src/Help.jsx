import React from 'react'
import styles from "./style";
import { Navbar, Profile} from "./components";
import HelpText from './components/HelpText';
import VideoPlayer from './components/VideoPlayer';

const Help = () => {
    return (
      <div id="help" className="bg-primary w-full overflow-hidden">
      <div>
        <div>
          <Navbar />
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
            <VideoPlayer/>
        </div>
      </div>
      <div className={` ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
            <HelpText/>
        </div>
      </div>
    </div>
    )
  }

  export default Help 