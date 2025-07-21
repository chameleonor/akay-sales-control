import { Router } from 'express';
import pedidosRoutes from './routes/pedidos.ts';
import estoqueRoutes from './routes/estoque.ts';

const router = Router();

router.use('/api', pedidosRoutes);
router.use('/api', estoqueRoutes);

export default router;
