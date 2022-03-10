require('dotenv').config()
const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors'); 
const app = express()
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 4000

const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9yfqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const database = client.db("CabinetPlant");
      const plantsCollection = database.collection("plants");
     const orderCollection = database.collection('orders')
      //   get operation 
    app.get('/products', async(req, res)=>{
        const category = req.query.category ;
        let query = {}
        if(category){
          query={category:category}
          const plants = plantsCollection.find(query)
          const result = await plants.toArray()
          res.json(result)
        }else{
          const plants = plantsCollection.find(query)
          const result = await plants.toArray()
          res.json(result)
        }
       
    })
    app.get('/products/:id', async(req, res)=>{
        const id = req.params.id;
        console.log(id)
        const query = {_id:ObjectId(id)}
        const result = await plantsCollection.findOne(query) 
        res.json(result)
    })

    app.get('/orders',async(req, res)=>{ 
      const  email = req.query.email;
      let query={}
      if(email){
        query={email:email}
        const orders = orderCollection.find(query);
        const result = await orders.toArray()
        res.json(result)
      }
      else{
        const orders = orderCollection.find(query);
        const result = await orders.toArray()
        res.json(result)
      }
     
    })

    // post operation 

    app.post('/purchase', async(req,res)=>{
      const  orderInfo = req.body;
       const result = await orderCollection.insertOne(orderInfo)
       res.send(result)
       console.log(result)

    })

    // delete operation 

    app.delete('/orders/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id:ObjectId(id)}
      const result= await orderCollection.deleteOne({})
      res.json(result)
      console.log(result)
    })
    app.delete('/products/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id:ObjectId(id)}
      const result= await orderCollection.deleteOne({})
      res.json(result)
      console.log(result)
    })
     
    
       
     
    
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello from cabinet plant!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})