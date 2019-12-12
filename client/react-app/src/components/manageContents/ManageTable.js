import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Button,
  Dialog, DialogTitle, DialogContent, DialogContentText,DialogActions,
  FormControl, FormControlLabel, FormLabel, RadioGroup, Radio
} from '@material-ui/core';
import axios, {post} from 'axios'; // phs

const useStyles = makeStyles(theme => ({
  table: {
    // minWidth: 650,
    width: '95%',
    margin:'auto',
    marginBottom: theme.spacing(3),
    overflowX:'auto',
    overflowY:'auto',
  },

  cellTop:{
    borderBottom:'1px solid #dddddd',
    // width:'12.5%',
    padding:theme.spacing(1),
  },
  cell:{
      borderBottom:'1px solid #dddddd',
      // width:'13.5%',
  },
  cellBt:{
    borderBottom:'1px solid #dddddd',
    padding:theme.spacing(1,0,1,0),
    width:'3%',
  },

  cellUser:{
    // width:'20%',
    padding:theme.spacing(2.5,2,2.5,2),
  },
  cellUserTop:{
    borderBottom:'1px solid #dddddd',
    // width:'20%',
    padding:theme.spacing(2,0,2,0),
    // fontSize:'12px',
  },
  cellUserBt:{
    // border:'0px',
    padding:'0px',
    width:'11.5%',
  },
  cellUserBt2:{
    fontSize:5,
  },

  cellTopSum:{
    borderBottom:'1px solid #dddddd',
    width:'50%',
    padding:theme.spacing(1),
  },
  cellSum:{
      borderBottom:'1px solid #dddddd',
      width:'50%',
  },

  button1:{
      margin: theme.spacing(1,0,1,0),
      color:'#777777',
  },
  button2:{
      margin: theme.spacing(1),
      color:'#777777',
  },
  chkPenaltyReason:{
   color:'#5555cc',
   textDecoration:'underline',
   // cursor:'pointer',
 },
}));

var getpntid = '';
var getcontent = '';
var getrescode = '';

function getYearMon(type){
    var date = new Date();
    var year = date.getFullYear().toString();
    var mon = (date.getMonth()+1).toString();
    if(mon<10) mon="0"+mon;
  
    return "/"+type+"/"+year+"/"+mon;
  }

export default function ManageTable(props) {
  const classes = useStyles();

  var elements=[];
  var head = [];
  var Datedata = new Date();
  var Year = Datedata.getFullYear().toString();
  var Month = (Datedata.getMonth()+1).toString();
  var Day = Datedata.getDate().toString();
  if(Month<10) Month="0"+Month;
  if(Day<10) Day="0"+Day;

  const [openDialog, setOpenDialog] = React.useState(false);

    const DialogClickOpen = () => {
      setOpenDialog(true);
    };

    const DialogClose = () => {
      setOpenDialog(false);
    };

    const [openPrDialog, setOpenPrDialog] = React.useState(false);

    const PrDialogClickOpen = () => {
      setOpenPrDialog(true);
    };

    const PrDialogClose = () => {
      setOpenPrDialog(false);
    };

    const [value, setValue] = React.useState('노쇼');

    const RadioChange = event => {
      setValue(event.target.value);
    };



  if(props.page==='manage'){
    const getres = props.st.reservationmanage;
    
    head.push(
        <TableHead>
        <TableRow>
          <TableCell align="center" className={classes.cellTop}>날짜</TableCell>
          <TableCell align="center" className={classes.cellTop}>시간</TableCell>
          <TableCell align="center" className={classes.cellTop}>사용 룸</TableCell>
          <TableCell align="center" className={classes.cellTop}>인원수</TableCell>
          <TableCell align="center" className={classes.cellTop}>사유</TableCell>
          <TableCell align="center" className={classes.cellTop}>  </TableCell>
          <TableCell align="center" className={classes.cellTop}>  </TableCell>
        </TableRow> 
      </TableHead>
      );
  
      if(getres.length >= 1) {
        for(let i = 0; i<getres.length; i++) {
          elements.push(
            <TableRow >
              <TableCell align="center" className={classes.cell}>{getres[i].Date}</TableCell>
              <TableCell align="center" className={classes.cell}>{getres[i].Time}</TableCell>
              <TableCell align="center" className={classes.cell}>{getres[i].Room}</TableCell>
              <TableCell align="center" className={classes.cell}>{getres[i].Cnt}</TableCell>
              <TableCell align="center" className={classes.cell}>
                <Button className={classes.chkPenaltyReason} 
                onClick= {function(e) {
                  getcontent = getres[i].Reason;
                  PrDialogClickOpen();
                }}
                >확인</Button>
              </TableCell>
              <TableCell align="center" className={classes.cellBt}>
                  <Button variant="outlined"   className={classes.button2}>수정</Button>
              </TableCell>
              <TableCell align="center" className={classes.cellBt}>
                  <Button variant="outlined"  
                  onClick = {function(e) {
                    e.preventDefault();
                    setTimeout(function() {}, 500);
                    axios({
                      method:'post',
                      url:'http://100.26.66.172:5000/reservationmanage/delete',
                      data : {
                        reservationcode : getres[i].reservationcode
                      }
                    })
                    .then(function(res) {
                        if(res.data == "success") {
                          alert('예약을 취소하였습니다.');

                          axios({
                            method:'post',
                            url:'http://100.26.66.172:5000/reservationDo/manage',
                            data : {
                                classlevel : props.pst.history.location.state.classlevel,
                                id : props.pst.history.location.state.ID,
                                year : Year,
                                month : Month
                            }
                            })
                            .then(function(res2) {
                                if(res.statusText == "OK") {
                                    props.pst.history.location.state.reservationmanage = res2.data;
                                    props.pst.history.push({
                                    pathname : getYearMon('manage'),
                                    state : props.pst.history.location.state
                                    });
                                }
                                else {
                                    alert('ManageTable.js 204 line error');
                                }
                            })
                            .catch(function(error2) {
                                console.log(error2);
                            });
                        }
                        else {
                          alert('ManageTable.js 178 line error');
                        }                
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

                  }}
                  className={classes.button2}
                  >삭제</Button>
              </TableCell>
            </TableRow>
          );
        }
      }
  }

  else if(props.page ==='manageUser'){
    var pnt = props.st;
    head.push(
      <TableHead>
      <TableRow>
        <TableCell align="center" className={classes.cellUserTop}>분류</TableCell>
        <TableCell align="center" className={classes.cellUserTop}>ID</TableCell>
        <TableCell align="center" className={classes.cellUserTop}>이름</TableCell>
        <TableCell align="center" className={classes.cellUserTop}>제재 횟수</TableCell>
        <TableCell align="center" className={classes.cellUserTop}>제재 사유</TableCell>
        <TableCell align="center" className={classes.cellUserTop}>제재 시작 날짜</TableCell>
        <TableCell align="center" className={classes.cellUserTop}>제재 종료 날짜</TableCell>
        <TableCell align="center" className={classes.cellUserTop}>  </TableCell>
        <TableCell align="center" className={classes.cellUserTop}>  </TableCell>
      </TableRow>

    </TableHead>
    );

    if(pnt.length >= 1) {
        for(let i=0; i<pnt.length; i++) {
            elements.push(
                <TableRow ID = {pnt[i].ID}>
                  <TableCell align="center" className={classes.cellUser}>{pnt[i].Class}</TableCell>
                  <TableCell align="center" className={classes.cellUser}>{pnt[i].ID}</TableCell>
                  <TableCell align="center" className={classes.cellUser}>{pnt[i].Name}</TableCell>
                  <TableCell align="center" className={classes.cellUser}>{pnt[i].PenaltyCnt}</TableCell>
                  <TableCell align="center" className={classes.cellUser}>{pnt[i].PenaltyReason}</TableCell>
                  <TableCell align="center" className={classes.cellUser}>{pnt[i].rDs}</TableCell>
                  <TableCell align="center" className={classes.cellUser}>{pnt[i].rDe}</TableCell>
                  <TableCell align="center" className={classes.cellUserBt}>
                    <Button variant="outlined" className={classes.button1}
                    onClick = { function(e) {
                        getpntid = pnt[i].ID;
                        DialogClickOpen();
                    }}
                    //onClick={DialogClickOpen}
                    >
                        제재 부여</Button>
                  </TableCell>
                  <TableCell align="center" className={classes.cellUserBt}
                  onClick = { function(e) {
                    e.preventDefault();
                        axios({
                            method:'post',
                            url:'http://100.26.66.172:5000/penalty/cancel',
                            data : {
                              id : pnt[i].ID,
                              year : Year,
                              month : Month,
                              day : Day
                            }
                        })
                        .then(function(res) {
                            if(res.data == "success") {
                              alert('제재를 취소하였습니다.');


                              axios({
                                method:'post',
                                url:'http://100.26.66.172:5000/penalty/manage'
                              })
                              .then(function(res2) {
                                  if(res.statusText == "OK") {
                                    props.pst.history.location.state.penaltyMng = res2.data;
                                    props.pst.history.push({
                                      pathname : '/users',
                                      state : props.pst.history.location.state
                                    });
                                  }
                                  else {
                                    alert('현재 제재관리를 볼 수 없습니다.');
                                  }
                              })
                              .catch(function(error) {
                                  console.log(error);
                              });


                              //props.pst.history.push('/index', props.pst.history.location.state);
                            }
                            else if(res.data == "fail") {
                                alert('현재 제재 중이지 않습니다.');
                            }
                            else {
                              alert('ManageTable.js 205 error');
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                    }}
                  >
                    <Button

                    variant="outlined" className={classes.button1}>제재 취소</Button>
                  </TableCell>
                </TableRow>
            );
        }
    }
  }

  else if(props.page === 'sum'){
    var rsum = props.st;

    head.push(
      <TableHead>
      <TableRow>
        <TableCell align="center" className={classes.cellTopSum}>기업명</TableCell>
        <TableCell align="center" className={classes.cellTopSum}>월 누적 이용시간</TableCell>
      </TableRow>

    </TableHead>
    );

    if(rsum.length >= 1) {
        for(let i=0; i<rsum.length; i++) {
            elements.push(
                <TableRow >
            <TableCell align="center" className={classes.cellSum}>{rsum[i].name}</TableCell>
                  <TableCell align="center" className={classes.cellSum}>{rsum[i].usetime}</TableCell>
                </TableRow>
              );
        }
    }
  }

  return (
    <div>

      <Table className={classes.table}>
        {head}
        <TableBody className={classes.tbody}>{elements}</TableBody>
        {props.openable}
      </Table>

      <Dialog open={openDialog} onClose={DialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">제재부여</DialogTitle>
        <DialogContent>
          <DialogContentText>
            해당 사용자에게 부여할 제재 종류를 선택해주세요.
          </DialogContentText>
          <FormControl component="fieldset">

      <RadioGroup aria-label="position" name="position" value={value} onChange={RadioChange} row>
        <FormControlLabel
          value="노쇼"
          id = "noshow"
          control={<Radio color="primary" />}
          label="노쇼"
          labelPlacement="start"
        />
        <FormControlLabel
          value="기물파손"
          id = "destruction"
          control={<Radio color="primary" />}
          label="기물파손"
          labelPlacement="start"
        />
        <FormControlLabel
          value="기타"
          id = "etc"
          control={<Radio color="primary" />}
          label="기타"
          labelPlacement="start"
        />
      </RadioGroup>
    </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={DialogClose} color="primary">
            취소
          </Button>
          <Button //onClick={DialogClose}
          onClick = {function(e){
            e.preventDefault();
                axios({
                    method:'post',
                    url:'http://100.26.66.172:5000/penalty/grant',
                    data : {
                      penaltytype : value,
                      id : getpntid,
                      year : Year,
                      month : Month,
                      day : Day
                    }
                })
                .then(function(res) {
                    if(res.data == "success") {
                      alert('제재를 부여하였습니다.');
                      DialogClose();
                      axios({
                        method:'post',
                        url:'http://100.26.66.172:5000/penalty/manage'
                      })
                      .then(function(res2) {
                          if(res.statusText == "OK") {
                            props.pst.history.location.state.penaltyMng = res2.data;
                            props.pst.history.push({
                              pathname : '/users',
                              state : props.pst.history.location.state
                            });
                          }
                          else {
                            alert('현재 제재관리를 볼 수 없습니다.');
                          }
                      })
                      .catch(function(error) {
                          console.log(error);
                      });
                      //props.pst.history.push('/index', props.pst.history.location.state);
                    }
                    else if(res.data == "already") {
                        alert('이미 제재 중인 아이디입니다.');
                    }
                    else {
                        alert('ManageTable.js 400 line error');
                    }
                })
                .catch(function(error2) {
                    console.log(error2);
                });
          }}
          color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
     open={openPrDialog}
      onClose={PrDialogClose}
      fullWidth={true}
      maxWidth='xs'
      aria-labelledby="form-dialog-title">
       <DialogTitle id="form-dialog-title">제재 사유</DialogTitle>
       <DialogContent>
         <DialogContentText style={{paddingLeft:'1%'}}>
           {getcontent}
         </DialogContentText>
       </DialogContent>
       <DialogActions>
         <Button onClick={PrDialogClose} color="primary">
           확인
         </Button>
       </DialogActions>
     </Dialog>
    </div>
  );
}
