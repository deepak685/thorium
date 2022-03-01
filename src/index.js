const express = require('express');
var bodyParser = require('body-parser');
const {
    default: mongoose
} = require("mongoose")

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Deependra1999:Z1ZWVlMvcAFQsu2u@cluster0.4nkid.mongodb.net/deependraDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("successfull"))
    .catch((err) => console.log(err));


app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
})