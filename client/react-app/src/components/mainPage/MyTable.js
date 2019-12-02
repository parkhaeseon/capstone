import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions,
 } from '@material-ui/core';
import Title from './Title';

const useStyles = makeStyles(theme => ({
    root:{
        overflow:'auto',
    },

    cellUserTop:{
        width:'18%',
        padding:theme.spacing(1,0,1,0),
    },
    cell:{
      width:'18%',
      padding:theme.spacing(1,0,1,0),
    },
    cellUserTopBt:{
        // width:'6%',
        padding:theme.spacing(1,0,1,0),
    },
    cellBt:{
      borderBottom:'1px solid #dddddd',
      padding:theme.spacing(1),
      // width:'6%',
    },
    cellUserBt:{
      // border:'0px',
      padding:'0px',
      width:'10%',
    },
    cellUserBt2:{
      fontSize:10,
    },
    chkPenaltyReason:{
     color:'#5555cc',
     textDecoration:'underline',
     // cursor:'pointer',
   },
    button:{
        // margin: theme.spacing(1),
        color:'#777777',
    }
  }));

var getcontent = '';

export default function MyTable(props) {
  const classes = useStyles();

  var elements=[];
  const getres = props.rect.rec;

  const [openPrDialog, setOpenPrDialog] = React.useState(false);

  const PrDialogClickOpen = () => {
    setOpenPrDialog(true);
  };

  const PrDialogClose = () => {
    setOpenPrDialog(false);
  };

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
          {/*getres[i].Reason*/}
          </TableCell>
          <TableCell align="center" className={classes.cellBt}>
              <Button variant="outlined"   className={classes.button2}>수정</Button>
          </TableCell>
          <TableCell align="center" className={classes.cellBt}>
              <Button variant="outlined"  className={classes.button2}>삭제</Button>
          </TableCell>
        </TableRow>
      );
    }
  }

  return (
    <React.Fragment className={classes.root}>
      <Title>최근 예약</Title>
      <Table size="small" className={classes.table}>
        <TableHead>
            <TableRow>
                <TableCell align="center" className={classes.cellUserTop}>날짜</TableCell>
                <TableCell align="center" className={classes.cellUserTop}>시간</TableCell>
                <TableCell align="center" className={classes.cellUserTop}>사용 룸</TableCell>
                <TableCell align="center" className={classes.cellUserTop}>인원수</TableCell>
                <TableCell align="center" className={classes.cellUserTop}>사유</TableCell>
                <TableCell align="center" className={classes.cellUserTop}>  </TableCell>
                <TableCell align="center" className={classes.cellUserTop}>  </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {elements}
        </TableBody>
      </Table>
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
    </React.Fragment>


  );
}
