import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
    TextField,
}from '@material-ui/core';
import { makeStyles, } from '@material-ui/core/styles';
import InputTime from './InputTime';

const useStyles = makeStyles(theme => ({
    typo:{
        // width:'90%',
        // margin:'auto',
        padding : theme.spacing(0,0,1,0.5),
        borderBottom : '2px solid #cccccc',
    },
    typo2:{
      width:'80%',
      margin:'auto',
    },
    textFieldLeft: {
        marginLeft: '20%',
        marginRight: '20%',
        width: '60%',
        margin:'auto',
      },
    textFieldRight: {
        marginLeft: '10%',
        marginRight: '30%',
        width: '60%',
        margin:'auto',
    },
    textField2: {
        marginLeft: '9%',
        marginRight: '14%',
        width: "77%",
        // marginLeft:'auto',
    },
    gridField:{
        marginLeft: '9%',
        marginRight: '14%',
        width: "77%",
    },
    rootGrid:{
        // width:'95%',
        padding:theme.spacing(1),
        margin:'auto',
        // height:320,
    },
    rootGrid2:{
        // width:'95%',
        // padding:theme.spacing(1),
        margin:'auto',
    }
}));

export default function InputDetail(props) {
  const classes = useStyles();

  var element = [];
  if(props.level === 4) // phs 1관리자, 2기업, 3교수, 4학생
  element.push(
    <Grid container spacing={3} className={classes.rootGrid2} justify="center" alignItems="center">
    <Grid item xs={12} sm={6}>
          <TextField
            required
            id="s1" // id를 임의로 내가 s1으로 지정하였음. 근데 4명인 방도 있지 않나 - phs
            label="학번 1"
            className={classes.textFieldLeft}
            margin="dense"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="s2" // phs
            label="학번 2"
            className={classes.textFieldRight}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="s3" // phs
            label="학번 3"
            className={classes.textFieldLeft}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="s4" // phs
            label="학번 4"
            className={classes.textFieldRight}
          />
        </Grid>
      </Grid>
  );

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={clsx(classes.typo, props.openable&&classes.typo2)}>
        예약 정보
      </Typography>

      <Grid container spacing={3} className={classes.rootGrid} justify="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="s0" // phs
            label="대표자"
            className={classes.textFieldLeft}
          />
         </Grid>
         <Grid item xs={12} sm={6}/>

         {element}

        <Grid item xs={12}>
            <TextField
                required
                id="reason" // phs
                label="사유"
                // placeholder="Placeholder"
                multiline
                margin="normal"
                variant="outlined"
                className={classes.textField2}
            />
        </Grid>

        <Grid item xs={12}>
        {/*<div  id='1234'>*/}
          <InputTime
                  openable={props.openable}
                  room={props.room}
                  startTime={props.startTime}
                  level = {props.level}
                  id='12345'
                  className={classes.gridField}
                />
        {/*</div>*/}

        </Grid>

      </Grid>
    </React.Fragment>
  );
}
