interface NavProps {
	name: string;
}
export function Nav({ name }: NavProps) {
	return (
		<nav className="flex flex-wrap items-center justify-between bg-gray-800 p-6">
			<h1 className="flex-1 text-white">Home</h1>
			<div>
				<a
					href="#"
					className="mt-4 inline-block rounded   px-4 py-2 text-sm leading-none text-white hover:border-transparent   lg:mt-0"
				>
					{name}
				</a>
			</div>
		</nav>
	);
}
