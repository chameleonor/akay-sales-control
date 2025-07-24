import { Router } from 'express';
import pedidosRoutes from './routes/pedidos.ts';
import estoqueRoutes from './routes/estoque.ts';
import receitasRoutes from './routes/receitas.ts';

const router = Router();

router.use('/api', pedidosRoutes);
router.use('/api', estoqueRoutes);
router.use('/api', receitasRoutes);

export default router;
