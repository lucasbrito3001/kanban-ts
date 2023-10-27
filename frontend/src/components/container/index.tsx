export default function Container({ children }: { children: React.ReactNode }) {
	return <div className="container max-w-screen-lg mx-auto px-4">{children}</div>;
}
