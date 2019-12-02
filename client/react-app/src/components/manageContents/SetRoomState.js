import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';
import axios, {post} from 'axios'; // phs

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
  },
  card:{
      border: '1px solid #dddddd',
      paddingBottom : theme.spacing(1.5),
      width:'100%',
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
  },
  list: {
    width: '100%',
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(1, 1.5),
  },

  button2: {
    backgroundColor: '#557bff',
    "&:hover":{

    },
    margin: theme.spacing(5,1,1,1),
    fontSize:22,
    width: 200,
  },
  gridBox:{
    width:'35%',
     [theme.breakpoints.down('sm')]:{
       width:'80%',
       padding:0,
     },
},
}));

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function getNowDate(){
  var date = new Date();
  var year = date.getFullYear().toString();
  var mon = (date.getMonth()+1).toString();
  var day = date.getDate().toString();
  if(mon<10) mon="0"+mon;
  if(day<10) day="0"+day;
  return "index/"+year+mon+day;
}

export default function SetRoomState(props) {
  const roomlist = props.info;
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const leftarr = [];
  const rightarr = [];
  let dict = {};
  dict[1] = 'Talk Room 1';
  dict[2] = 'Talk Room 2';
  dict[3] = 'Talk Room 3';
  dict[4] = '3D Printer';
  dict[5] = 'VR Room';
  dict[6] = 'Visual Studio';
  dict[7] = 'Work Place';
//   const [left, setLeft] = React.useState([
//       'Visual Studio', 'Work Place', 'VR Room', '3D Printer', 'Talk Room 1', 'Talk Room 2', 'Talk Room 3'
//   ]);
//   const [right, setRight] = React.useState([]);

  for(let i = 0; i<roomlist.length; i++) {
      if(roomlist[i].sit == 0) {
        rightarr.push(dict[roomlist[i].roomnumber]);
      }
      else if(roomlist[i].sit == 1) {
        leftarr.push(dict[roomlist[i].roomnumber]);
      }
  }

  const [left, setLeft] = React.useState(leftarr);
  const [right, setRight] = React.useState(rightarr);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = items => intersection(checked, items).length;

  const handleToggleAll = items => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} 선택됨`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map(value => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <div>
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                <Grid item className={classes.gridBox}>{customList('활성화', left)} </Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    </Grid>
                </Grid>
                <Grid item className={classes.gridBox}>{customList('비활성화', right)}</Grid>

        </Grid>

        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Button
                variant="contained"
                color="primary"
                className={classes.button2}
                //component={Link}

                //to={getNowDate()}
                onClick = {function(e){
                    e.preventDefault();
                    axios({
                        method:'post',
                        url:'http://100.26.66.172:5000/room/manage',
                        data: {
                            Left : left,
                            Right : right
                        }
                    })
                    .then(function(res) {
                        if(res.data == 'success') {
                            const { history } = props;
                            props.st.history.push('/index', props.st.history.location.state);
                          }
                        else {
                            alert('SetRoomState.js 오류 발생 212 line');
                        }
                        console.log(res);

                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                }}

            >OK</Button>
        </Grid>
    </div>
  );
}
