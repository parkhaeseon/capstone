import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Divider, List, ListItem, ListItemText, Toolbar, IconButton, Drawer, ListItemIcon, Grid, Button, Paper
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
//import MailIcon from '@material-ui/icons/Mail';
import {Link} from 'react-router-dom';
import ReeditText from './reservationContents/reeditText';
import TimeBts from './reservationContents/timeBts';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import HistoryIcon from '@material-ui/icons/History';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import axios, {post} from 'axios'; // phs
import HomeIcon from '@material-ui/icons/Home';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  reeditMargin: {
    margin: theme.spacing(1),
  },
  topGrid:{
    width:'50%',
    margin:'auto'
  },
  rootForm: {
    marginTop: theme.spacing(4),
  },
  button:{
    margin : theme.spacing(1),
  },
  btCase:{
    margin : 'auto',
    marginTop: theme.spacing(2),
    // width:'30%',
  },
  rootPaper: {
    width: '90%',
    marginTop: theme.spacing(8),
    margin:'auto',
    marginBottom: theme.spacing(4),
    overflowX: 'auto',
    paddingBottom: theme.spacing(2),
  },
}));

function getYearMon(type){
    var date = new Date();
  
    var year = date.getFullYear().toString();
    var mon = (date.getMonth()+1).toString();
    if(mon<10) mon="0"+mon;
  
    return "/"+type+"/"+year+"/"+mon;
}

function TempgetNowDate(date){
  var year = date.getFullYear().toString();
  var mon = (date.getMonth()+1).toString();
  var day = date.getDate().toString();
  if(mon<10) mon="0"+mon;
  if(day<10) day="0"+day;
  return year+mon+day;
}

function getNowDate(){
    var date = new Date();
  
    var year = date.getFullYear().toString();
    var mon = (date.getMonth()+1).toString();
    var day = date.getDate().toString();
    if(mon<10) mon="0"+mon;
    if(day<10) day="0"+day;
    return "/reservation/"+year+mon+day;
}

export default function ReservationDo(props) {
  const userlevel = props.history.location.state.classlevel; // phs
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const nowDate = new Date(); // phs
  let Datedata = new Date();
  let Year = Datedata.getFullYear().toString();
  let Month = (Datedata.getMonth()+1).toString();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color="default"
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            예약하기
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {/* userlevel에 따른 메뉴 생성 165 ~ 221번째 줄 수정- phs */}
            <List>  

                {
                    <ListItem button component={Link}
                    to={{
                        pathname : '/index',
                        state : props.history.location.state
                        }}>
                        <ListItemIcon> <HomeIcon /></ListItemIcon>
                        <ListItemText primary="홈"/>
                    </ListItem>
                }

{
                    <ListItem button component={Link}

                    onClick = {function(e) {
                        e.preventDefault();

                        axios({
                            method:'post',
                            url:'http://100.26.66.172:5000/reservationDo/restable',
                            data : {
                                ymd : TempgetNowDate(nowDate)
                            }
                            })
                            .then(function(res) {
                                if(res.statusText == "OK") {
                                    props.history.location.state.reservationNow = res.data.result;    
                                    props.history.location.state.roomsit = res.data.result2; 
                                    
                                    

                                    props.history.push({
                                     pathname : getNowDate(nowDate),
                                     state : props.history.location.state
                                });
                                }
                                else {
                                  alert('ReservationDo.js 239 line error');
                                }
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                    }}          
                        >
                        <ListItemIcon> <EventAvailableIcon /></ListItemIcon>
                        <ListItemText primary="예약하기"/>
                    </ListItem>
                }
            
                {
                    <ListItem button component={Link} 

                    onClick = {function(e) {
                        e.preventDefault();
                        axios({
                            method:'post',
                            url:'http://100.26.66.172:5000/reservationDo/manage',
                            data : {
                                classlevel : userlevel,
                                id : props.history.location.state.ID
                            }
                        })
                        .then(function(res) {
                            if(res.statusText == "OK") {
                                props.history.location.state.reservationmanage = res.data;
                                props.history.push({
                                  pathname : getYearMon('manage'),
                                  state : props.history.location.state                   
                                });                                
                            }
                            else {
                              alert('mainpage.js 266 error');
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                    }}

                    // to={{
                    //     pathname : getYearMon('manage'),
                    //     state : props.history.location.state 
                    //     }}
                        >
                        <ListItemIcon> <HistoryIcon /></ListItemIcon>
                        <ListItemText primary="예약관리"/>
                    </ListItem>
                }

                {
                    <ListItem button component={Link}
                    to={{
                        pathname : "/cards",
                        state : props.history.location.state
                        }}>
                        <ListItemIcon> <MeetingRoomIcon /></ListItemIcon>
                        <ListItemText primary="시설안내"/>
                    </ListItem>
                }

                {
                    userlevel === 1 ?
                    <ListItem button component={Link} 
                    onClick = {function(e) {
                      e.preventDefault();
                      axios({
                        method:'post',
                        url:'http://100.26.66.172:5000/company/sum',
                        data : {
                            year : Year,
                            month : Month
                        }
                      })
                      .then(function(res) {
                          if(res.statusText == "OK") {  
                            props.history.location.state.reservationsum = res.data;
                            props.history.push({
                              pathname : getYearMon('sum'),
                              state : props.history.location.state                   
                            });
                          }
                          else {
                            alert('현재 이용 내역 확인을 볼 수 없습니다.');
                          }
                      })
                      .catch(function(error) {
                          console.log(error);     
                      });
                    }}
                    
                    
                    // to={{
                    //     pathname : getYearMon('sum'),
                    //     state : props.history.location.state 
                    //     }}
                        
                        >
                        <ListItemIcon> <DesktopMacIcon /></ListItemIcon>
                        <ListItemText primary="이용내역 확인"/>
                    </ListItem> : ''
                }

                {
                    userlevel === 1 ?
                    <ListItem button component={Link} 
                    onClick = {function(e) {
                      e.preventDefault();
                      axios({
                        method:'post',
                        url:'http://100.26.66.172:5000/penalty/manage'
                      })
                      .then(function(res) {
                          if(res.statusText == "OK") {  
                            props.history.location.state.penaltyMng = res.data;
                            props.history.push({
                              pathname : '/users',
                              state : props.history.location.state                   
                            });
                          }
                          else {
                            alert('현재 제재관리를 볼 수 없습니다.');
                          }
                      })
                      .catch(function(error) {
                          console.log(error);     
                      });
                    }}

                    // to={{
                    //     pathname : "/users",
                    //     state : props.history.location.state 
                    //     }}

                    >
                        <ListItemIcon> <AccountCircleIcon /></ListItemIcon>
                        <ListItemText primary="제재 관리"/>
                    </ListItem> : ''
                }

                {
                    userlevel === 1 ?
                    <ListItem button component={Link}

                    onClick = {function(e) {
                      e.preventDefault();
                      axios({
                        method:'post',
                        url:'http://100.26.66.172:5000/room/list'
                      })
                      .then(function(res) {
                          if(res.statusText == "OK") {
                            props.history.location.state.roomlist = res.data;
                            props.history.push({
                              pathname : '/rooms',
                              state : props.history.location.state
                            });
                          }
                          else {
                            alert('현재 시설관리를 볼 수 없습니다.');
                          }
                      })
                      .catch(function(error) {
                          console.log(error);
                      });
                    }}

                    // to={{
                    //     pathname : "/rooms",
                    //     state : props.history.location.state
                    //     }}

                        >
                        <ListItemIcon> <MeetingRoomIcon /></ListItemIcon>
                        <ListItemText primary="시설 관리"/>
                    </ListItem> : ''
                }
            </List>        
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      <Paper className={classes.rootPaper}>
        <Typography variant="h4" style={{marginTop:'35px',}} align='center'>
            {props.match.params.room.replace(/_/gi,' ')}
            {/* match.params.~ 에서 props.match.params.~로 고쳤음 - phs */}
        </Typography>


        <form className={classes.rootForm} noValidate>
          <Grid container spacing={2} className={classes.topGrid}>
            <Grid xs={8}>
              <ReeditText/>
            </Grid>

            <Grid xs={4}>
              <TimeBts startTime={props.match.params.time}/>
              {/* match.params.~ 에서 props.match.params.~로 고쳤음 - phs */}
            </Grid>

            <div className={classes.btCase}>
            <Button variant="contained" color="primary" className={classes.button}>예약가기</Button>
            <Button variant="outlined" color="primary" className={classes.button}>돌아가기</Button>
          </div>
          </Grid>


        </form>

        </Paper>

      </main>
    </div>
  );
}
