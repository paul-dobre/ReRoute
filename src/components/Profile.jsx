import React from 'react'

const Profile = () => {
  return (
    <section className={`flex md:flex-row flex-col py-10 mt-10`}>
        <div className="grid grid-cols-4 items-center justify-between w-full">
            <div className='flex flex-col items-center justify-center'>
                <img src="/mahmoud.jpg" alt="Mahmoud" className="w-[200px] h-[200px] rounded-full object-cover"/>
                <h2 className='text-secondary text-[35px] text-[#F2F1F2] mt-5'>Mahmoud Ali</h2>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <img src="/pic.svg" alt="Mahmoud" className="w-[200px] h-[200px] rounded-full object-cover"/>
                <h2 className='text-secondary text-[35px] text-[#F2F1F2] mt-5'>Paul Dobre</h2>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <img src="/pic.svg" alt="Mahmoud" className="w-[200px] h-[200px] rounded-full object-cover"/>
                <h2 className='text-secondary text-[35px] text-[#F2F1F2] mt-5'>Amen Fasil</h2>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <img src="/pic.svg" alt="Mahmoud" className="w-[200px] h-[200px] rounded-full object-cover"/>
                <h2 className='text-secondary text-[35px] text-[#F2F1F2] mt-5'>Ammar Wajid</h2>
            </div>
        </div>
    </section>
  )
}

export default Profile