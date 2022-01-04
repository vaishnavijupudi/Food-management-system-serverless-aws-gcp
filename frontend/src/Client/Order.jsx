import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Axios from "axios";

function Order(props) {


    const [review, setreview] = useState("");
    
    // console.log(props.location.state.Name);
    // console.log(props.location.state.User);
    // console.log(props.location.state.User_type);
    // console.log(props.location.state.order_item);


    function submit_review(){
        Axios.get("https://0iyqmqvt6f.execute-api.us-east-1.amazonaws.com/test/transactions?restaurant_name="+props.location.state.Name+"&item_name="+(props.location.state.order_item).split('.')[0]+"&review="+review)
        .then(function (response) {
          alert("Review Submitted successfully");
        });
    }
    return (
        <div>
          <h2>  Thanks!! You order for {(props.location.state.order_item).split('.')[0]} has been succesfully placed !!!</h2>
          <h4>How you liked the order...Enter comments</h4>
          <input id="playlist-name" className="form-control" onChange={(event) =>{setreview(event.target.value)}}></input>
          <Button   onClick={() => submit_review()}>Submit</Button>
        </div>
    )
}
export default Order;
