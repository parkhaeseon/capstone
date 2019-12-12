import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import 'date-fns';
import { fchmod } from 'fs';


const useStyles = makeStyles(theme => ({
  table: {
    // minWidth: 650,
    width: '95%',
    margin:'auto',
    marginBottom: theme.spacing(3),
  },
  cell:{
    width:'12%',
  },
  cellTop:{
    //   border:'0px',
      width:'12.5%',
  },

  timePick:{
    float:"right",
    maxWidth:"25vh",
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
}));

var nowres;
var userlevel;
var roomsit;

function BackGroundColor(level, rl){
    if(roomsit[rl - 1].sit == 0) {
        return "#4c4c4c";
    }

    if(level == -1) return "";

    var ret = "#ffffff"; // 하얀

    if(level == 1) {
        ret = "#ff4da6"; // 핑크
    }
    else if(level == 2) {
        ret = "#ff4d50"; // 빨강
    }
    else if(level == 3) {
        ret = "#ff784e"; // 주황
    }
    else if(level == 4) {
        ret = "#ffdc4d"; // 노랑
    }

    return ret;
}

function chkclick(rn, ti) {
    if(userlevel == 1) return true;
    for(let i = 0; i<nowres.length; i++) {
        if((nowres[i].Time).toString() == (ti).toString() && (nowres[i].Room).toString() == (rn).toString()) {
            if(userlevel > nowres[i].classlevel) {
                return true;
            }
        }
    }
    return false;
}

export default function ReservationTable(props) {
  const classes = useStyles();
  const elements =[];
  const arrayList=[];
  const timeList = [];

  var timeliststring = [];

  nowres = props.st.reservationNow;
  userlevel = props.st.classlevel;
  roomsit = props.st.roomsit;

  for(let i=9; i<17; i++){ // 8개
    var t = '';
    if(i<10){
       arrayList.push("0"+i+":00\n ~ \n"+(i+1)+":00");
       t = '0' + i;
    }
    else {
      arrayList.push(i+":00 ~ "+(i+1)+":00");
      t = i;
    }
    timeList.push(i);
    timeliststring.push(t);
  }

  var idx = 0;

  // phs
  for(let i=0; i<arrayList.length; i++){
    elements.push(
      <TableRow key={arrayList[i]}  style={{width:'12.5%'}}>
        <TableCell component="th" scope="row" align="center" className={classes.cell}>{arrayList[i]}</TableCell>
            {
                idx < nowres.length &&
                (nowres[idx].Time).toString() == (timeliststring[i]).toString() &&
                nowres[idx].Room == 1 ?

                <TableCell align="center" id={props.make} component={Link}
                onClick = {function(e) {
                    e.preventDefault();
                    if(roomsit[0].sit == 0) {
                        alert('방을 이용할 수 없습니다.');
                        e.preventDefault();
                    }
                    else {
                        if(chkclick(2, i)) {
                            props.st.waiting = 0;
                            props.rst.history.push({
                                pathname : "/do/"+props.con+"/"+timeList[i]+"/Talk_Room_1",
                                state : props.st
                            });
                        }
                        else {
                            alert('예약 대기만 가능합니다.');
                            props.st.waiting = 1;
                            props.rst.history.push({
                                pathname : "/do/"+props.con+"/"+timeList[i]+"/Talk_Room_1",
                                state : props.st
                            });
                        }

                        // if(chkclick(2, i)) {
                        //     props.rst.history.push({
                        //         pathname : "/do/"+props.con+"/"+timeList[i]+"/Talk_Room_1",
                        //         state : props.st
                        //     });
                        // }
                        // else {
                        //     alert('우선순위에 밀려 예약이 불가능합니다.');
                        // }
                    }
                }}
                style={{backgroundColor: BackGroundColor(nowres[idx++].classlevel, 1), opacity: 0.9}}
                ></TableCell>

                :

                <TableCell align="center" id={props.make} component={Link} className={classes.cell}
                onClick = {function(e) {
                    e.preventDefault();
                    if(roomsit[0].sit == 0) {
                        alert('방을 이용할 수 없습니다.');
                        e.preventDefault();
                    }
                    else {
                        props.rst.history.push({
                            pathname : "/do/"+props.con+"/"+timeList[i]+"/Talk_Room_1",
                            state : props.st
                        });
                    }
                }}
                style={{backgroundColor: BackGroundColor(-1, 1), opacity: 0.7}}
                ></TableCell>
            }


            {
                idx < nowres.length &&
                (nowres[idx].Time).toString() == (timeliststring[i]).toString() &&
                nowres[idx].Room == 2 ?
                <TableCell align="center" id={props.make} component={Link} className={classes.cell}
                alreadylevel = {nowres[idx].classlevel}
                onClick = {function(e) {
                    e.preventDefault();
                    if(roomsit[1].sit == 0) {
                        alert('방을 이용할 수 없습니다.');
                        e.preventDefault();
                    }
                    else {
                        if(chkclick(2, i)) {
                            props.st.waiting = 0;
                            props.rst.history.push({
                                pathname : "/do/"+props.con+"/"+timeList[i]+"/Talk_Room_2",
                                state : props.st
                            });
                        }
                        else {
                            alert('예약 대기만 가능합니다.');
                            props.st.waiting = 1;
                            props.rst.history.push({
                                pathname : "/do/"+props.con+"/"+timeList[i]+"/Talk_Room_2",
                                state : props.st
                            });
                        }
                    }
                }}
                style={{backgroundColor: BackGroundColor(nowres[idx++].classlevel, 2), opacity: 0.9}}
                ></TableCell>
                :

                <TableCell align="center" id={props.make} component={Link} className={classes.cell}
                onClick = {function(e) {
                    e.preventDefault();
                    if(roomsit[1].sit == 0) {
                        alert('방을 이용할 수 없습니다.');
                        e.preventDefault();
                    }
                    else {
                        props.rst.history.push({
                            pathname : "/do/"+props.con+"/"+timeList[i]+"/Talk_Room_2",
                            state : props.st
                        });
                    }
                }}
                style={{backgroundColor: BackGroundColor(-1, 2), opacity: 0.7}}
                ></TableCell>
            }

            {
                idx < nowres.length &&
                (nowres[idx].Time).toString() == (timeliststring[i]).toString() &&
                nowres[idx].Room == 3 ?
                <TableCell align="center" id={props.make} component={Link} className={classes.cell}
                onClick = {function(e) {
                    e.preventDefault();
                    if(roomsit[2].sit == 0) {
                        alert('방을 이용할 수 없습니다.');
                        e.preventDefault();
                    }
                    else {
                        if(chkclick(2, i)) {
                            props.st.waiting = 0;
                            props.rst.history.push({
                                pathname : "/do/"+props.con+"/"+timeList[i]+"/Talk_Room_3",
                                state : props.st
                            });
                        }
                        else {
                            alert('예약 대기만 가능합니다.');
                            props.st.waiting = 1;
                            props.rst.history.push({
                                pathname : "/do/"+props.con+"/"+timeList[i]+"/Talk_Room_3",
                                state : props.st
                            });
                        }
                    }
                }}
                style={{backgroundColor: BackGroundColor(nowres[idx++].classlevel, 3), opacity: 0.9}}
                ></TableCell>

                :

                <TableCell align="center" id={props.make} component={Link} className={classes.cell}
                onClick = {function(e) {
                    e.preventDefault();
                    if(roomsit[2].sit == 0) {
                        alert('방을 이용할 수 없습니다.');
                        e.preventDefault();
                    }
                    else {
                        props.rst.history.push({
                            pathname : "/do/"+props.con+"/"+timeList[i]+"/Talk_Room_3",
                            state : props.st
                        });
                    }
                }}
                style={{backgroundColor: BackGroundColor(-1, 3), opacity: 0.7}}
                ></TableCell>
            }


            {
                idx < nowres.length &&
                (nowres[idx].Time).toString() == (timeliststring[i]).toString() &&
                nowres[idx].Room == 4 ?
                <TableCell align="center" id={props.make} component={Link} className={classes.cell}
                onClick = {function(e) {
                    e.preventDefault();
                    if(roomsit[3].sit == 0) {
                        alert('방을 이용할 수 없습니다.');
                        e.preventDefault();
                    }
                    else {
                        if(chkclick(2, i)) {
                            props.st.waiting = 0;
                            props.rst.history.push({
                                pathname : "/do/"+props.con+"/"+timeList[i]+"/3D_Printer_Room",
                                state : props.st
                            });
                        }
                        else {
                            alert('예약 대기만 가능합니다.');
                            props.st.waiting = 1;
                            props.rst.history.push({
                                pathname : "/do/"+props.con+"/"+timeList[i]+"/3D_Printer_Room",
                                state : props.st
                            });
                        }
                    }
                }}
                style={{backgroundColor: BackGroundColor(nowres[idx++].classlevel, 4), opacity: 0.9}}
                ></TableCell>

                :

                <TableCell align="center" id={props.make} component={Link} className={classes.cell}
                onClick = {function(e) {
                    e.preventDefault();
                    if(roomsit[3].sit == 0) {
                        alert('방을 이용할 수 없습니다.');
                        e.preventDefault();
                    }
                    else {
                        props.rst.history.push({
                            pathname : "/do/"+props.con+"/"+timeList[i]+"/3D_Printer_Room",
                            state : props.st
                        });
                    }
                }}
                style={{backgroundColor: BackGroundColor(-1, 4), opacity: 0.7,}}
                to={{ pathname : "/do/"+props.con+"/"+timeList[i]+"/3D_Printer_Room", state : props.st}}
                ></TableCell>
            }


            {
                idx < nowres.length &&
                (nowres[idx].Time).toString() == (timeliststring[i]).toString() &&
                nowres[idx].Room == 5 ?
                <TableCell align="center" id={props.make} component={Link} className={classes.cell}
                onClick = {function(e) {
                    e.preventDefault();
                    if(roomsit[4].sit == 0) {
                        alert('방을 이용할 수 없습니다.');
                        e.preventDefault();
                    }
                    else {
                        if(chkclick(2, i)) {
                            props.st.waiting = 0;
                            props.rst.history.push({
                                pathname : "/do/"+props.con+"/"+timeList[i]+"/VR_Room",
                                state : props.st
                            });
                        }
                        else {
                            alert('예약 대기만 가능합니다.');
                            props.st.waiting = 1;
                            props.rst.history.push({
                                pathname : "/do/"+props.con+"/"+timeList[i]+"/VR_Room",
                                state : props.st
                            });
                        }
                    }
                }}
                style={{backgroundColor: BackGroundColor(nowres[idx++].classlevel, 5), opacity: 0.9}}
                ></TableCell>

                :

                <TableCell align="center" id={props.make} component={Link} className={classes.cell}
                onClick = {function(e) {
                    e.preventDefault();
                    if(roomsit[4].sit == 0) {
                        alert('방을 이용할 수 없습니다.');
                        e.preventDefault();
                    }
                    else {
                        props.rst.history.push({
                            pathname : "/do/"+props.con+"/"+timeList[i]+"/VR_Room",
                            state : props.st
                        });
                    }
                }}
                style={{backgroundColor: BackGroundColor(-1, 5), opacity: 0.7}}
                //to={{ pathname : "/do/"+props.con+"/"+timeList[i]+"/VR_Room", state : props.st}}
                ></TableCell>
            }


            {
                idx < nowres.length &&
                (nowres[idx].Time).toString() == (timeliststring[i]).toString() &&
                nowres[idx].Room == 6 ?
                <TableCell align="center" id={props.make} component={Link} className={classes.cell}
                onClick = {function(e) {
                    e.preventDefault();
                    if(roomsit[5].sit == 0) {
                        alert('방을 이용할 수 없습니다.');
                        e.preventDefault();
                    }
                    else {
                        if(chkclick(2, i)) {
                            props.st.waiting = 0;
                            props.rst.history.push({
                                pathname : "/do/"+props.con+"/"+timeList[i]+"/Visual_Studio",
                                state : props.st
                            });
                        }
                        else {
                            alert('예약 대기만 가능합니다.');
                            props.st.waiting = 1;
                            props.rst.history.push({
                                pathname : "/do/"+props.con+"/"+timeList[i]+"/Visual_Studio",
                                state : props.st
                            });
                        }
                    }

                }}
                style={{backgroundColor: BackGroundColor(nowres[idx++].classlevel, 6), opacity: 0.9}}
                ></TableCell>

                :

                <TableCell align="center" id={props.make} component={Link} className={classes.cell}
                onClick = {function(e) {
                    e.preventDefault();
                    if(roomsit[5].sit == 0) {
                        alert('방을 이용할 수 없습니다.');
                        e.preventDefault();
                    }
                    else {
                        props.rst.history.push({
                            pathname : "/do/"+props.con+"/"+timeList[i]+"/Visual_Studio",
                            state : props.st
                        });
                    }
                }}
                style={{backgroundColor: BackGroundColor(-1, 6), opacity: 0.7}}
                to={{ pathname : "/do/"+props.con+"/"+timeList[i]+"/Visual_Studio", state : props.st}}
                ></TableCell>
            }


            {
                idx < nowres.length &&
                (nowres[idx].Time).toString() == (timeliststring[i]).toString() &&
                nowres[idx].Room == 7 ?

                <TableCell align="center" id={props.make} component={Link} className={classes.cell}
                onClick = {function(e) {
                    e.preventDefault();
                    if(roomsit[6].sit == 0) {
                        alert('방을 이용할 수 없습니다.');
                        e.preventDefault();
                    }
                    else {
                        if(chkclick(2, i)) {
                            props.st.waiting = 0;
                            props.rst.history.push({
                                pathname : "/do/"+props.con+"/"+timeList[i]+"/Work_Place",
                                state : props.st
                            });
                        }
                        else {
                            alert('예약 대기만 가능합니다.');
                            props.st.waiting = 1;
                            props.rst.history.push({
                                pathname : "/do/"+props.con+"/"+timeList[i]+"/Work_Place",
                                state : props.st
                            });
                        }
                    }
                }}
                style={{backgroundColor: BackGroundColor(nowres[idx++].classlevel, 7), opacity: 0.9}}
                ></TableCell>

                :

                <TableCell align="center" id={props.make} component={Link} className={classes.cell}
                onClick = {function(e) {
                    e.preventDefault();
                    if(roomsit[6].sit == 0) {
                        alert('방을 이용할 수 없습니다.');
                        e.preventDefault();
                    }
                    else {
                        props.rst.history.push({
                            pathname : "/do/"+props.con+"/"+timeList[i]+"/Work_Place",
                            state : props.st
                        });
                    }
                }}
                style={{backgroundColor: BackGroundColor(-1, 7), opacity: 0.7}}
                //to={{ pathname : "/do/"+props.con+"/"+timeList[i]+"/Work_Place", state : props.st}}
                ></TableCell>
            }

        </TableRow>
    );
  }

  return (
    <div>



      <Table className={classes.table} id={props.mainTable}>
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.cell}></TableCell>
            <TableCell align="center" className={classes.cell}>Talk Room1</TableCell>
            <TableCell align="center" className={classes.cell}>Talk Room2</TableCell>
            <TableCell align="center" className={classes.cell}>Talk Room3</TableCell>
            <TableCell align="center" className={classes.cell}>3D Printer Room</TableCell>
            <TableCell align="center" className={classes.cell}>VR Room</TableCell>
            <TableCell align="center" className={classes.cell}>Visual Studio</TableCell>
            <TableCell align="center" className={classes.cell}>WorkPlace </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>{elements}</TableBody>

      </Table>
    </div>
  );
}
