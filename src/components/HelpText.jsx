import React from 'react'
import styles from "../style";

const HelpText = () => {
  return (
    <section className={`flex md:flex-row flex-col`}>
      <div className={`bg-[#232521] w-full absolute sm:px-16 px-10 left-1/2 transform -translate-x-1/2 text-center pb-[20px]`}>
        <h1 className={`pl-[200px] font-poppins font-semibold xs:text-[48px] text-[40px] text-[#95A1F9] xs:leading-[76.8px] leading-[66.8px] w-full text-left`}>Commonly Encountered Issues  </h1>

        <div className={"ml-[200px] bg-white h-[2px] w-[65%]"}> </div>
        <li className={`${styles.commonIssues}`}>Ensure that the file type is compatible for obstacles.</li>

        <div className={`${styles.greyLine}`}> </div>

        <li className={`${styles.commonIssues}`}>Ensure that the file type is compatible for start and end locations.</li>
        <div className={`${styles.greyLine}`}> </div>
        <li className={`${styles.commonIssues}`}>Ensure that the appropriate obstacle interaction settings are selected.</li>
        <div className={`${styles.greyLine}`}> </div>
        <li className={`${styles.commonIssues}`}>Ensure that conflicting interactions are not selected.</li>
        <div className={`${styles.greyLine}`}> </div>
        <li className={`${styles.commonIssues}`}>Ensure that files are not conflicting.</li>
        <div className={`${styles.greyLine}`}> </div>
      </div>
    </section>
  )
}

export default HelpText