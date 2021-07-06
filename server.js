'use strict';
const express = require('express');
const axios = require('axios');
const cors = require ('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/drink', {useNewUrlParser: true, useUnifiedTopology: true});


const server = express();
require ('dotenv').config();
server.use (cors());
server.use (express.json());

const PORT = process.env.PORT;
const drinkSchema = new mongoose.Schema ({
    strDrink : String ,
    strDrinkThumb : String ,
    idDrink : String ,


});
const drinkModal = mongoose.modal ('drink',drinkSchema )

server.get ('/',(req,res) => {
    res.send ('am in the root rout');
})
 server.get ('/getData' , getDataHandler);
 server.post ('/addToFav' , addToFavHandler);
 server.get ('/getFavData' , grtFavDataHandler);
 server.delete ('/deletFav' , deleteFavHandler);
 server.put ('/updateFav' , updateFavHandler);








 class Drinks {
     constructor (item) {
         this.strDrink = item.strDrink.drinks ;
         this.strDrinkThumb = item.strDrinkThumb.drinks ;
         this.idDrink = item.idDrink.drinks ;
     }
 }
 function getDataHandler(req, res) {
     const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`;
     axios.get(url).then(result => {
         console.log ('done');
         let drinksArr = result.data.map ( item =>{
             return new Drinks(item);
         })
         res.send ( drinksArr);

     })
 }
 function addToFavHandler (req , res ){
     const {strDrink,strDrinkThumb,idDrink} = req.body;
     let newDrink = new drinkModal ({
        strDrink : strDrink ,
        strDrinkThumb : strDrinkThumb ,
        idDrink : idDrink 

     } )
     newDrink.save();

 }
 function  grtFavDataHandler (req , res) {
    drinkModal.find({},(error , data) => {
        res.send (data)
    })
 }
 function deleteFavHandler ( req , res) {
     const id = req.query.id ; 
     drinkModal.deleteOne({_id:id},(err,data) =>{
        drinkModal.find({},(err,data) => {
            res.send (data);
        })

     

   
 })
}
function updateFavHandler (req , res) {
    const {strDrink,strDrinkThumb , idDrink , id} = req.body;
    drinkModal.deleteOne({_id:id},(err,data) =>{
        data[0].strDrink = strDrink ;
        data [0] . strDrinkThumb =  strDrinkThumb ;
        data [0] . idDrink = idDrink ;
        data[0].save()
        .then(() => {
            drinkModal.find({},(err,data) => {
                res.send (data);
            })

        })
        
      
        })
    

}
  


    


server.listen (PORT,() =>{
    console.log (`worked !! ${PORT} `);
})