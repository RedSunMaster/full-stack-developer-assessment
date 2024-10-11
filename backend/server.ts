import express from 'express';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 7777;

app.use(cors());
app.use(express.json());


// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Use schooldocs routes
require("./routes/schooldocs.routes")(app);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});