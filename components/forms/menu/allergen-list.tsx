import { Checkbox } from '@/components/ui/checkbox';

export function AllergenList({ allergens }: { form: any; allergens: string[] }) {
	return (
		<>
			<p>Course Allergens</p>
			{allergens.map((allergen: any) => (
				<div className="grid grid-cols-3 grid-rows-4 gap-1 w-1/3">
					<div className="flex items-center">
						<Checkbox />
						<p className="font-normal text-sm ml-1.5 text-muted-foreground">
							{allergen.name}
						</p>
					</div>
				</div>
			))}
		</>
	);
}
