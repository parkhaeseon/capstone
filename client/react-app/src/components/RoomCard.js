import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Divider, List, ListItem, ListItemText, Toolbar, IconButton, Drawer,
  ListItemIcon, Grid, Paper,Button, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import HistoryIcon from '@material-ui/icons/History';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import HomeIcon from '@material-ui/icons/Home';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import {Link} from 'react-router-dom';
import axios, {post} from 'axios'; // phs

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
    // backgroundColor:'#eeeeee'
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
    padding: theme.spacing(5,3,2,3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    overflow: 'hidden',
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  button:{
    margin : theme.spacing(1),
  },
  content2: {
      paddingTop:theme.spacing(6),
  },
  paper: {
    padding: theme.spacing(1,5,5,5),
    display: 'flex',
    flexDirection: 'column',
    marginLeft:drawerWidth,
    // height:500,
  },

  descPaper:{
    width:'80%',
    marginLeft:'auto',
    marginRight:'auto',
  },
  descPaper2:{
    width:'100%',
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:theme.spacing(4),
  },
  descPaper3:{
    width:'100%',
    marginLeft:'auto',
    marginRight:'auto',
    // marginBottom:theme.spacing(4),
  },
  img:{
    width:'90%',
    marginLeft:'5%',
    marginRight:'5%',
    height:'150px',
    marginTop:'-30px',
    borderRadius:'8px',
    marginBottom:theme.spacing(0.5),
  },
  img2:{
    width:'90%',
    marginLeft:'5%',
    marginRight:'5%',
    height:'150px',
    borderRadius:'8px',
  },
  contentPaper:{
    width:'90%',
    marginLeft:'auto',
    marginRight:'auto',
    // height:'200px',
    padding:theme.spacing(2),
  },
  typoTitle:{
    margin:theme.spacing(2,1,3,1),
  },
  typoTitle2:{
    margin:theme.spacing(6,1,4,1),
  },
  miniTypo:{
    margin:theme.spacing(0.5),
  },
  underGrid:{
    // marginTop:theme.spacing(2),
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

export default function RoomCard(props, {history, match}) {
  const userlevel = props.history.location.state.classlevel; // phs
// const userlevel = 4;

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
         <Typography variant="h6" noWrap>시설안내</Typography>

          {/* 로그아웃 구현 191 ~ 211 - phs */}
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
        {/* userlevel에 따른 메뉴 생성 205 ~ 261번째 줄 수정- phs */}
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
                                  alert('RoomCard.js 305 line error');
                                }
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                    }}


                    // to={{
                    //     pathname : getNowDate(nowDate),
                    //     state : props.history.location.state
                    //     }}

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
                                id : props.history.location.state.ID,
                                year : Year,
                                month : Month
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
                      //   pathname : "/users",
                      //   state : props.history.location.state
                      //   }}
                        >
                        <ListItemIcon> <AccountCircleIcon /></ListItemIcon>
                        <ListItemText primary="계정 관리"/>
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
        <div className={classes.content2}>
            <Paper className={classes.paper}>
            <Typography variant="h6" noWrap className={classes.typoTitle}>주요 시설</Typography>

            <Grid container   alignItems='center' justify='center'>

            <Grid item xs={6}>
                    <div className={classes.descPaper2}>
                        <Paper className={classes.contentPaper}>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <img src='images/Visual_Studio.jpg' className={classes.img2} alt='VR Room'/>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography gutterBottom variant="h6" component="h2">
                                  Visual Studio
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p" className={classes.miniTypo}>
                              각종 촬영장비들이 비치된 스튜디오<br/>
                              - 카메라&거치대, 촬영 조명기기 비치<br/>
                              - 대형모니터 비치<br/>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div className={classes.descPaper2}>
                        <Paper className={classes.contentPaper}>
                          <Grid container spacing={1}>

                            <Grid item xs={6}>
                              <Typography gutterBottom variant="h6" component="h2">
                                  Maker's Workshop
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p" className={classes.miniTypo}>
                              아두이노, 드론을 제작할 수 있는 공간<br/>
                              - 기기 제작 장비 비치<br/>
                              - 소형테이블 비치<br/>
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <img src='images/Makers_Workshop.jpg' className={classes.img2} alt='VR Room'/>
                            </Grid>
                          </Grid>
                        </Paper>
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div className={classes.descPaper3}>
                        <Paper className={classes.contentPaper}>
                          <Grid container spacing={1}>

                            <Grid item xs={6}>
                              <Typography gutterBottom variant="h6" component="h2">
                                  VR Room
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p" className={classes.miniTypo}>

                                  VR/AR 기기 장비를 사용할 수 있는 공간<br/>
                                  - VR기기 비치<br/>
                                  - 대형모니터, 스피커, 헤드셋 비치<br/>
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <img src='images/VR_Room.jpg' className={classes.img2} alt='VR Room'/>
                            </Grid>
                          </Grid>
                        </Paper>
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div className={classes.descPaper3}>
                        <Paper className={classes.contentPaper}>
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <img src='images/3D_Printer_Room.jpg' className={classes.img2} alt='VR Room'/>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography gutterBottom variant="h6" component="h2">
                                  3D Printer Room
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p" className={classes.miniTypo}>

                                  3D프린터를 사용할 수 있는 공간<br/>
                                  - 3D프린터 비치<br/>
                                  - 대형모니터, 소형테이블 비치<br/>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                    </div>
                </Grid>

            </Grid>


               <Typography variant="h6" noWrap className={classes.typoTitle2}>회의실</Typography>
                <Grid container spacing={3} >
                    <Grid item xs={4}>
                        <div className={classes.descPaper}>
                            <Paper className={classes.contentPaper}>
                                <img src='images/Talk_Room_1.jpg' className={classes.img} alt='Talk Room 1'/>
                                <Typography gutterBottom variant="h6" component="h2">
                                 Talk Room 1
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" className={classes.miniTypo}>
                                    자유롭게 회의할 수 있는 공간<br/>
                                     - 수용인원 : 3~4명<br/>
                                     - 콘센트 : 4개<br/>
                                     - USB포트, 대형 모니터 비치<br/>
                                </Typography>
                            </Paper>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={classes.descPaper}>
                            <Paper className={classes.contentPaper}>
                                <img src='images/Talk_Room_2.jpg' className={classes.img} alt='Talk Room 2'/>
                                <Typography gutterBottom variant="h6" component="h2">
                                 Talk Room 2
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" className={classes.miniTypo}>
                                    자유롭게 회의할 수 있는 공간<br/>
                                     - 수용인원 : 4~6명<br/>
                                     - 콘센트 : 6개<br/>
                                     - USB포트, 대형 모니터 비치<br/>
                                </Typography>
                            </Paper>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={classes.descPaper}>
                            <Paper className={classes.contentPaper}>
                                <img src='images/Talk_Room_3.jpg' className={classes.img} alt='Talk Room 3'/>
                                <Typography gutterBottom variant="h6" component="h2">
                                 Talk Room 3
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" className={classes.miniTypo}>
                                    자유롭게 회의할 수 있는 공간<br/>
                                     - 수용인원 : 4~6명<br/>
                                     - 콘센트 : 6개<br/>
                                     - USB포트, 대형 모니터 비치<br/>
                                </Typography>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>

            </Paper>

        </div>
      </main>
    </div>
  );
}
