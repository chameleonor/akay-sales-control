import express from 'express';
import cors from 'cors';
import router from './router.ts';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
