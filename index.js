const express = require('express')
const cors = require('cors')
const moongoose = require('mongoose')
const app = express()
const port = 3001
const Students = require('./schema/Students');

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
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



// Tìm sinh viên theo tên
app.get('/find_by_name', async (req, res) => {
    const name = req.query.name;
    try {
        const students = await Students.find({
            Name: { $regex: name, $options: "i" }
        });
        res.json(students);
    } catch (err) {
        console.error('Lỗi khi tìm kiếm sinh viên:', err);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Tìm sinh viên theo địa chỉ
app.get('/find_by_address', async (req, res) => {
    const address = req.query.address;
    try {
        const students = await Students.find({
            Address: { $regex: address, $options: "i" }
        });
        res.json(students);
    } catch (err) {
        console.error('Lỗi khi tìm kiếm địa chỉ:', err);
        res.status(500).json({ error: 'Lỗi server' });
    }
});

// Thêm sinh viên mới
app.post('/add', async (req, res) => {
    try {
        const student = new Students({
            StudentId: req.body.StudentId,
            Name: req.body.Name,
            Birthday: req.body.Birthday,
            Address: req.body.Address
        });

        const savedStudent = await student.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        console.error('Lỗi khi thêm sinh viên:', err);
        res.status(500).json({ error: 'Không thể thêm sinh viên' });
    }
});


