import React from 'react';
import { Typography } from '@material-ui/core';
import Title from '../mainPage/Title';
import { makeStyles,} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root:{
        padding: theme.spacing(3, 2),
        height: 130,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },

}));

export default function TodayContent() {
    const classes = useStyles();
    return (
     
        <React.Fragment >
            <Title>Today</Title>
            <div className={classes.root}>
                <Typography variant="h4" align='center' className={classes.title}>오늘은 예약 내역이 없습니다.</Typography>
            </div>
        </React.Fragment>
     
    );
  }