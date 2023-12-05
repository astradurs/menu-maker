export default function CoursesLayout({
	children,
	create,
	list
}: {
	children: React.ReactNode;
	create: React.ReactNode;
	list: React.ReactNode;
}) {
	return (
		<div className="grid grid-cols-12 gap-4 p-4">
			<div className="col-span-7 border-2 rounded-md">{create}</div>
			<div className="col-span-5 border-2 rounded-md">{list}</div>
		</div>
	);
}
