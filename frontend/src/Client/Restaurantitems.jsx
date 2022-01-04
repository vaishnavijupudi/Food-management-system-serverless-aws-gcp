import React,{useState,useEffect} from 'react';
import item from "./items.png";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import {useHistory} from "react-router-dom";
import Axios from "axios";
import "./item.css";
import ReactS3 from 'react-s3';
import  { uploadFile } from 'react-s3';
import ReactDom from 'react-dom';
import AWS from 'aws-sdk'

function Restaurantitems(props) {

    const history = useHistory();
    console.log(props.location.state.User);
    console.log(props.location.state.User_type);
    const S3_BUCKET =props.location.state.Name;
    const REGION ='us-east-1';


    AWS.config.update({
        accessKeyId: 'ASIAQ2RO2MNGEJ32OUFG',
        secretAccessKey: '9413BftBnl7o3smxC5klEmSl122rS9jyAMLeoLpJ',
        sessionToken:'FwoGZXIvYXdzEJL//////////wEaDObRMvaPHEmEpZ4ISCK/AS0TVWzYbDHgrXP0z7YF1oug0vED83W9ih3jbtv4sCOfCZohk8M7iJ0i898VHhPEREB3wB7BZ0Hs3sqFj9rUDL7Ap7x66JOdt18ghRKhdKNjvMW1MyB4HNgtHg9+wm9kgP2kIf6w56hC3GyQlPXzSk5Vw6jL6vRtVc7hAYhG+3LCZPeeGwD5Ak3fPQp6NUnRW7EvXx5esDVsL8zcu5PMoAaQQm4HG6PdXKG3JTiPWlCU5/2dVAhq/7+wnFy/NoX5KKLOiYgGMi1WLMZ9SbuinSjjbqdI/3aUeHAbmYXrthTmPZyFC7ECzIZj1d3IDlRhdmhIGbM=',
        })
    
    const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET},
        region: REGION,
    })

    console.log("id="+props.location.state.Name);
    const [items, setitems] = useState([]);
    useEffect(()=>{
        Axios.get(`https://7dqk5i2xab.execute-api.us-east-1.amazonaws.com/test/transactions?restaurant_name=`+props.location.state.Name)
          .then(function (response) {
            console.log(response.data.data);
            setitems((response.data.data).split(','));
          });
        },[]);

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
                alert(" Receipe Uploaded successfully");
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }

    function order(item){
        Axios.get("https://pnpszal65b.execute-api.us-east-1.amazonaws.com/sdas/transactions?restaurant_name="+props.location.state.Name+"&item_name="+item.split('.')[0]+"&user_id="+props.location.state.User)
        .then(function (response) {
          history.push("/order",{Name: props.location.state.Name,User : props.location.state.User,User_type : props.location.state.User_type,order_item : item});
        });
          }


    return (
        <div style={{"padding":"24px"}}>
        {/* <form className="addreceipe">
        
            <label className="labeladdnew">Add new Item</label>
            <div class="form-group betweenitem">
                <label>Item Name</label>
                <input class="form-control" id="item"  placeholder="Item name" value={newitem}  onChange={(e) => setnewitem(e.target.value)}/>

            </div>
            <div class="form-group betweenitem">
                <label>Recipe</label>
                <input class="form-control" id="receipe" placeholder="Receipe" value={newreceipe}  onChange={(e) => setnewreceipe(e.target.value)}/>
            </div>
              <div class="form-group betweenitem">
                <label>Price</label>
                <input class="form-control" id="price" placeholder="Price" value={newprice}  onChange={(e) => setnewprice(e.target.value)}/>
            </div>
           
            <Button style={{"margin-left": "109px"}} onClick={submit} > Submit</Button>
        </form> */}
        <div>        
                <div>Native SDK File Upload Progress is {progress}%</div>
                <input type="file" onChange={handleFileInput}/>
                <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
        </div>
        <div id='label' className="itemlabel">Restaurant Items :</div>
        <div id='items' className="displayitem">
          <div className="card-group" style={{"margin-left": "auto","margin-right":"auto"}}>
            {
                items.slice(0, items.length-1).map((e)=>{
                        return (
                                    <div className="card">
                                        <img src={item} className="card-img-top" alt="..."/>
                                                <div className="card-body">
                                                    <h5 className="card-title">{e.split('.')[0]}</h5>
                                                    <h5 class="card-title">Price : $50</h5>
                                                    <Button  id="restaurant-3" onClick={() => order(e)}>Order Item</Button>
                                                </div>
                                    </div>
                                
                        );
                })
            }
             </div>   
        </div>
        </div>
    )
}
export default Restaurantitems;