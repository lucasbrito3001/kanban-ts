import { FaBell, FaUser } from "react-icons/fa";
import Logo from "../logo";

export default function Navbar() {
	return (
		<nav className="fixed w-full top-0 z-50 bg-white px-4 py-3 border-b">
			<div className="flex justify-between items-center">
				<a className="navbar-brand" href="#">
					<Logo></Logo>
				</a>
				<div className="flex items-center gap-x-8">
					<button 
                        className="rounded p-2 bg-sky-600 hover:bg-sky-700 transition-all transition-500 text-white font-bold text-sm"
                    >
						Create board
					</button>
					<FaBell></FaBell>
					<FaUser></FaUser>
				</div>
			</div>
		</nav>
	);
}
