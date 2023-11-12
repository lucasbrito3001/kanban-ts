import { FaBell, FaUser } from "react-icons/fa";
import Logo from "../logo";

export default function Navbar({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<nav
			className={`h-[7vh] fixed w-full top-0 z-50 bg-[#fff6] px-4 py-1 shadow`}
		>
			<div className="h-full flex justify-between items-center">
				<a className="navbar-brand" href="#">
					<Logo></Logo>
				</a>
				<div className="flex items-center gap-x-8">{children}</div>
			</div>
		</nav>
	);
}
