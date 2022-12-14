import mongoose from 'mongoose'

// const connectDB = handler => async (req, res) => {
//     if (mongoose.connections[0].readyState) {
//       // Use current db connection
//       return handler(req, res);
//     }
//     // Use new db connection
//     await mongoose.connect(process.env.mongodburl, {
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true,
//       useNewUrlParser: true
//     })
//     return handler(req, res);
//   };
  
//   export default connectDB;

const connection = {}
async function connectDB(){
        if(connection.isConnected) {return}
        const db= await mongoose.connect(process.env.NEXT_PUBLIC_DATABASE)
        connection.isConnected = db.connections[0].readyState
    
    
}

export default connectDB