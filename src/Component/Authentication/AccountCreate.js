import React ,{useState} from 'react';
import Account from "./Authentication";

const AccountCreate = () => {

    const [uniqName,setUniqName] =useState(null);
    const [id,setId] =useState(null);
    const [email,setEmail] =useState(null);
    const [password,setPassword] =useState(null);
    const [role,setRole] =useState(null);


    const getName = (e) => {
        e.preventDefault();
      if (e.target.value !== null) setUniqName(e.target.value);
    };
    const getId = (e) => {
        e.preventDefault();
      if (e.target.value !== null) setId(e.target.value);
    };

    const getEmail = (e) => {
        e.preventDefault();
      if (e.target.value !== null) setEmail(e.target.value);
    };

    const getPassword = (e) => {
        e.preventDefault();
      if (e.target.value !== null) setPassword(e.target.value);
    };
    const getRole = (e) => {
        e.preventDefault();
      if (e.target.value !== null) setRole(e.target.value);
    };
    
    const submit = async (e) =>{
        e.preventDefault();
        if(uniqName !== null && password !== null && role !== null && id !== null && role !== null)
        {
            var obj =  new  Account();
            var dataSet = {
            'Id' : id,
             'email': email,
             'password': password,
              'role':role
            };
           // console.log(dataSet);
           await  obj.userAccountFunction(uniqName,dataSet);
       }else{
           alert("please fill all !");
       }
    }
    
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="">
            <input onChange={(e) => {getName(e);}} type="text" placeholder="Name" />
            <input onChange={(e) => {getId(e);}} type="text" placeholder="Id" />
            <input onChange={(e) => {getEmail(e);}} type="text" placeholder="Email" />
            <input onChange={(e) => {getPassword(e);}} type="text" placeholder="Password" />
            <input onChange={(e) => {getRole(e);}} type="text" placeholder="Role" />
            <button onClick={(e)=>{submit(e);}}>Account-Create</button>
          </div>
        </form>
      </div>
    );
}

export default AccountCreate;
