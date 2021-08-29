import React, { Component } from "react";
import PropTypes from "prop-types";

class T extends Component {
  constructor(props) {
    super(props);
    /*
    this.state = {
        count: 1
      };
      */
     this.state = {
        sessionEndTime: "",
        sessionStartTime: "",
        min: "",
        sec: "",
        counter: 100,
        serverTime: "",
        posts: [],
        comments: [],
        count: 3600
      };
  }

  componentWillMount() {
   this.setState({ sessionStartTime: window.localStorage.getItem("session-start-time"),});   
  
  }

  componentDidMount() {
      /*
    var hr = parseInt(this.state.sessionStartTime.split(":")[0]) + 1;
    var mt = this.state.sessionStartTime.split(":")[1];
    this.setState({ sessionEndTime: hr+":"+mt});
    */
   
  }

  componentWillUnmount () {
    clearInterval(this.t)
  }
  loop = () => {
      /*
      setTimeout(function () {
       this.setState({counter: this.state.counter - 1});
        if (60 <= this.state.counter) {
          this.setState({ sec: Math.floor(this.state.counter % 60) });
          this.setState({ min: Math.floor(this.state.counter / 60) });
          console.log("60+");
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
          //3.897 -> 3 paseint
          //  console.log(counter,"counter < -60")
        }
      }, 1000);
   */
  };
  tick () {
    this.setState({count: (this.state.count - 1)})
  }
  startTimer () {
    clearInterval(this.t);
    this.t = setInterval(this.tick.bind(this), 1000);
  }
  stopTimer () {
    clearInterval(this.t)
  }

  render() {
  
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
        server Join Time : {this.state.serverTime}
        <br />
        rest of time : {this.state.counter}--{this.state.count}s
        <br />
        currently at: {this.state.min}m : {this.state.sec}s,
       
        <br />
      </div>
    );
  }
}

T.propTypes = {};

export default T;
