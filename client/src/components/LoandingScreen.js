import { styled } from '@mui/material/styles';

// components
import Logo from '../components/Logo';

const LoadingScreen = () => {
    return (
        <RootStyle>
            <Animation>
                <Logo sx={{ width: '70px' }} />
            </Animation>
        </RootStyle>
    );
};

const RootStyle = styled('div')({
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const Animation = styled('div')({
    animation: 'spin-3d 3s infinite ease-in-out',
    '@keyframes spin-3d': {
        '0%': { transform: 'rotateY(0)' },
        '100%': { transform: 'rotateY(360deg)' }
    }
});

export default LoadingScreen;
