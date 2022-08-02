const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

var DB = {
    games:[
        {
            id: 1,
            title:"Call of Duty MW",
            year:2019,
            price:60.45
        },
        {
            id: 2,
            title:"God of War I",
            year:2014,
            price:120.29
        },
        {
            id: 3,
            title:"God of War II",
            year:2016,
            price:150.39
        },

    ]
}

app.get("/games", (req, res)=>{
    res.statusCode = 200;
    res.json(DB.games);
});


app.get("/games/:id", (req, res)=>{

    if(isNaN(req.params.id)){
       
        res.sendStatus(400);
        // res.statusCode = 400;
        // res.json(DB.games);

    }else{

        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);
        
        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
        
        
    }
    
});

app.post("/game", (req, res)=>{
    
    var {id, title, price, year} =  req.body;

    DB.games.push({
        id,
        title,
        price,
        year,
    });

    res.sendStatus(200);

});

app.delete("/game/:id", (req, res)=>{

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);
       
        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index, 1);
            res.sendStatus(200);            
        }
    }

});

// app.delete("/game/:id",(req, res) => {
//     if(isNaN(req.params.id)){
//         res.sendStatus(400);
//     }else{
//         var id = parseInt(req.params.id);
//         var index = DB.games.findIndex(g => g.id == id);

//         if(index == -1){
//             res.sendStatus(404);
//         }else{
//             DB.games.splice(index,1);
//             res.sendStatus(200);
//         }
//     }
// });

app.put("/game/:id", (req,res)=>{
    if(isNaN(req.params.id)){
       
        res.sendStatus(400);

    }else{

        var id = parseInt(req.params.id);
        var game = DB.games.find(g => g.id == id);
        
        if(game != undefined){
            var {title, price, year} =  req.body;

            if(title != undefined){
                game.title = title;
            }
            if(price != undefined){
                game.price = price;
            }
            if(year != undefined){
                game.year = year;
            }

            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
        
        
    }
})

app.listen(4040, ()=>{
    console.log("API RODANDO");
})
