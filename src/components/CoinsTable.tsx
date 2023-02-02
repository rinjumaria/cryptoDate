import { ThemeProvider } from '@emotion/react';
import { createTheme,Container, Typography, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import Pagination from '@mui/material/Pagination';


  export function formatDate(date: string) {
    const formattedDate =new Date( Date.parse(date));
   return formattedDate.toDateString();
  }  
const Coinstable = () => {
    const [coins, setCoins] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState<any>(1);
    const useStyles = makeStyles()((theme) => {
        return{
        row: {
          backgroundColor: "#16171a", 
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#131111",
          },
          fontFamily: "Roboto",
          color:"#fff"
        },
        pagination: {
          "& .MuiPaginationItem-root": {
            color: "aquamarine",
          }
        },
        };
      });
    const navigate = useNavigate ();
    const {classes} = useStyles() ;
    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
        },
      });
    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get("/v3/markets/summaries");
        console.log(data);
    
        setCoins(data);
        setLoading(false);
      };
      useEffect(() => {
        fetchCoins();
      }, []);
     
      const handleSearch = () => {
        console.log("coins");
        console.log(coins);
        
        return coins.filter(
          (coin) =>
            search == "" || coin.symbol.toLowerCase().includes(search)
        );
      };
  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Roboto" }}
        >
          Cryptocurrency Prices
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%", color:"#fff" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
        {loading ? (
            <LinearProgress style={{ backgroundColor: "aquamarine" }} />
          ) : (
            <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: "#7fccb6" }}>
              <TableRow>
                {["Coin", "High", "low", "Volume", "Quote Volume", "Percentage Change", "Updated On"].map((head) => (
                  <TableCell
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Roboto",
                    }}
                    key={head}
                    align="left"
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
          {
            handleSearch() .slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) =>{ 
              const profit = row.percentChange > 0;
              return (
                <TableRow
                onClick={() => navigate(`/coins/${row.symbol}`,{
                   state: {symbol:row.symbol, high:row.high, low:row.low, volume:row.volume, quoteVolume:row.quoteVolume, percentChange: row.percentChange, updatedAt: row.updatedAt  } 
                })}
                className={classes.row}
                key={row.symbol}
              >
                    <TableCell
                        component="th"
                        scope="row"
                        style={{
                            display: "flex",
                            gap: 15,
                            
                        }}
                    >
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                        <span
                        style={{
                            textTransform: "uppercase",
                            fontSize: 22,
                            color: '#fff',
                        }}
                        >
                      {row.symbol}
                    </span>
                  </div>
                </TableCell>
                <TableCell  style={{
                            color: '#fff',
                        }}>
                  {parseFloat(row.high).toFixed(2)}
                </TableCell>
                <TableCell  style={{
                            color: '#fff',
                        }}>
                  {parseFloat(row.low).toFixed(2)}
                </TableCell>
                <TableCell  style={{
                            color: '#fff',
                        }}>
                  {parseFloat(row.volume).toFixed(2)}
                </TableCell>
                <TableCell  style={{
                            color: '#fff',
                        }}>
                  {parseFloat(row.quoteVolume).toFixed(2)}
                </TableCell>
                <TableCell
                  
                  style={{
                    color: profit ? "rgb(14, 203, 129)" : "red",
                    fontWeight: 500,
                  }}
                >
                  {profit && "+"}
                  {parseFloat(row.percentChange).toFixed(2)}%
                </TableCell>
                <TableCell style={{
                            color: '#fff',
                        }}>
                  {formatDate(row.updatedAt)}
                </TableCell>
                
              </TableRow>
            )})
          }
                        
            </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={parseInt((handleSearch()?.length / 10).toFixed(0))}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
        </Container>
    </ThemeProvider>
  )
}

export default Coinstable
