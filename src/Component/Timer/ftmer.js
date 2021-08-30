import React, {useState,useEffect} from "react";

/*
flow step
1- 2:50 tutor presh session start button
2- store session start time = 3:00
in Tutor/session.js/Start button/onClick event
 window.localStorage.setItem("session-start-time",props.Time);
3- 2:55 Backend to pass studentButton Enable/desable 

Timer
1- 2:50 start wait till 3:00
2-start count down


 */
const  Timer = (props) => {
const [counter,setCounter] = useState(61);
const [socket,setSocket] = useState(props.socket);
const [stime,setSTime] = useState();
const [min,setMin]=useState();
const [sec,setSec]=useState();
const [sessionStartTime,setSessionStartTime]=useState();
const [sessionEndTime,setSessionEndTime]=useState();

useEffect(() => {
  try{
    if(localStorage.getItem("session-start-time")){
      setSessionStartTime(window.localStorage.getItem("session-start-time"));
    // var hr = parseInt(sessionStartTime.split(":")[0]) + 1;
   //   var mt = sessionStartTime.split(":")[1];
   //   setSessionEndTime(hr+":"+mt);
      socket.on("session-start-time",(time)=>{
        setSTime(time);
      });
    }
  }catch(e){throw e;}
}, []);

     
const loop = () =>{
  if("12:30"){
 //setSTime(window.localStorage.getItem("serverTime"));
  setTimeout(function() {
    setCounter(counter - 1 );
    if(60<=counter){
      setSec(Math.floor(counter%60));
      setMin(Math.floor(counter/60));
      console.log("60+")
     
    }else if(0<counter && counter<60){
      setSec(Math.floor(counter));
      setMin(0);
     // console.log("0-60")
    }else if(0>counter && counter > -60){
      setSec(Math.floor(counter));
      setMin(0);
      //console.log("-60-0")
    }else if(counter < -60){
      setSec(Math.floor(counter%60));
      setMin(parseInt(counter/60));
      //3.897 -> 3 paseint
    //  console.log(counter,"counter < -60")
    }

  }, 1000);
}

}

      return(
      <div>
        {
      //  loop()
        }
        session-start-time {sessionStartTime}
        <br/>
        session-end-time {sessionEndTime}
        <br/>
        server Join Time : {stime}  
        <br/>
        rest of time : {counter}s 
        <br/>
        currently at: {min}m : {sec}s,
       
      </div>);
    
  }
  
  export default Timer;