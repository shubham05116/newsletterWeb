//jhint esversion: 6


const express = require("express");
const bodyParser = require("body-parser");
const request= require("request");
const https= require("https");

const app= express();

app.use(express.static("public"));      //to use files stored in local storage
app.use(bodyParser.urlencoded({extended : true}));


app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req,res){
  // const firstName= req.body.fname;
  // const lastName= req.body.lname;
    const firstName = req.body.fname;
    const lastName = req.body.lname;
  const email= req.body.email;

  const data= {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData= JSON.stringify(data);

  const url= "https://us5.api.mailchimp.com/3.0/lists/5a672dfd87";

    const options = {
      method: "POST",
      auth: "shubham:abd171e6b6d35960bf8dfbadc81c16ac-us5"
    }

  const request = https.request(url, options, function(response){

    if(response.statusCode === 200){      ///if the status code is 200 , everything went right
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req,res){
  res.redirect("/");
});



app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});

// API key
// abd171e6b6d35960bf8dfbadc81c16ac-us5   we have to replace the last number(here it is us18) with usX of url

// List Id:
// 5a672dfd87  replace this list id with {list_id} from that of url
