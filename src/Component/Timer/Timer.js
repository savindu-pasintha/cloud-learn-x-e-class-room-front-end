import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Timer = () => {
  const[countDownStartDate,setCountDownStartDate] =useState(null);
  const[countDownEndDate,setCountDownEndDate] =useState(null);
  const[distance,setDistance]=useState(null);
 
  const [expired, setExpred] = useState(null);
  const [day, setDay] = useState(null);
  const [hour, setHour] = useState(null);
  const [second, setSecond] = useState(null);
  const [minite, setMinite] = useState(null);

  useEffect(() => {countDownTime();}, []);

  const countDownTime = () => {
    // Set the date we're counting down to
    var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();
    setCountDownStartDate(countDownDate);

    // Update the count down every 1 second
    var timeDownByOneSecond = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();
      setCountDownEndDate(now); 

      // Find the distance between now and the count down date
      var distancee = countDownStartDate - now;
      setDistance(distancee);

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distancee / (1000 * 60 * 60 * 24));
      setDay(days);

      var hours = Math.floor((distancee % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setHour(hours);

      var minutes = Math.floor((distancee % (1000 * 60 * 60)) / (1000 * 60));
      setMinite(minutes);

      var seconds = Math.floor((distancee % (1000 * 60)) / 1000);
      setSecond(seconds);

      /* Display the result in the element with id="demo"
      document.getElementById("demo").innerHTML =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      */

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(timeDownByOneSecond);
        setExpred("EXPIRED");
      }
    }, 1000);
  };

  return (
    <div>
      <p>{day}D {hour}H {minite}M {second}S</p>
    </div>
  );
};

Timer.propTypes = {};

export default Timer;
