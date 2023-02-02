import { AppBar, Container, createTheme, Toolbar, Typography} from '@mui/material'
import React from 'react'
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
const useStyles = makeStyles()((theme) => {
    return {
      title: {
       flex: 1,
       color: "aquamarine",
       fontFamily: "Roboto",
       fontWeight: "bold",
       cursor: "pointer"
      },
     
    };
  });
   
const Header = () => {

    const {classes} = useStyles() ;
    const navigate = useNavigate ();
    const darkTheme = createTheme({
        palette:{
            
            primary: {
                light: '#484848',
                main: '#212121',
                dark: '#000000',
                contrastText: '#fff',
              },
              secondary: {
                light: '#b0ff57',
                main: '#76ff03',
                dark: '#32cb00',
                contrastText: '#000',
              },
              
        }
    })
  return (
    <div>
        <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar>
                <Typography onClick={() => navigate('/') } className={classes.title} variant='h6'>
                    Cryptodate
                </Typography>
            </Toolbar>
        </Container>
      </AppBar>
      </ThemeProvider>
    </div>
  )
}

export default Header
