import { Container, Typography} from '@mui/material'
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => {
    return {
      banner: {
        backgroundImage: "url(./banner2.jpg)"
      },
      bannerContent: {
        height: 200,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
      },
      tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      },
    };
  });
 
const Banner = () => {
const { classes } = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
        <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Roboto",
            }}
          >
            Cryptodate
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Roboto",
            }}
          >
            crypto currency market updates 
          </Typography>
        </div>
      </Container>
    </div>
  )
}

export default Banner
