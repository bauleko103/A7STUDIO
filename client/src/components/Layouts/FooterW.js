import { Link } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { Typography } from "@mui/material";
import footerApi from '../../api/footerApi';
import PropTypes from "prop-types";
 
function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          p: 1,
          m: 1,
          borderRadius: 0,
          textAlign: "center",
          fontSize: "1rem",
          fontWeight: "700",
          ...sx
        }}
        {...other}
      />
    );
  }
  
  Item.propTypes = {
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
      ),
      PropTypes.func,
      PropTypes.object
    ])
  };
  
const BootstrapButton = styled(Button)({
    boxShadow: "none",
    boxSizing: "small",
    textTransform: "none",
    fontSize: '12px',
    fontWeight: 300,
    color: "#333333",
    lineHeight: 0,
    padding: 0,
    backgroundColor: "#ffff",
     
    "&:hover": {
        backgroundColor: "#fff",
        color: "#999999",
        boxShadow: "none"
    },
    "&:active": {
        boxShadow: "none",
        backgroundColor: "#fff",
        borderColor: "#fff"
    },
});

 



const itemFoot = {
    // magrinRight: "1.5vh",
    // marginLeft: "1.5vh",
    boxShadow: "none",
    boxSizing: "small",
    textTransform: "none",
    fontSize: '12px',
    fontWeight: 300,
    color: "#333333",
    lineHeight: 0,
    padding: 0,
    backgroundColor: "#ffff",
     
    "&:hover": {
        backgroundColor: "#fff",
        color: "#999999",
        boxShadow: "none"
    },
    "&:active": {
        boxShadow: "none",
        backgroundColor: "#fff",
        borderColor: "#fff"
    },
    textDecoration: "none",
}

const LogoItem = {
    textDecoration: "none",
}

export const FooterW = () => {
    const [footer, setFooter] = React.useState(null);

    React.useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await footerApi.allFooter();
                setFooter(response);

            } catch (error) {
                console.log('Failed to fetch banners: ', error)
            }
        }
        fetchBanners();
    }, [])

    return (
        
        <>
            {footer && (
                <div style={{ width: "100%", height:"10vh", marginTop:"1.5vh" }}>
                    <Link to="/" style={LogoItem}  >
                        <Typography sx={{
                            fontSize: "16px",
                            fontWeight:500,
                            color: "#333333",
                            
                            
                            display: "flex",
                            justifyContent: "center",
                            p: 0,
                            
                            
                        }}>
                            A7 STUDIO
                        </Typography>
                    </Link>
                   
                    <Box className=" "
                        sx={{
                        display: "flex",
                        justifyContent: "center",
                        p: 0,
                        m: 1,
                        fontSize: "12px",
                        }}
                    >
                        <Item style={itemFoot}>
                            <a className='footer-button' href={footer[0]?.connect[0]?.link}>
                                    <BootstrapButton>
                                        {footer[0]?.connect[0]?.title || 'Chưa có'}
                                    </BootstrapButton>
                            </a>
                        </Item>
                        <Item style={itemFoot}>|</Item>
                        <Item style={itemFoot}>
                            <a className='footer-button' href={footer[0]?.connect[1]?.link}>
                                    <BootstrapButton >
                                        {footer[0]?.connect[1]?.title || 'Chưa có'}
                                    </BootstrapButton>
                            </a>
                        </Item>
                        <Item style={itemFoot}>|</Item>
                        <Item style={itemFoot}>
                            <a className='footer-button' href={footer[0]?.connect[2]?.link}>
                                    <BootstrapButton>
                                        {footer[0]?.connect[2]?.title || 'Chưa có'}
                                    </BootstrapButton>
                            </a>
                        </Item>
                    </Box>
                    <Box className=" "
                        sx={{
                        display: "flex",
                        justifyContent: "center",
                        p: 0,
                        m: 1,
                        fontSize: "12px",
                        }}
                    >
                        <Item style={itemFoot}>
                            <a className='footer-button' href={footer[0]?.connect[0]?.link}>
                                    <BootstrapButton>
                                        {footer[0]?.contact[0]?.title || 'Chưa có'}
                                    </BootstrapButton>
                            </a>
                        </Item>
                        <Item style={itemFoot}> </Item>
                        <Item style={itemFoot}>
                            <a className='footer-button' href={footer[0]?.connect[1]?.link}>
                                    <BootstrapButton>
                                        {footer[0]?.contact[1]?.title || 'Chưa có'}
                                    </BootstrapButton>
                            </a>
                        </Item>
                        <Item style={itemFoot}> </Item>
                        <Item style={itemFoot}>
                            <a className='footer-button' href={footer[0]?.connect[2]?.link}>
                                    <BootstrapButton>
                                        {footer[0]?.contact[2]?.title || 'Chưa có'}
                                    </BootstrapButton>
                            </a>
                        </Item>
                    </Box>
                </div>
            )}
            {!footer && ('')}
        </>

    )
};

