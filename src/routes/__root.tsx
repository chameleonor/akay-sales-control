import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<div className="flex gap-6 px-4 py-3 border-b mb-4 bg-white">
				<Link
					to="/estoque"
					className="relative text-lg text-gray-700 hover:text-blue-600 transition group"
				>
					Estoque
					<span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
				</Link>
				<Link
					to="/receitas"
					className="relative text-lg text-gray-700 hover:text-blue-600 transition group"
				>
					Receitas
					<span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
				</Link>
				<Link
					to="/pedidos"
					className="relative text-lg text-gray-700 hover:text-blue-600 transition group"
				>
					Pedidos
					<span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
				</Link>
			</div>

			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
