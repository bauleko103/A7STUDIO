
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import HomeSlide from '../components/home/HomeSlide';


const StyleBoxHome = styled(Box)(({ theme }) => ({
  padding: '0 2vh',
  maxWidth: '120vh',
  marginTop:"1vh",
  marginBottom:"1vh",
  marginLeft:"auto",
  marginRight:"auto",
  backgroundColor: 'white',
  height: '70vh',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  alignContent: 'flex-start',
  flexDirection: 'colurmn',
  position: 'relative',
  zIndex: '100',
  [theme.breakpoints.down('md')]: {
    height: '70vh',
  },
  
}));


const Home = () => {
  return (
    <>
      <StyleBoxHome >
        <HomeSlide />
       
      </StyleBoxHome>
      
    </>
  )
};

export default Home;
