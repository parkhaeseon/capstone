import React from 'react';
import {  Grid } from '@material-ui/core';
import Title from '../mainPage/Title';
import { makeStyles,} from '@material-ui/core/styles';
// import PersonImg from '../../../public/images/unknownPerson.png'

const useStyles = makeStyles(theme => ({
    root:{
        padding: theme.spacing(1, 2, 1, 2),
        height: 130,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    title:{
      marginBottom:0,
    },
    imgCover:{
      // padding:theme.spacing(1,0,1,0),
      // border: '4px double #cccccc',
      maxWidth:'100%',
      height:110,
      margin:'auto',
    },
    img:{
      maxWidth:'100%',
      maxHeight:'100%',
      margin:'auto',
      display:'block',
    },
    textGrid:{
      margin:'auto',
      fontWeight:'bold',
      color:'#555555'
    },
}));

function classmylevel(level)
{
    var info = "등급 : ";
    if(level === 1) info += "관리자";
    else if(level === 2) info += "기업";
    else if(level === 3) info += "교수";
    else if(level === 4) info += "학생";
    return info;
}


export default function MyInfo(props) {

    const classes = useStyles();
    return (

        <React.Fragment >
            <Title className={classes.title}>Profile</Title>
            <div className={classes.root}>
              <Grid container spacing={2} className={classes.rootGrid}>
                <Grid item xs={5}>
                  <div className={classes.imgCover}><img alt="" src="images/user.png" className={classes.img}/></div>
                </Grid>
                <Grid item xs={7}>
                  <Grid container direction='column' spacing={2} justify='flex-end' className={classes.textGrid}>
                    <Grid item>이름 : {props.st.name}</Grid>
                    <Grid item>번호 : {props.st.ID}</Grid>
                    <Grid item>{classmylevel(props.st.classlevel)}</Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
        </React.Fragment>

    );
  }
