import * as React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export default function AboutUs({ about }) {

    return (
        <>
            <Box sx={{ height: { xs: '34vh', sm: '30vh' } }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 2,
                        padding: 0,
                    }}
                >
                    <Typography className="section-title"
                        sx={{
                            marginRight: '16px',
                            fontSize: '18px'
                        }}
                    >
                        About Us
                    </Typography>

                </Box>
                <div className="scrollbar scrollbar-about-us" id="style-4">
                    <div className="force-overflow">
                        <Typography variant='p' sx={{ fontSize: '12px' }}>
                            <div className='text-description' dangerouslySetInnerHTML={{ __html: `${about}` }}></div>
                        </Typography>
                    </div>
                </div>


            </Box>

        </>
    );
}


