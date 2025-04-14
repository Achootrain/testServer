const express = require('express')
const cors = require('cors')
const moongoose = require('mongoose')
const app = express()
const port = 3001

app.use(cors())

const queryString = process.env.MONGODB_URI || "mongodb+srv://dobalam:dobalam-it4409@it4409-cluster.qopfxuo.mongodb.net/it4409-db?retryWrites=true&w=majority&appName=it4409-cluster";

moongoose.connect(queryString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!')
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
