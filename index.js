const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb');const { ObjectID } = require('bson');
require('dotenv').config()
require('dotenv').config()


const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json());

// uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y6afp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        console.log('database connected!! Enjoy Your developer life with Database!!!!!!!');

         //  database and collection
        const database = client.db('tourism-organization');
        const serviceCollection = database.collection('services');

      
         //Get services Api
         app.get('/services', async(req, res) => {
            const cursor  = serviceCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })

        //GET single service
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting single service', id);
            const  query = { _id: ObjectID(id) };
            const service = await serviceCollection.findOne(query);
            res.json(service);
        })


        // POST API
        app.post('/services', async (req, res) => {
             
           const service = req.body;
            console.log('hit the post api', service);

             const result = await serviceCollection.insertOne(service);
             console.log(result);
             res.json(result)
            
        });

        
       
    }
    finally {
        // await client.close()
    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World! Welcome to travel life. Enjoy the moment!!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
