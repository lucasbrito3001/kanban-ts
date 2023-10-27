export default function SignLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div
			className={`bg-gray-100 p-4 md:p-0 grid place-items-center h-screen w-screen`}
		>
			{children}
		</div>
	);
}
