const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const gamesRouter = require('./routes/games');
const coversRouter = require('./routes/covers');
const collectionsRouter = require('./routes/collections');
     
      
    
const app = express();     
app.use(cors());         
// app.use(bod yParser.urlencoded({extended: false})); 
app.use(express.json());  
     

 
app.use('/games', gamesRouter); 
app.use('/collections', collectionsRouter);
app.use('/covers', coversRouter);
  
app.get('/', (req, res)=>{
    console.log('we are listening on shit');
})
 
// app.listen(process.env.PORT || 8888, ()=> {
app.listen(8888, () =>{
    console.log('howdy we are on ' + 8888);
});
  