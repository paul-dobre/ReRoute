import React from 'react'
import styles from '../style'

const Sponsor = () => {
  return (
    <section className={`flex flex-row ${styles.paddingY}`}>
        <div className='grid grid-cols-2 justify-center items-center'>
            <div>
                <img src="/geotab.png" alt="geotab" className="w-[600px] h-[200px] object-cover"/>
            </div>
            <div>
                <img src="/rogers.png" alt="rogers" className="w-[900px] h-[200px] object-cover"/>
            </div>
        </div>
    </section>
  )
}

export default Sponsor