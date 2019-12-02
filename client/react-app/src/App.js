import React from 'react';
import Signin from './components/Signin';
import ReservationMain from './components/ReservationMain';
import ReservationDo from './components/ReservationDo';
import ReservationManage from './components/ReservationManage';
import ReservationSum from './components/ReservationSum';
import ReservationStep from './components/ReservationStep';
import ManageUser from './components/ManageUser';
import ManageRoom from './components/ManageRoom';
import MainPage from './components/MainPage';
import RoomCard from './components/RoomCard';
import ScrollToTop from './components/ScrollToTop';
import {Route} from 'react-router-dom';
import './App.css';


export default function App() {
  document.title='세종대학교 콜라보랩';
  return (
    <div>

      <ScrollToTop>
        <Route path="/" exact={true} component={Signin}/>
        <Route path="/reservation/:date"  component={ReservationMain}/>
        <Route path="/manage/:year/:month" component={ReservationManage}/>
        <Route path="/users"  exact={true} component={ManageUser}/>
        <Route path="/rooms"  exact={true} component={ManageRoom}/>
        <Route path="/sum/:year/:month" component={ReservationSum}/>
        <Route path="/index"  exact={true} component={MainPage}/>
        <Route path="/do/:date/:time/:room"   component={ReservationStep}/>
        <Route path="/cards" exact={true} component={RoomCard}/>

        <Route path="/step" exact={true} component={ReservationDo}/>
      </ScrollToTop>
    </div>
  );
}
