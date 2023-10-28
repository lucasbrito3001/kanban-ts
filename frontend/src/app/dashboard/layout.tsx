import Navbar from "@/components/navbar";

export default function SignLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={`w-screen`}>
			<Navbar></Navbar>
			{children}
		</div>
	);
}
