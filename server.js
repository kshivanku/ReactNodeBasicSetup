let express = require('express');
let bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, ()=>console.log(`listening on port ${port}`));

app.get('/api/hello', (req, res)=> {
    res.send({
        express: 'Hello from express!'
    })
});

app.post('/api/world', (req, res)=> {
    console.log(req.body);
    res.send(
        `Received your POST request. This is what you sent: ${req.body.post}`
    )
});