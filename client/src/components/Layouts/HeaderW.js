import { Link } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import logo from './logo.svg';
import { Button } from '@mui/material';
import menusApi from '../../api/menusApi';
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
export const HeaderW = () => {
    return (
        <div>
            <AutoGrid />
        </div>
    )
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

 

const itemHead = {
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

 
const LogoItem ={
    textDecoration: "none",
    paddingBottom:"2vh",
    paddingTop:"0.5vh",
    marginBottom:"1vh",
}
export default function AutoGrid() {
    const [menu, setMenu] = React.useState(null);

    React.useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await menusApi.allMenu();
                setMenu(response);
            } catch (error) {
                console.log('Failed to fetch menu: ', error)
            }
        }
        fetchMenu();
    }, [])

    return (
        <>
            {menu && (
               
                <div className="App-header">
                    <Link to="/" style={LogoItem}>
                        <img src={logo} className="App-logo" alt="logo" />
                    </Link>
                    <Box className=" "
                        sx={{
                        display: "flex",
                        justifyContent: "center",
                        p: 0,
                        marginTop:"-2.5vh",
                        marginBottom:"0.5vh",
                        fontSize: "12px",
                        }}
                    >
                        <Item style={itemHead}>
                            <Link to="/projects" style={{textDecoration: "none",}}>
                                        <BootstrapButton>
                                            {menu[0]?.title || 'Chưa có'}
                                        </BootstrapButton>
                            </Link>
                            
                        </Item>
                        <Item style={itemHead}>|</Item>
                        <Item style={itemHead}>
                            
                            <Link to="/news" style={{textDecoration: "none",}}>
                                        <BootstrapButton  >
                                            {menu[1]?.title || 'Chưa có'}
                                        </BootstrapButton>
                            </Link>
                        </Item>
                        <Item style={itemHead}>|</Item>
                        <Item style={itemHead}>
                            <Link to="/about" style={{textDecoration: "none",}}>
                                        <BootstrapButton>
                                            {menu[2]?.title || 'Chưa có'}
                                        </BootstrapButton>
                            </Link>    
                        </Item>
                    </Box>
                
                
                </div>
                
            )}
            {!menu && ('')}
        </>

    );
}


