const express = require('express')
const cors = require('cors')

const app = express()
const port = 3001

app.use(cors())

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!')
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
