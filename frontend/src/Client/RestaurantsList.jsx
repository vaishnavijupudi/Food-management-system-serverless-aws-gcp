import React,{useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import pic from "./restaurantpic.png";
import {useHistory} from "react-router-dom";
import Axios from "axios";
import {
    AmplifySignOut
} from "@aws-amplify/ui-react"
import {Auth} from 'aws-amplify'


function RestaurantsList(props) {

    const history = useHistory();
    const [loggedinuser,setloggedinuser] = useState("");
    const [usertype,setusertype] = useState("");
    // setloggedinuser(props.location.state.User);
    // setusertype(props.location.state.User_type);


    const changePage = (name) => {
        history.push("/items",{Name: name,User : props.location.state.User,User_type : props.location.state.User_type});
    }

    console.log(loggedinuser+ " : "+ usertype);


    return (
        <div  style={{"padding":"34px 0px 0px 0px"}} >
            <AmplifySignOut/>
            <div id='label' className="itemlabel">Restaurants :</div>
              <div class="card-group" style={{"padding": "40px 114px 10px 167px"}}>
                               <div class="card">
                                    <img src={pic} class="card-img-top" alt="..."/>
                                    <div class="card-body">
                                    <h5 class="card-title">Restaurant-1</h5>
                                    <Button  id="restaurant-1" onClick={() => changePage("restaurant-1")}>View Items</Button>
                                    </div>
                                </div>
                                <div class="card">
                                    <img src={pic} class="card-img-top" alt="..."/>
                                    <div class="card-body">
                                    <h5 class="card-title">Restaurant-2</h5>
                                    <Button  id="restaurant-2" onClick={() => changePage("restaurant-2")}>View Items</Button>
                                    </div>
                                </div>
                                <div class="card">
                                    <img src={pic} class="card-img-top" alt="..."/>
                                    <div class="card-body">
                                    <h5 class="card-title">Restaurant-3</h5>
                                    <Button  id="restaurant-3" onClick={() => changePage("restaurant-3")}>View Items</Button>
                                    </div>
                                </div>
                </div>
        </div>
    )
}
export default RestaurantsList;
