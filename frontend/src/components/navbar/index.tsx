import { FaBell, FaUser } from "react-icons/fa";
import Logo from "../logo";

export default function Navbar({
	children,
	height,
}: {
	children: React.ReactNode;
	height?: string;
}) {
	return (
		<nav
			className={`${
				height && `h-[${height}]`
			} fixed w-full top-0 z-50 bg-white px-4 py-3 border-b`}
		>
			<div className="flex justify-between items-center">
				<a className="navbar-brand" href="#">
					<Logo></Logo>
				</a>
				<div className="flex items-center gap-x-8">{children}</div>
			</div>
		</nav>
	);
}
