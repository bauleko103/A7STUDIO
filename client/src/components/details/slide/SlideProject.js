import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Box, Stack } from '@mui/material';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const SlideProject = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Grid
        container
        alignItems="stretch"
        columnSpacing={1}
      >
        <Grid item xs={12} sm={9}>
          <FocusImage>
            <Box
              component='img'
              src={`${process.env.REACT_APP_IMAGE_URL}/${images[index]}`}
              alt={images[index]}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onClick={() => setIsOpen(true)}
            />
          </FocusImage>
        </Grid>
        <Grid item xs={12} sm={3}>
          <ScrollWrapper
            spacing={1}
            direction={{ xs: 'row', sm: 'column', md: 'column', lg: 'column' }}
          >
            {images.map((image, i) => {
              return (
                <Image
                  key={i}
                  sx={{
                    ':after': {
                      opacity: index === i ? 1 : 0
                    }
                  }}
                  onClick={() => setIndex(i)}
                >
                  <Box
                    component='img'
                    src={`${process.env.REACT_APP_IMAGE_URL}/${image}`}
                    alt={image}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Image>
              )
            })}
          </ScrollWrapper>
        </Grid>
      </Grid>
      {isOpen && (
        <Lightbox
          mainSrc={`${process.env.REACT_APP_IMAGE_URL}/${images[index]}`}
          nextSrc={`${process.env.REACT_APP_IMAGE_URL}/${images[(index + 1) % images.length]}`}
          prevSrc={`${process.env.REACT_APP_IMAGE_URL}/${images[(index + images.length - 1) % images.length]}`}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setIndex((index + images.length - 1) % images.length)}
          onMoveNextRequest={() => setIndex((index + 1) % images.length)}
        />
      )}
    </>
  )
};

const FocusImage = styled('div')({
  width: '100%',
  height: '50vh',
  cursor: 'pointer'
});

const ScrollWrapper = styled(Stack)(({ theme }) => ({
  maxHeight: '50vh',
  overflow: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(1)
  }
}));

const Image = styled('div')({
  position: 'relative',
  height: 'calc((50vh / 3) - 5px)',
  cursor: 'pointer',
  ':after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: 'rgba(0,0,0,0.6)',
    opacity: 0,
    transition: 'opacity 0.3s'
  }
});

export default SlideProject;
