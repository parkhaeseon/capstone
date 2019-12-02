import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Divider, List, ListItem, ListItemText, Toolbar, IconButton, Drawer, ListItemIcon, Paper, Stepper, Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import HistoryIcon from '@material-ui/icons/History';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import HomeIcon from '@material-ui/icons/Home';
import InputDetail from './reservationStep/InputDetail';
import InputTime from './reservationStep/InputTime';
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
    backgroundColor: '#557bff',
    margin: theme.spacing(6,0,2,0),
    fontSize:15,
  },
  paper: {
    width: '70%',
    margin:'auto',
    marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
    // marginBottom: theme.spacing(6),
      padding: theme.spacing(4,2,2,2),
    },
  },

  layout: {
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 630,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  stepper:{
    width:0,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  buttons2:{
    marginRight:theme.spacing(3),
  },

  completeTypo1:{
    marginBottom:theme.spacing(3),
    padding : theme.spacing(0,0,1,0.5),
    borderBottom : '2px solid #cccccc',
  },
  completeTypo2:{
    marginBottom:theme.spacing(5),
    paddingLeft:theme.spacing(1),
  },
  rootGrid:{
      // width:'95%',
      padding:theme.spacing(1),
      margin:'auto',
      height:430,
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

const steps = [0];

function getStepContent(step, openable, room, startTime, userlevel) {
    switch (step) {
      case 0:
        return <InputDetail openable={openable} level={userlevel}/>;
      case 1:
        return <InputTime
        openable={openable}
        room={room.replace(/_/gi,' ')}
        startTime={startTime}
        level = {userlevel}
        />;
      default:
        throw new Error('Unknown step');
    }
  }

export default function ReservationDo(props) {

  console.log('ReservationStep.js 191 line props.history.location.state =', props.history.location.state);
  
  const isWaiting = props.history.location.state.waiting;
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

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if(activeStep<2) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
        {/* userlevel에 따른 메뉴 생성 243 ~ 299번째 줄 수정- phs */}
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
                                  alert('ReservationStep.js 312 line error');
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
        })}>
        <Paper className={classes.paper} id='123'>
            <div className={classes.layout}>

            {/* <Stepper activeStep={activeStep} className={classes.stepper}/> */}
            <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment >
              <div className={classes.rootGrid}>
                  <Typography variant="h5" gutterBottom className={classes.completeTypo1}>
                    예약 완료
                  </Typography>
                  <Typography variant="subtitle1" className={classes.completeTypo2}>
                    예약이 완료 되었습니다.
                  </Typography>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment className={classes.fixedHeightFrag}>

                <form onSubmit = {function(e){
                  e.preventDefault();

                  const timestart = [];
                  const timeend = [];
                  const rescodearr = [];

                  // 20191120 길이 : 8
                  var getDate = props.match.params.date;
                  var year = getDate.substring(0,4);
                  var month = getDate.substring(4,6);
                  var day = getDate.substring(6, getDate.length);
                  var toServerDate = year + '-' + month + '-' + day; // 형태 : 2019-11-20
                  var timechoice = false; // 시간 선택 여부

                  var roomname = props.match.params.room; // 방이름
                  var roomnumber = 0; // 방번호

                  // 방이름에 맞게 방번호 부여
                  if(roomname === "Talk_Room_1") roomnumber = 1;
                  else if(roomname === "Talk_Room_2") roomnumber = 2;
                  else if(roomname === "Talk_Room_3") roomnumber = 3;
                  else if(roomname === "3D_Printer_Room") roomnumber = 4;
                  else if(roomname === "VR_Room") roomnumber = 5;
                  else if(roomname === "Visual_Studio") roomnumber = 6;
                  else if(roomname === "Work_Place") roomnumber = 7;
                  else roomnumber = -1;

                  if(roomnumber == -1) {
                    alert('잘못된 방입니다.');
                    return;
                  }

                  if(userlevel == 4 && roomnumber >= 4) {
                    alert('학생은 Talk 룸만 예약할 수 있습니다.');
                    return;
                  }

                  // 9시 ~ 16시 = i
                  for(var i=9; i<=16; i++)
                  {
                    var timeid = "time" + String(i);
                    var isExist = document.getElementById(timeid);
                    if(isExist !== null && isExist.getAttribute('aria-pressed') == 'true') {
                      if(userlevel === 4) {
                        if(i <= 12 || i >= 16) {
                          alert('학생은 오후 1시 ~ 오후 4시까지만 이용가능합니다. 다시 선택해주세요.');
                          return;
                        }
                      }

                      // st : 시작 시간, 예시 = 13:00:00
                      // et : 끝 시간
                      var st = "", et = "";
                      if(i == 9) st = "09";
                      else st = String(i);
                      var rescode = year+month+day+st+"00"+roomnumber;
                      rescodearr.push(rescode);
                      et = String(i + 1);
                      st += ":00:00";
                      et += ":00:00";
                      timestart.push(toServerDate + " " + st);
                      timeend.push(toServerDate + " " + et);
                      timechoice = true;
                    }
                  }

                  if(timechoice == false) {
                    alert('시간을 선택해주세요.');
                    return;
                  }

                  if(e.target.s0.value !== props.history.location.state.name) {
                    alert('로그인한 사용자의 이름과 대표자의 이름이 다릅니다.');
                    return;
                  }

                  var jsonData = {
                    present : e.target.s0.value,
                    presentid : props.history.location.state.ID,
                    reason : e.target.reason.value,
                    classlevel : userlevel,
                    datestart : timestart,
                    dateend : timeend,
                    roomnumber : roomnumber,
                    reservationcode : rescodearr
                  };

                  // 학생이면
                  if(userlevel === 4) {
                    if(props.history.location.state.ID === e.target.s1.value ||
                      props.history.location.state.ID === e.target.s2.value ||
                      props.history.location.state.ID === e.target.s3.value ||
                      props.history.location.state.ID === e.target.s4.value)
                      {
                        alert('대표자와 중복된 학번이 있습니다.');
                        return;
                      }

                    jsonData['s1'] = e.target.s1.value;
                    jsonData['s2'] = e.target.s2.value;
                    jsonData['s3'] = e.target.s3.value;
                    jsonData['s4'] = e.target.s4.value;
                  }

                  // 예약 대기라면
                  if(isWaiting == 1) {
                    axios({
                        method:'post',
                        url:'http://100.26.66.172:5000/reservationDo/wait',
                        data : jsonData
                      })
                      .then(function(res) {
                        if(res.data == "success") {
                            alert('예약 대기가 완료되었습니다.');
                            props.history.push('/index', props.history.location.state);
                          }
                        else if(res.data == "Error") {
                            alert('에러 발생');
                        }
                        else if(res.data == "countError") {
                            alert('입력한 학번들을 확인하세요.(인원 수 확인)');
                        }
                        else if(res.data == "already") {
                            alert('이미 해당 시간대에 예약된 사람이 있습니다.');
                        }
                        else if(res.data == "reservationpenalty") {
                            alert('1명 이상이 제재 중이므로, 예약이 불가능합니다.');
                        }
                        else if(res.data == "alreadywait") {
                            alert('1명 이상이 이미 예약 대기 중이므로, 대기가 불가능합니다.');
                        }
                        else {
                            alert('알 수 없는 에러 발생 : ReservationStep.js 약 650 line');
                        }
                      })
                      .catch(function(error) {
                          console.log(error);
                      });
                  }
                  else { // 예약 대기가 아니라면
                    axios({
                        method:'post',
                        url:'http://100.26.66.172:5000/reservationDo',
                        data : jsonData
                      })
                      .then(function(res) {
                          if(res.data == "success") {
                                alert('예약이 완료되었습니다.');
                                props.history.push('/index', props.history.location.state);
                              }
                          else if(res.data == "Error") {
                              alert('에러 발생');
                          }
                          else if(res.data == "countError") {
                            alert('입력한 학번들을 확인하세요.(인원 수 확인)');
                          }
                          else if(res.data == "already") {
                            alert('이미 해당 시간대에 예약된 사람이 있습니다.');
                          }
                          else if(res.data == "reservationpenalty") {
                            alert('1명 이상이 제재 중이므로, 예약이 불가능합니다.');
                          }
                          else {
                              alert('알 수 없는 에러 발생 : ReservationStep.js 약 650 line');
                          }
                      })
                      .catch(function(error) {
                          console.log(error);
                      });
                  }
                }}>
                {/* {getStepContent(activeStep, open, props.match.params.room, props.match.params.time, userlevel)} */}
                <InputDetail openable={open} level={userlevel}/>
                <InputTime
                  openable={open}
                  room={props.match.params.room.replace(/_/gi,' ')}
                  startTime={props.match.params.time}
                  level = {userlevel}
                  isWait = {isWaiting}
                />
                <div className={clsx(classes.buttons, {
                  [classes.buttons2] : open,
                  })}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    type = "submit"
                    className={classes.button}
                  >
                    예약하기
                  </Button>
                </div>
                </form>
              </React.Fragment>
            )}
            </React.Fragment>
            </div>
        </Paper>
      </main>
    </div>
  );
}
