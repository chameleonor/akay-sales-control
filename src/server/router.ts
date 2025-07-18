import { Router } from 'express';
import pedidosRoutes from './routes/pedidos.ts';

const router = Router();

router.use('/api', pedidosRoutes);

export default router;
