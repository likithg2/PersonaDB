const{faker}=require('@faker-js/faker');
const mysql = require ('mysql2');
const express= require('express');
const app =express();
const path=require('path');
const methodoverride=require("method-override");
const {v4:uuidv4}=require('uuid');


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(methodoverride("__method"));
app.use(express.urlencoded({extended:true}));


// let getRandomUser=()=>{
//     return [
//         faker.string.uuid(),
//         faker.internet.username(),
//         faker.internet.email(),
//         faker.internet.password(),
//     ];
// };

// let data=[];

// for(let i=0;i<100;i++){
//     data.push(getRandomUser());
// }

// let users=[["abc","abc_user","abc@gmail.com","Abc@123"],
//         ["abc2","abc_user2","abc@gmail.com2","Abc@1232"]
//     ];


const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'node',
    password:"197773"
});

// let q = "insert into user (id,username,email,password) values ?";

// try{
//     connection.query(q,[data],(err,result)=>{
//         if(err) throw err;
//         console.log(result);
//     });
// }catch(err){
//     console.log(err);
// }


//home route
app.get("/",(req,res)=>{
    let q = "select count(*) from user";

    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let count=result[0]["count(*)"];
            console.log(count);
            res.render('home.ejs',{count});
        });
    }catch(err){
        res.send('error occured');
    }
    
});

//show route
app.get("/user",(req,res)=>{
    let q ="select * from user";
    try{
        connection.query(q,(err,result)=>{
            if (err) throw err;
            let data=result;
            res.render('user.ejs',{data});
        });
    }catch(err){
        res.send('some error');
    }
});

//update route
app.get("/user/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q =`select * from user where id='${id}'`;
    connection.query(q,(err,result)=>{
        if(err) throw err;
        let data=result[0];
        
        res.render("edit.ejs",{data});
    });
});

app.patch("/user/:id",(req,res)=>{
    let {id}=req.params;
    
    let{username:formusername,password:formpassword}=req.body;
    let q = `select * from user where id='${id}'`;
    connection.query(q,(err,result)=>{
        if(err) throw err;
        let data =result[0];
        if(formpassword!=data.password){
            res.send("Wrong Password");
        }
        else{
            let q2=`update user set username='${formusername}' where id='${id}'`;
            connection.query(q2,(err,result)=>{
                if(err) throw err;
                res.redirect("/user")
            });
        }
    })
})

//delete route
app.get("/user/:id/delete",(req,res)=>{
    let {id}=req.params;
    let q =`select * from user where id='${id}'`;
    connection.query(q,(err,result)=>{
        if(err) throw err;
        let data=result[0];
        
        res.render("delete.ejs",{data});
    });
});

app.delete("/user/:id",(req,res)=>{
    let {id}=req.params;
    
    let{username:formusername,password:formpassword}=req.body;
    let q = `select * from user where id='${id}'`;
    connection.query(q,(err,result)=>{
        if(err) throw err;
        let data =result[0];
        if((formpassword!=data.password) || (formusername!=data.username)){
            res.send("Wrong Password and Username combination");
        }
        else{
            let q2=`delete from user where id='${id}'`;
            connection.query(q2,(err,result)=>{
                if(err) throw err;
                res.redirect("/user")
            });
        }
    })
})

//create user
app.get("/user/add",(req,res)=>{
    res.render("create.ejs");
})


app.post("/user/add",(req,res)=>{
    
    let{username,email,password}=req.body;
    let q=`select * from user where username='${username}' or email='${email}'` ;
    connection.query(q,(err,result)=>{
        if(result.length>0){
            res.send("user already exists");
        }
        else{
            let id= uuidv4();
            let users=[id,username,email,password];
            let q2 =`insert into user(id,username,email,password) values(?,?,?,?)`;
            connection.query(q2,users,(err,result)=>{
                res.redirect("/user");
            })
        }
    })

})

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});


// connection.end();