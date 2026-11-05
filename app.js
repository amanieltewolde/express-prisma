import express from "express"

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('This is the Homepage book'));

app.listen(port, () => console.log('Server Started on http://localhost:' + port));