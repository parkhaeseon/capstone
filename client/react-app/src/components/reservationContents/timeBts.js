import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import {  Grid, } from '@material-ui/core';
import MakeTimeBts from '../bts/makeTimeBt';

const useStyles = makeStyles(theme => ({
  root:{
    // margin : theme.spacing(5,0,3,0),
    width:'100%',
  },
  grid:{
    padding:theme.spacing(2),
    width:'100%',
    marginLeft:'auto',
    marginRight:'auto',
  },
  bts:{
    // width:'80%',
    // marginLeft:'10%',
    // marginRight:'10%',
  },
}));


export default function TimeBts(props) {
  const classes = useStyles();

  var isWaiting = props.isWait;
  console.log('timeBts.js 29 line isWaiting = ', isWaiting);
  
  var elements = [];
  var gridCount = 0;
  var i = parseInt(props.startTime);

  while(i<17){
      
    var str1=i+":00 ~ "+(parseInt(i)+1)+":00"; 
    if(i<10){
      str1="0"+str1;
    }
    var str2=(parseInt(i)+1)+":00 ~ "+(parseInt(i)+2)+":00"; 
    var str3=(parseInt(i)+2)+":00 ~ "+(parseInt(i)+3)+":00"; 

    if(isWaiting === 1) {
        elements.push(
            <Grid container xs={12} spacing={3}>
              <Grid item xs={4} >
                <MakeTimeBts
                className={classes.bts}
                key={i}
                id={i}
                id= {String("time" + String(i))}
                startTime={props.startTime}
                wording={str1}/>
              </Grid>
            </Grid>
          );
        break;
    }

    if(17-i>=3){
      elements.push(
        <Grid container xs={12} spacing={3} >
          <Grid item xs={4} >
            <MakeTimeBts
            className={classes.bts}
            key={i}
            id= {String("time" + String(i))}
            startTime={props.startTime}
            wording={str1}/>
          </Grid>
          <Grid item xs={4} >
            <MakeTimeBts
            className={classes.bts}
            key={i+1}
            id= {String("time" + String(i+1))}
            //id={i+1}
            startTime={props.startTime}
            wording={str2}/>
          </Grid>
          <Grid item xs={4} >
            <MakeTimeBts
            className={classes.bts}
            key={i+2}
            id= {String("time" + String(i+2))}
            //id={i+2}
            startTime={props.startTime}
            wording={str3}/>
          </Grid>
        </Grid>
      );
    }

    else if(17-i===2){
      elements.push(
        <Grid container xs={12} spacing={3}  >
          <Grid item xs={4} >
            <MakeTimeBts
            className={classes.bts}
            key={i}
            id= {String("time" + String(i))}
            startTime={props.startTime}
            wording={str1}/>
          </Grid>
          <Grid item xs={4} >
            <MakeTimeBts
            className={classes.bts}
            key={i+1}
            id= {String("time" + String(i+1))}
            //id={i+1}
            startTime={props.startTime}
            wording={str2}/>
          </Grid>
        </Grid>
      );
    }
    
    else if(17-i===1){
      elements.push(
        <Grid container xs={12} spacing={3}>
          <Grid item xs={4} >
            <MakeTimeBts
            className={classes.bts}
            key={i}
            id={i}
            id= {String("time" + String(i))}
            startTime={props.startTime}
            wording={str1}/>
          </Grid>
        </Grid>
      );
    }




    i+=3;
  }

  return (
    <div className={classes.root}>
      {/* <Grid container spacing={3} className={classes.grid}> */}
        {elements}
      {/* </Grid> */}
    </div>
  );
}
