import React, { useEffect, useState } from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Carousel } from 'react-bootstrap';
import bannersApi from '../../../api/bannersApi';
import LoadingScreen from '../../LoandingScreen';

export default function SlideMenu() {
  const [imageSlide, setImageSlide] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await bannersApi.allBanner();
        setImageSlide(response);
      } catch (error) {
        console.log('Failed to fetch banners: ', error)
      }
    }
    fetchBanners();
  }, [])


  return (
    <>
    {imageSlide && (
      <Carousel>
        {imageSlide.banners.map((slideImage, index) => (
          <Carousel.Item key={index}>
          <img
            className="d-block w-100 img-slide-home"
            src={`${process.env.REACT_APP_IMAGE_URL}/${slideImage}`}
            alt={slideImage}
          />
        </Carousel.Item>
        ))}
      </Carousel>
    )}
    {!imageSlide && (<LoadingScreen/>)}
    </>
      
  )
}