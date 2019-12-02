import React from 'react';
import clsx from 'clsx';
import {
  Typography, Grid
} from '@material-ui/core';
import TimeBts from '../reservationContents/timeBts';
import { makeStyles,  } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root:{
    // width:'100%',
    // margin:theme.spacing(1,0,1,0),
    // padding : theme.spacing(2),
    marginTop:theme.spacing(1),
    marginLeft: '11.5%',
    marginRight: '14%',
    width: "75%",
  },
  typo2:{
    width:'80%',
    margin:'auto',
  },
  rootGrid:{
    // width:'95%',
    // padding:theme.spacing(0,2,0,2),
    // margin:'auto',
    // height:320,
  }
}))

export default function InputTime(props) {
  const classes = useStyles();

  return (
    <React.Fragment >

      <div className={classes.root}>
      <Grid container spacing={3} className={classes.rootGrid}>
        <TimeBts level = {props.level} startTime={props.startTime} isWait = {props.isWait}/>
      </Grid>
      </div>
    </React.Fragment>
  );
}
