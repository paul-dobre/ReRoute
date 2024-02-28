import React from 'react';

const Profile = () => {
    return (
        <section className="flex flex-col md:flex-row py-10 mt-10 justify-center items-center">
            <div className="flex flex-wrap justify-center md:justify-between">
                <ProfileCard name="Mahmoud Ali" imagePath="/mahmoud.jpg" />
                <ProfileCard name="Paul Dobre" imagePath="/pic.svg" />
                <ProfileCard name="Amen Fasil" imagePath="/pic.svg" />
                <ProfileCard name="Ammar Wajid" imagePath="/Ammar.jpeg" />
            </div>
        </section>
    )
}

const ProfileCard = ({ name, imagePath }) => {
    return (
        <div className="flex flex-col items-center justify-center mx-4 my-4 md:mx-0" style={{ margin: '50px' }}>
            <img src={imagePath} alt={name} className="w-[200px] h-[200px] rounded-full object-cover" />
            <h2 className="text-secondary text-2xl md:text-4xl mt-5">{name}</h2>
        </div>
    );
}

export default Profile;