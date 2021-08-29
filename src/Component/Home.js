import React, { useEffect, useState } from 'react';
import TutorHome from '../Component/Tutors/Home';
import StudentHome from '../Component/Students/Home';
import io from 'socket.io-client';

const Home = (props) => {
  // const role = localStorage.getItem('role');
  // const userId = localStorage.getItem('UserId');
  // console.log(role);
  /*
  const [socket,setSocket] = useState();
  useEffect(() => {
    const backEndURL = "http://localhost:5000";
    setSocket(io(backEndURL));
  }, []);
 */
  if(props.role === "tutor"){
    return (
      <div>
        <TutorHome user = {props.userId}/>
      </div>   
    )
  }
  else if(props.role === "student"){
    return(
      <div>
        <StudentHome user = {props.userId}/>
      </div>
    )
  }
  
}
  
export default Home;
