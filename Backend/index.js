import express from 'express';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import { anotherCollection, connectDB } from './dbConfig.js';
import { collectionName } from './dbConfig.js';
import CORS from 'cors';
import { generateToken, authenticateToken } from './auth.js';
import cookieparser from 'cookie-parser';


const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(CORS(
  { origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true }
))
app.use(cookieparser());



//Mogoose connection
const db =  await connectDB();
const addCollection = collectionName
const usersCollection = anotherCollection

//Login and sgnup routes can be added here

app.post('/signup', async (req, res) => {
  try {
    const userData = req.body;
    const collection = db.collection(usersCollection);
    const result = await collection.insertOne(userData);
    if(result){
      const token = generateToken({ username: userData.email, id: result._id });
      res.status(200).json({ message: 'Signup successful', userId: result._id, token: token });
    }
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } 
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const collection = db.collection(usersCollection);
    const user = await collection.findOne({ email: email, password: password });
    if (user) {
      const token = generateToken({ username: user.email, id: user._id });
      res.status(200).json({ message: 'Login successful', email: user.email, userId: user._id, token: token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
    } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Sample route to insert data into MongoDB
app.post ('/add-task', authenticateToken, async (req, res) => {
  try {
    const data = req.body;
    // const data = {
    //     title: "Getting Job Is Priority",
    //     description: "Trying hard to get job in reputed company in sydney",
    //     status: "pending"
    // }
    const collection = db.collection(addCollection);
    const result = await collection.insertOne(data);
    res.status(201).json({ message: 'Data inserted successfully', id: result.insertedId, status: result.acknowledged });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/tasks', authenticateToken, async (req, res) => {
  try {
    const collection = db.collection(addCollection);
    const tasks = await collection.find({}).toArray();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/task/:id', authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const collection = db.collection(addCollection);
    const task = await collection.findOne({ _id: new mongodb.ObjectId(taskId) });
    if (task) {
      res.status(200).json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
    } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/delete-task/:id', authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const collection = db.collection(addCollection);
    const result = await collection.deleteOne({ _id: new mongodb.ObjectId(taskId) });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } 
});

app.put('/update-task/:id', authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const updateData = req.body;
    const collection = db.collection(addCollection);
    const result = await collection.updateOne({ _id: new mongodb.ObjectId(taskId) }, { $set: updateData });
    if (result.matchedCount === 1) {
      res.status(200).json({ message: 'Task updated successfully' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});