const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3000;

//middlewares
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());


// Connection
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@vitrineapicluster.bboug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(()=>{
    console.log("MongoDB conected ;)");
    app.listen(port, ()=>{
        console.info("Application running!")
    });
})
.catch((err)=>{
    console.log(err);
})







// Routes
app.get('/', (req, res)=>{
    return res.json({
        message: "Chamaaaa!"
    })
})

const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);
// Aua0s34nwkJiDpR1
// mongodb+srv://vagnerecomp:<password>@vitrineapicluster.bboug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority