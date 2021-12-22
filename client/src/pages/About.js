import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Box } from "@mui/system";
import AboutUs from "../components/about/AboutUs";
import AboutTeam from "../components/about/AboutTeam";
import AboutContact from "../components/about/AboutContact";
import aboutApi from "../api/aboutApi";
import LoadingScreen from "../components/LoandingScreen";

const StyleBox = styled(Box)({
    maxWidth: '120vh',
    margin: '1vh auto',
    backgroundColor: 'white',
    height: 'auto',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    flexDirection: 'colurmn',
    position: 'relative',
    zIndex: '100'
});


const About = () => {
    const [about, setAbout] = useState(null);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const response = await aboutApi.allAbout();
                setAbout(response);
            } catch (error) {
                console.log('Failed to fetch about: ', error)
            }
        }
        fetchAbout();
    }, [])


    return (
        <>
            {about && (
                <StyleBox>
                    <div id="about" className="about section-padding" data-scroll-index="1">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7">
                                    <AboutUs about={about.text} />
                                    <AboutTeam />
                                </div>
                                <div className="col-md-5">
                                    <AboutContact />
                                </div>
                            </div>
                        </div>
                    </div>

                </StyleBox >
            )}
            {!about && (<LoadingScreen />)}
        </>

    )
};

export default About;
