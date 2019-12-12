import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
 FormControl, InputLabel, NativeSelect, InputBase
} from '@material-ui/core';
import axios, {post} from 'axios'; // phs


const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

const useStyles = makeStyles(theme => ({
  root:{
    marginTop:'80px',
    width:'100%',
  },
  formControl:{
    minWidth:100,
    margin:theme.spacing(2),
  },
}));

function yearOption(){
    var date = new Date();
    var year = date.getFullYear();
    var elements = [];
    for(let i=2019; i<=year; i++){
        elements.push(
            <option value={i} id = {i}>{i}</option>
        );
    }
    return elements;
}

function monthOption(){
    var elements = [];
    for(let i=1; i<=12; i++){
        elements.push(
            <option value={i} id = {i}>{i}</option>
        );
    }
    return elements;
}



export default function ManageSelect(props) {
  const userlevel = props.st.history.location.state.classlevel; // phs
  const classes = useStyles();
  var Year = props.year, Month = props.month;
  const [year, setYear] = React.useState(props.year);
  const yearChange = event => {
    setYear(event.target.value);
  };

  const [month, setMonth] = React.useState(props.month);
  const monthChange = event => {
    setMonth( event.target.value);
  };

  // month = props.month;
  return (
    <div className={classes.root}>
        <center>
          <form >
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="year-select">Year</InputLabel>
                <NativeSelect
                    value={year}
                    //onChange={yearChange}
                    onChange = {function(e) {
                        yearChange(e);
                        Year = e.target.value;

                        if(Month.length != 2 && Month < 10) {
                            Month = "0" + Month;
                        }
                        
                        if(props.isSum == 'sum') {

                        }
                        else {
                            axios({
                                method:'post',
                                url:'http://100.26.66.172:5000/reservationDo/manage',
                                data : {
                                    classlevel : userlevel,
                                    id : props.st.history.location.state.ID
                                }
                            })
                            .then(function(res) {
                                if(res.statusText == "OK") {
                                    props.st.history.location.state.reservationmanage = res.data;
    
                                    props.st.history.push({
                                      pathname : '/manage/' + Year + '/' + Month,
                                      state : props.st.history.location.state
                                    });
                                }
                                else {
                                  alert('mainpage.js 338 error');
                                }
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                        }
                    }}
                    input={<BootstrapInput name="year" id="year-select" />}
                >
                    {yearOption()}
                </NativeSelect>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="month-select">Month</InputLabel>
                <NativeSelect
                    value={month}
                    // onChange={monthChange}
                    onChange = {function(e) {
                        monthChange(e);
                        Month = e.target.value;

                        if(Month.length != 2 && Month < 10) {
                            Month = "0" + Month;
                        }

                        if(props.isSum == 'sum') {

                        }
                        else {
                            axios({
                                method:'post',
                                url:'http://100.26.66.172:5000/reservationDo/manage',
                                data : {
                                    classlevel : userlevel,
                                    id : props.st.history.location.state.ID,
                                    year : Year,
                                    month : Month
                                }
                            })
                            .then(function(res) {
                                if(res.statusText == "OK") {
                                    props.st.history.location.state.reservationmanage = res.data;
                                    props.st.history.push({
                                      pathname : '/manage/' + Year + '/' + Month,
                                      state : props.st.history.location.state,
                                      year : Year,
                                      month : Month
                                    });
                                }
                                else {
                                  alert('mainpage.js 338 error');
                                }
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                        }
                    }}
                    input={<BootstrapInput name="month" id="month-select" />}
                    >
                    {monthOption()}
                </NativeSelect>

            </FormControl>
          </form>
        </center>
    </div>
  );
}
