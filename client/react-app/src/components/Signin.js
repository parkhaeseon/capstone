import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import axios, {post} from 'axios'; // phs

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: "21vh",
      position: "relative",
      // paddingBottom: "200px"
    },
    img: {
      width:'40%',
    },
    form: {
      width: '80%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      fontSize:15,
      height:40,
    },
  }));

export default function Signin(props){

  const classes = useStyles();
    return(
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>

            <img alt="" src="/images/sejong.jpg" className={classes.img}/>
            {/*<Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar> */}

            <form
            onSubmit = {function(e) {
                e.preventDefault();
                axios({
                    method:'post',
                    url:'http://100.26.66.172:5000/signin',
                    data: {
                        email : e.target.email.value,
                        password : e.target.password.value
                    }
                })
                .then(function(res) {
                    if(res.data.is_logined == true) {
                        const { history } = props;
                        props.history.push('/index', res.data);
                      }
                    else if(res.data.word == 'loginpenalty') {
                        var start_date = res.data.dbs[0].dates;
                        var end_date = res.data.dbs[0].datee;
                        alert('해당 아이디는 ' + start_date + '부터 ' + end_date + '까지 제재 중입니다.');
                    }
                    else if(res.data == 'Failure') {
                        alert('ID 또는 Password가 틀립니다.');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            }}
            // 52 ~ 74번 째 줄 추가. server로 post 형식으로 전송 - phs
            className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="ID"
                name="email"
                autoFocus
            />

            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign in
                {/* <Link to="/index"> Sign In </Link> */}
                {/* 버튼 자체를 링크로 대체하였음. - phs */}
            </Button>

            </form>

        </div>
      </Container>
    );
}
