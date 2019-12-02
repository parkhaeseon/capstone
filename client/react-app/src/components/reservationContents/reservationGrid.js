import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
 
  rowGrid:{
    height:'auto',
    minHeight:'10vh',
    width:'100%',
    // border: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(0),
    padding:theme.spacing(0),
  },

  detailGrid:{
    height:'auto',
    padding:theme.spacing(0),
    // border: `1px solid ${theme.palette.divider}`,    
  },

  paper: {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    textAlign: 'center',
    width:'auto',
    maxWidth:'20vh',
    fontSize:"18px",
    [theme.breakpoints.down('xs')]:{
      minHeight:'80px',
      minWidth:'102px',
      paddingBottom: theme.spacing(0),
    },
  },

  button: {
    margin:theme.spacing(1),
    width:'auto',
    minWidth:'13vh', 
    fontSize:"10px",
    [theme.breakpoints.down('xs')]:{
      fontSize:"1px",
      minwidth:"5vh",
    },
  },
}));

export default function ReservationGrid() {
  const classes = useStyles();

  return (
        <Grid container spacing={4}>
          
          <Grid  item xs={12}  className={classes.rowGrid} container spacing={2}>
            <Grid  item xs={6} className={classes.detailGrid}>
              <Paper  className={classes.paper}>Visual Studio
                <Button  variant="contained" color="primary" className={classes.button}>예약하기</Button>
              </Paper>
            </Grid>

            <Grid  item xs={6} className={classes.detailGrid}>
              <Paper   className={classes.paper} style={{ float:"right" }}>3D Printer
                <Button  variant="contained" color="primary" className={classes.button}>예약하기</Button>
              </Paper>
            </Grid>
          </Grid>

          <Grid  item xs={12}  className={classes.rowGrid} container spacing={2}>
            <Grid  item xs={6} className={classes.detailGrid}>
              <Paper className={classes.paper}>VR Room
                <Button  variant="contained" color="primary" className={classes.button}>예약하기</Button>
              </Paper>
            </Grid>

            <Grid  item xs={6} className={classes.detailGrid}>
              <Paper  className={classes.paper} style={{ float:"right" }}>WorkPlace
                <Button  variant="contained" color="primary" className={classes.button}>예약하기</Button>
              </Paper>
            </Grid>
          </Grid>

          <Grid  item xs={12} sm={6} className={classes.rowGrid} container spacing={2}>
            <Grid  item xs={6} sm={3} className={classes.detailGrid}>
              <Paper className={classes.paper}>Talk Room 3
                <Button  variant="contained" color="primary" className={classes.button}>예약하기</Button>
              </Paper>
            </Grid>
            <Grid  item xs={6} sm={3} className={classes.detailGrid}>
              
            </Grid>
          </Grid>

          <Grid  item xs={12}   className={classes.rowGrid} container spacing={2}>
            <Grid  item xs={6}  className={classes.detailGrid}>
              <Paper className={classes.paper}>Talk Room 2
                <Button  variant="contained" color="primary" className={classes.button}>예약하기</Button>
              </Paper>
            </Grid>

            <Grid  item xs={6} className={classes.detailGrid}style={{ float:"right" }}>
              <Paper  className={classes.paper} >Talk Room 1
                <Button  variant="contained" color="primary" className={classes.button}>예약하기</Button>
              </Paper>
            </Grid>
          </Grid>
          

          
          {/* <Grid  item xs={12}  className={classes.rowGrid} container spacing={2}>
            <Grid  item xs={6} className={classes.detailGrid}>
              <Paper className={classes.paper}>Talk Room 2
                <Button  variant="contained" color="primary" className={classes.button}>예약하기</Button>
              </Paper>
            </Grid>

            <Grid  item xs={6} className={classes.detailGrid}>
              <Paper  className={classes.paper} style={{ float:"right" }}>Talk Room 1
                <Button  variant="contained" color="primary" className={classes.button}>예약하기</Button>
              </Paper>
            </Grid>
          </Grid> */}

        </Grid>

  );
}