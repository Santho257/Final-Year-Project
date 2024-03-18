const express = require('express');
const mongoose = require('mongoose');
const dbs = require('./databases');
const bodyParser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8800;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors())

mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Listen to the Port: http://localhost:${PORT}`)
        });
    })
    .catch((err) => {
        console.log("Error Occured: ", err.message);
    });

app.get('/', async (req, res) => {
    try {
        await dbs.Students.deleteMany({});
        await dbs.Users.deleteMany({});
        await dbs.Staffs.deleteMany({});
        await dbs.Students.insertMany([
            { _id: "73772021183", name: "Sanjay V", dob: "16/11/2002", department: "IT", year: 4, mentor: "IT001", coordinator: "ITJN001" },
            { _id: "73772021209", name: "Veera S", dob: "17/10/2002", department: "IT", year: 4, mentor: "IT002", coordinator: "ITJN001" },
            { _id: "73772021204", name: "Tamil S", dob: "15/05/2003", department: "IT", year: 4, mentor: "IT002", coordinator: "ITJN001" },
            { _id: "73772021178", name: "Rubin N T", dob: "24/05/2002", department: "IT", year: 4, mentor: "IT001", coordinator: "ITJN001" },
        ]);
        await dbs.Staffs.insertMany([
            { _id: "ITJN001", department: "IT", name: "Staff1" },
            { _id: "ITJN002", department: "IT", name: "Staff2" },
        ]);
        const stuUserArray = (await dbs.Students.find({})).map((stu) => {
            return { _id: stu.id, password: stu.dob, role: "student", profile: { name: stu.name } }
        });

        await dbs.Users.insertMany(stuUserArray);
        await dbs.Users.insertMany([
            { _id: "ITJN002", password: "mentor", role: "mentor", profile: { name: "itjn002" } },
            { _id: "ITJN001", password: "coordinator", role: "coordinator", profile: { name: "itjn001" } }
        ]);
    }
    catch (err) {
        console.log(err.message);
    }
    const users = await dbs.Users.find({});
    res.send(users);
})

app.post('/api/login', (req, res) => {
    console.count("Triggered Count: ")
    const { regNo, password } = req.body;
    dbs.Users.findOne({ _id: regNo, password: password }).then((user, err) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        res.json({ user });
    });
});

app.get('/actions/role=:role', async (req, res) => {
    console.count("Triggered: ")
    const role = req.params.role;
    console.log(role)
    const actions = await dbs.Roles.findOne({ _id: role });
    res.send(actions.actions);
});

app.post('/assigntask', async (req, res) => {
    console.count("Assign Task")
    const { name, desc, user } = req.body;
    try {
        const insertedTasks = await dbs.Tasks.insertMany([{ title: name, description: desc, assignedBy: user }]);
        await dbs.Students.updateMany({ coordinator: user }, { $push: { tasks: insertedTasks[0]._id } });
        res.send({ status: "Inserted!!" })
    }
    catch (err) {
        res.status(501).send({ status: "Error!!" });
    }
});

app.get('/staffs', async (req, res) => {
    res.send(await dbs.Staffs.find({}));
});

app.get('/students', async (req, res) => {
    res.send(await dbs.Students.find({}));
});

app.post('/createBatch', async (req, res) => {
    console.log("Working")
    try {
        const { name, mentor, students } = req.body;
        const batchId = await dbs.Batches.insertMany([
            { name, active: true }
        ])._id;
        await dbs.Students.updateMany({ _id: { $in: students } }, { batch: batchId });
        await dbs.Staffs.updateOne({ _id: mentor }, { $push: { batches: batchId } });
        res.send({status: "Created"});
    }
    catch(err){
        console.log(err.message)
        res.status(502).send({status: "Error"})
    }
});