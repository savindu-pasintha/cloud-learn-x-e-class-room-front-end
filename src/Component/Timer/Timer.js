import React, { Component } from "react";
import PropTypes from "prop-types";

class Timer extends Component {
  constructor(props) {
    super(props);
     this.state = {
        sessionStartEpochTime: props.SessionStartEpochTime,

        sessionStartTime: new Date(props.SessionStartEpochTime*1000).toLocaleString(),

        sessionEndTime:new Date((parseInt(props.SessionStartEpochTime)+3600)*1000).toLocaleString(),

        nowLocalEpochTime: Math.floor(new Date().getTime()/1000.0),

        endLocalEpochTime: parseInt(props.SessionStartEpochTime)+3600,

        min: "",
        sec: "",
        counter:1000,
        serverTime: "00:00:00",
        socketJ: props.socket,
        ourLocalTime:new Date().toLocaleTimeString(),
        };

      this.state.socketJ.on("session-start-time",(time)=>{
        this.setState({serverTime: time});
      }); 

      console.log(props.SessionStartEpochTime,props.SessionStartTime)
  }
  componentWillMount() { this.calculateSessionEndToTimeBalance();}
  componentDidMount() {}
  componentWillUnmount () { clearInterval(this.Timer);}
  calculateSessionEndToTimeBalance = () =>{
    var endTimeEpoch = this.state.endLocalEpochTime;
    var nowTimeEpoch = parseInt(this.state.nowLocalEpochTime);
    var waitingTime = endTimeEpoch - nowTimeEpoch;
    this.setState({counter: waitingTime});    
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
       <p style={{fontSize:"10px",padding:"0px"}}>{this.state.sessionStartTime} | {this.state.sessionEndTime}</p>
       <p style={{fontSize:"10px",padding:"0px",margin:"0px"}}>JOIN SERVER {this.state.serverTime+"  LOCAL : "+this.state.ourLocalTime}</p>
       <p style={{fontSize:"30px",padding:"0px"}}>{this.state.min}<span>m :</span> {this.state.sec}<span>s</span></p> 
      </div>
    );
  }
}

Timer.propTypes = {};

export default Timer;
