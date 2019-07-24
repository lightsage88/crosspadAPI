const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const gamesRouter = require('./routes/games');
const {apiUrl, apiKey} = require('./config');
     
      
    
const app = express();     
app.use(cors());         
// app.use(bod yParser.urlencoded({extended: false})); 
app.use(express.json());  
     

const gameRoute = require('./routes/games');
const collectionsRoutes = require('./routes/collections');
const coversRoutes = require('./routes/covers');
 
app.use('/games', gamesRouter); 
// app.use('/collections', collectionsRoutes);
// app.use('/covers', coversRoutes);
  
app.get('/', (req, res)=>{
    console.log('we are listening on shit');
})
 
app.listen(process.env.PORT || 8888, ()=> {
    console.log('howdy');
});
  