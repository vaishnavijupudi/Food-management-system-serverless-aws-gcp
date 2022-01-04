import React, {useState} from 'react';
import {useHistory, Redirect} from "react-router-dom";
import {Auth} from 'aws-amplify';
import firebase from "./firebase";
import {
    withAuthenticator,
  } from "@aws-amplify/ui-react";

function SecurityQuestion () {
    const [answer, setAnswer] = useState("")
    const history = useHistory();

    const question = "What is your favourite color?"
    const firebase_api = firebase.firestore().collection("user")

    const handleSubmit = async e => {
        e.preventDefault();
        const user = {
            username: Auth.user.username,
            email: Auth.user.attributes.email,
            question: question,
            answer: answer,
        }
        firebase_api.doc().set(user).then(() => {
            console.log("security question recorded in firebase");
            // history.push("/list")
            history.push("/list/",{User : Auth.user.username,User_type : Auth.user.attributes.email});
            // return <Redirect to="/list"/>
        }).catch((err)=>{
            console.log("error in saving to firebase" + err)
    })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>{question}</label>
                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SecurityQuestion;
