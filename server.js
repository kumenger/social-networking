const express = require('express');
const db = require('./config/connection');
const userRouter = require('./routes/userRoutes');
const toughtRouter=require('./routes/thoughtRoutes')
const reactionRoutes=require('./routes/reactionRoutes')


const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/user',userRouter);
app.use('/api/thoughts',toughtRouter);
app.use('/api/user',userRouter);
app.use('/api/reaction',reactionRoutes);
db.once('open', () => {
console.log("Database Connected")
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}!`);
  });
});
