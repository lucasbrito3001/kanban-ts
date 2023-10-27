export default function Logo({ fontSize }: { fontSize?: string }) {
	return (
		<span className={`font-bold ${fontSize || 'text-2xl'}`}>
			Kanban<span className="text-sky-600">AI</span>
		</span>
	);
}
