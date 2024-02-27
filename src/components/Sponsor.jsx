import React from 'react'
import styles from '../style'

const Sponsor = () => {
  return (
    <section className={`flex justify-center items-center min-h-screen -mb-32 -mt-32`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center items-center">
        <div className="flex justify-center mb-8 md:mb-0">
          <img src="/UC-Logo2.png" alt="geotab" className="w-[200px] md:w-[50%] h-auto mx-32" />
        </div>
        <div className="flex justify-center">
          <img src="/UC-vert-white-2.png" alt="rogers" className="w-[200px] md:w-[300px] h-auto" />
        </div>
      </div>
    </section>
  );
};

export default Sponsor;
