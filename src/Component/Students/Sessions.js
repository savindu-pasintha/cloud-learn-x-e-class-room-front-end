import React,{useEffect,useState,useRef} from 'react'
import { Button } from '@material-ui/core';
import { Socket } from 'socket.io-client';
import ButtonEnable from '../ButtonEnable/ButtonEnable';

// the props will be:
// props.Name : students name
// props.StudentId : students id
//props.SessionId : session Id for the call
// props.SchoolId : School Id
// props.Year : Students school year
// props.Time : Time the session is booked for
// ;
function Sessions(props) {
    const [enabled,setEnabled] = useState(true);
    const [count,setCount]=useState(10);
    const socketRef = useRef(props.socket);

    
   useEffect(() => {
    isLaunchedTutor();  
  }, []);

    //chek DatabaseTutor session is Launched & Not
    const isLaunchedTutor = async ()=>{
        try{
            if(props.SessionId!==null)
            {
                var obj = new ButtonEnable();
               var res =  await obj.student_Waiting_For_Start_Session_Time_To_Enable_Button(props.SessionStartEpochTime,props.SessionId);
               console.log(res);
               if(res){
                setEnabled(false);
               }else{
                setEnabled(true);
               }
              
            }else{
                console.log("Error : student session id cannot read in props.SessionId in the session.js page");
            }
        }catch(err){
            console.log(err);
        }  
    }
  
    return (
    <div className = "session-card-block">
           
            { /* ----------------------------------------This is is the title bar section ----------------------------------------------------------------------------------- */}
                <div className="title-bar">
                    <div className="card-block__time">
                        {props.Time}
                    </div>
                    <div className="card-block__name">
                        <a className="student-profile" href="#">{props.Name}  {props.StudentId}</a>
                        {props.Date}
                    </div>
                    <div className="card-block__school-name">
                        School {props.SchoolId}
                    </div>
                </div>  
                {/* ---------------------------------------------------Start of card content-------------------------------------------------------------------------------    */}
                <div className="card-block__content">
             {/*--------------------------------------------------- The buttons section------------------------------------------------------------------------------------- */}
                    <div className="card-block__button-section">
                    <div className="card-block__button-wrapper">
                        <div id="learning-session-1857904-button" className="with-tooltip" title="You are currently not able to launch this session as no student has been assigned
                            yet or the session is not within 10 minutes of the start time">
                        <Button className="button button--small button--rewards-board button--hard-disable" variant="contained" color="primary"
                        data-session-start="1625488200"
                        onClick ={
                            () =>         
                        {
                            props.setLaunched({
                                'sessionId' : props.SessionId ,
                                'sessionStartEpochTime' : props.SessionStartEpochTime,
                                "sessionStartTime" : props.SessionStartTime
                        });
                        }
                        }
                        disabled={enabled}
                        >Start Session</Button>
                        </div>
                    </div>
                    </div>
                </div>
             
            </div>
                )
}


export default Sessions
