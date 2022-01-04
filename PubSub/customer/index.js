console.log("customer");
const express = require('express');
const {PubSub} = require('@google-cloud/pubsub');
const path = require('path');
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const app = express();
const pubSubClient = new PubSub();
const data = JSON.stringify({foo: 'hello '});

const projectId = 'csci-5410-serverless';
const topicName = 'customer-22';
const subscriptionName = 'restaurantsubscription';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("start");
})

app.get('/chat',(req, res) => {
    res.render("chat",{msg:req.body.message,restmsg:""});
})

app.post("/chat", async (req, res) => {
    const message = req.body.message;
    const dataBuffer = Buffer.from(message);
    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
    const pull = await pubSubClient.topic(topicName).subscription(subscriptionName);
    console.log(`Subscription ${subscriptionName} created.`);
    var newmessage = ""
    await pull.on('message',async message => {
         newmessage = await message.data.toString()
        console.log('Received message:', message.data.toString());
        res.render('chat.ejs',{msg:req.body.message,restmsg:newmessage})
        process.exit(0);
      });
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});