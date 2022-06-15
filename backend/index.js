const connectToMongo = require('./db');

const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello World hiiiiiii!')
// })


//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/habouts',require('./routes/habouts'))
app.use('/api/hapros',require('./routes/hapros'))
app.use('/api/hcourses',require('./routes/hcourses'))



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})