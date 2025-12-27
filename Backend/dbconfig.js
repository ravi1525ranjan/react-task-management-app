import { MongoClient } from 'mongodb';


const url = "mongodb+srv://ravi1512ranjan_db_user:Qz0Cv4gklvCHMJzo@cluster0.a14urji.mongodb.net/?appName=Cluster0";
const dbName = 'task-management';
export const collectionName = 'task-list';
export const anotherCollection = 'users';


const client = new MongoClient(url);

export async function connectDB() {
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    const db = client.db(dbName);
    return db;
}
