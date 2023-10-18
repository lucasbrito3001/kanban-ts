export default function SignLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className={`container mx-auto p-5 md:p-0`}>{children}</div>;
}
