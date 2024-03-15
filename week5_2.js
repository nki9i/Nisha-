const { MongoClient } = require('mongodb');

// Connection URI and Database Name
const uri = 'mongodb://localhost:27017';
const dbName = 'studentDatabase';

// Create a MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Database instance
    const db = client.db(dbName);

    // Define two collections: academic records and co-curricular activities
    const academicRecordsCollection = db.collection('academicRecords');
    const coCurricularActivitiesCollection = db.collection('coCurricularActivities');

    // Define schema for academic records collection
    const academicRecordSchema = {
      studentID: 'String',
      name: 'String',
      grades: {
        math: 'String',
        science: 'String',
        english: 'String',
        // Add more subjects as needed
      },
      // Add other academic information fields
    };

    // Define schema for co-curricular activities collection
    const coCurricularActivitySchema = {
      studentID: 'String',
      name: 'String',
      activityType: 'String',
      duration: 'String',
      achievements: ['String'],
      // Add other co-curricular activity fields
    };

    // Insert sample academic records data
    await academicRecordsCollection.insertMany([
      { studentID: 'S001', name: 'John Doe', grades: { math: 'A', science: 'B', english: 'A' } },
      // Add more academic records as needed
    ]);

    // Insert sample co-curricular activities data
    await coCurricularActivitiesCollection.insertMany([
      {
        studentID: 'S001',
        name: 'John Doe',
        activityType: 'Sports',
        duration: '1 year',
        achievements: ['First place in basketball tournament', 'Participation in swimming competition'],
      },
      // Add more co-curricular activities as needed
    ]);

    // Test CRUD operations by performing read operation
    const academicRecords = await academicRecordsCollection.find({}).toArray();
    console.log('Academic Records:', academicRecords);

    const coCurricularActivities = await coCurricularActivitiesCollection.find({}).toArray();
    console.log('Co-curricular Activities:', coCurricularActivities);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection
    await client.close();
    console.log('Disconnected from MongoDB server');
  }
}

// Run the main function
main();
