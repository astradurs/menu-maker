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
		<div className="grid grid-cols-12 gap-4">
			<div className="col-span-7">{create}</div>
			<div className="col-span-5">{list}</div>
		</div>
	);
}
