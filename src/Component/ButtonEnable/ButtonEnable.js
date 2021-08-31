import db from "../Firebase/firebase";
export default class ButtonEnable{

     firebaseLaunchedUpdate = async (documentIDIsSessionId) => {
        var responce="";   
        if (documentIDIsSessionId!==null) {
               await db
                    .collection("Launched")
                    .doc(documentIDIsSessionId)
                    .set({
                        'Status': "Launched",
                    })
                    .then((res) => {
                       responce =true;
                    }).catch((error) => {
                        console.log("firebase launched updated err", error);
                    });

                    return responce;
            } 
    }

    student_Waiting_For_Start_Session_Time_To_Enable_Button = async (sessionStartEpochTime,launchedSessionId)=>{
        var res = false;
        var nowTimeEpoch = Math.floor(new Date().getTime()/1000.0);
        var waitingTime =  parseInt(sessionStartEpochTime) - nowTimeEpoch;
        console.log(nowTimeEpoch,waitingTime,sessionStartEpochTime)
        //1630337683-after>1630342176-local
        if(sessionStartEpochTime < nowTimeEpoch){
            res = await this.firebaseListenTutorIsLaunched(launchedSessionId); 
        }
        else{
            await this.sleep(waitingTime*1000);
            res = await this.firebaseListenTutorIsLaunched(launchedSessionId); 
        }
        return res;
      }

    firebaseListenTutorIsLaunched = async (documentIdAsASessionId) => {
       var res = false;
        try {
            await db.collection("Launched")
            .get()
            .then((items)=>{
               items.docs.forEach(doc=>{
                if(documentIdAsASessionId === doc.id){
                    res = true; 
                }else{
                    res = false;
                };
             });
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    sleep = (milisecond) => {
        return new Promise(
          resolve => setTimeout(resolve, milisecond)
        );
      }
      
     
      
      
   

}