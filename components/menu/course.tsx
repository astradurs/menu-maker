'use client';

export function Course({ day }: { day: string }) {
	return (
		<div>
			<div className="relative flex border items-center justify-center p-1 rounded-md h-44 w-72">
				<div className="flex flex-col p-1">
					<p>Restaurant!!</p>
					<p>Short Description</p>
					<p>Description</p>
				</div>
			</div>
		</div>
	);
}
