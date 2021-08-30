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


    firebaseListenTutorIsLaunched = async (documentIdAsASessionId) => {
       var res ="";
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

}