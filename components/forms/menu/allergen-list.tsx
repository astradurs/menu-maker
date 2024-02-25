import { Checkbox } from '@/components/ui/checkbox';

type Allergen = {
	id: number;
	name: string;
};

export function AllergenList({ allergens }: { allergens: Allergen[] }) {
	return (
		<>
			<p>Course Allergens</p>
			{allergens.map((allergen: any) => (
				<div className="">
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
