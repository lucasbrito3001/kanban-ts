import Navbar from "@/components/navbar";
import { FaBell, FaUser } from "react-icons/fa";

export default function SignLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={`w-screen`}>
			<Navbar>
				<button className="rounded p-2 bg-sky-600 hover:bg-sky-700 transition-all transition-500 text-white font-bold text-sm">
					Create board
				</button>
				<FaBell></FaBell>
				<FaUser></FaUser>
			</Navbar>
			{children}
		</div>
	);
}
