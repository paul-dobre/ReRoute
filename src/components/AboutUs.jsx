import React from 'react';
import styles from "../style";
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {

    const navigate = useNavigate();

    const handleStartRouting = () => {
      navigate('/startrouting');
    };

    return (
        <section>
        <div className="relative h-screen flex flex-col items-center justify-center text-center text-white py-0 px-3">
            <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <video className="min-w-full min-h-full absolute object-cover" src="Info_video_4.mp4" type="video/mp4" autoPlay muted loop style={{ filter: 'none' }}></video>
            </div>
            <div className="video-content space-y-2 z-10 max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
                <h1 className={`${styles.heading2} text-blue-600 `}>About ReRoute</h1>
                <div className="md:text-3xl sm:text-2xl text-xl font-mono pyinline-bock">
                    <TypeAnimation
                        sequence={[
                            "ReRoute is a geospatial platform with dynamic routing capabilities, using algorithms tailored to interact with user-specified shapefiles. Our platform processes geospatial data for the purpose of navigating and fleet management. Namely, to navigate around areas rather than through them. This may be for a wide variety of reasons, such as an area may be deemed hazardous depending on cargo, or a certain section of the transportation network cannot be driven through, either for legal reasons or for external factors.",
                            2000
                        ]}
                        wrapper="span" speed={50} />
                </div>
                <button className="text-primary w-[150px] h-[50px] duration-500 bg-white hover:bg-secondary hover:text-white rounded-full my-6 mx-auto" onClick={handleStartRouting}>Start Routing</button>
            </div>
        </div>
            </section>
    );
};

export default AboutUs;
