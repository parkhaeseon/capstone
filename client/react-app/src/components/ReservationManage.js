import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Divider, List, ListItem, ListItemText, Toolbar, IconButton, Drawer, ListItemIcon, Paper, Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import HistoryIcon from '@material-ui/icons/History';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from 'react-router-dom';
import ManageSelect from './manageContents/ManageSelect';
import ManageTable from './manageContents/ManageTable';
import axios, {post} from 'axios'; // phs

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
    // padding: theme.spacing(3),
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
  rootPaper: {
    width: '80%',
    marginTop: theme.spacing(2),
    overflow: 'auto',
    margin:'auto',
    height:400,
    // marginBottom: theme.spacing(4),
    paddingTop:theme.spacing(2),
  },
  logout:{
    position:'absolute',
    right:theme.spacing(4),
  },
}));

function getNowDate(){
  var date = new Date();
  var year = date.getFullYear().toString();
  var mon = (date.getMonth()+1).toString();
  var day = date.getDate().toString();
  if(mon<10) mon="0"+mon;
  if(day<10) day="0"+day;
  return "/reservation/"+year+mon+day;
}

function TempgetNowDate(date){
    var year = date.getFullYear().toString();
    var mon = (date.getMonth()+1).toString();
    var day = date.getDate().toString();
    if(mon<10) mon="0"+mon;
    if(day<10) day="0"+day;
    return year+mon+day;
  }

function getYearMon(type){
  var date = new Date();

  var year = date.getFullYear().toString();
  var mon = (date.getMonth()+1).toString();
  if(mon<10) mon="0"+mon;

  return "/"+type+"/"+year+"/"+mon;
}

export default function ReservationManage(props) {
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
            예약관리
          </Typography>
          {/* 로그아웃 구현 - phs */}
          <Button variant='outlined' className={classes.logout}
            onClick = {function(e) {
                e.preventDefault();
                axios({
                    method:'post',
                    url:'http://100.26.66.172:5000/signin/out'
                })
                .then(function(res) {
                    if(res.data == "success") {
                        const { history } = props;
                        props.history.push('/');
                        }
                    else {
                        alert('Logout Fail');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            }}
            >로그아웃</Button>
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
        {/* userlevel에 따른 메뉴 생성 173 ~ 228번째 줄 수정- phs */}
            <List>
                {
                    <ListItem button component={Link}

                    onClick = {function(e) {
                        e.preventDefault();
                        axios({
                            method:'post',
                            url:'http://100.26.66.172:5000/gomain',
                            data: {
                                classlevel : userlevel,
                                id : props.history.location.state.ID,
                            }
                        })
                        .then(function(res2) {
                            props.history.location.state.rec = res2.data.rec;
                            props.history.push('/index', props.history.location.state);
                        })
                        .catch(function(error2) {
                            console.log(error2);
                        });
                    }}

                    // to={{
                    //     pathname : '/index',
                    //     state : props.history.location.state
                    //     }}
                        
                        >
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
                                  alert('ReservationManage.js 243 line error');
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




                    to={{
                        pathname : getYearMon('manage'),
                        state : props.history.location.state
                        }}

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
      <ManageSelect 
        st = {props}
        year={props.match.params.year} 
        month={props.match.params.month}
      />
        {/* match.params.~ 에서 props.match.params.~로 고쳤음 - phs */}
      <div >
        <Paper className={classes.rootPaper}>
            <ManageTable 
            pst = {props}
            st = {props.history.location.state} page='manage'/>
        </Paper>
      </div>

      </main>
    </div>
  );
}
