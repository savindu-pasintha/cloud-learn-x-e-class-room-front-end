import React, { Component } from "react";
import PropTypes from "prop-types";

class Timer extends Component {
  constructor(props) {
    super(props);
     this.state = {
        sessionEndTime: "",
        sessionStartTime: "",
        min: "",
        sec: "",
        counter: 3600,
        serverTime: "serverJoinTime",
        posts: [],
        comments: [],
        count: 3600,
        socketJ: props.socket,
        ourLocalTime:new Date().toLocaleTimeString()
      };

      this.state.socketJ.on("session-start-time",(time)=>{
        this.setState({serverTime: time});
      }); 
  }

 
  componentWillMount() {
   this.setState({ sessionStartTime: window.localStorage.getItem("session-start-time")});   
   this.endTimeCalculate();
  }

  componentDidMount() {}

  componentWillUnmount () {
    clearInterval(this.Timer);
  }

  endTimeCalculate = () =>{
   // var hr = parseInt(this.state.sessionStartTime.split(":")[0]) + 1;
   // var mt = this.state.sessionStartTime.split(":")[1];
    this.setState({ sessionEndTime: this.state.sessionStartTime});
    console.log(this.state.sessionStartTime)
  }
  tick =()=> {
    //this.setState({count: (this.state.count - 1)});
    this.setState({counter: this.state.counter - 1});
    if (60 <= this.state.counter) {
      this.setState({ sec: Math.floor(this.state.counter % 60) });
      this.setState({ min: Math.floor(this.state.counter / 60) });
     // console.log("60+");
    } else if (0 < this.state.counter && this.state.counter < 60) {
      this.setState({ sec: Math.floor(this.state.counter) });
      this.setState({ min: 0 });
      // console.log("0-60")
    } else if (0 > this.state.counter && this.state.counter > -60) {
      this.setState({ sec: Math.floor(this.state.counter) });
      this.setState({ min: 0 });
      //console.log("-60-0")
    } else if (this.state.counter < -60) {
      this.setState({ sec: Math.floor(this.state.counter % 60) });
      this.setState({ min: parseInt(this.state.counter / 60) });
      // 3.897 -> 3 paseint  console.log(counter,"counter < -60")
    }
  }
  startTimer () {
    clearInterval(this.timer);
    this.timer = setInterval(this.tick.bind(this),1000);
  }
  stopTimer () {
    clearInterval(this.timer);
  }

  render() {
    this.startTimer();
    return (
      <div>
        class component
        <button onClick={this.startTimer.bind(this)}>Start</button>
        <button onClick={this.stopTimer.bind(this)}>Stop</button>
        <br />
        session-start-time {this.state.sessionStartTime}
        <br />
        session-end-time {this.state.sessionEndTime}
        <br />
        jon Server : {this.state.serverTime+"  Local :"+this.state.ourLocalTime}
        <br />
         <p>{this.state.counter}--{this.state.count}s</p>
        <br />
        <p style={{fontSize:"30px"}}>{this.state.min}<span>m :</span> {this.state.sec}<span>s</span></p> 
        <br />
      </div>
    );
  }
}

Timer.propTypes = {};

export default Timer;
