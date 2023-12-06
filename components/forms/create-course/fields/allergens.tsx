import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

export default function AllergensField({ form, allergens }: { form: any; allergens: string[] }) {
	return (
		<FormField
			name="allergens"
			control={form.control}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Course Allergens</FormLabel>
					{allergens.map((allergen: any) => (
						<FormField
							key={allergen.uuid}
							control={form.control}
							name="allergens"
							render={({ field }) => {
								return (
									<FormItem
										key={allergen.uuid}
										className="flex flex-row items-start space-x-3 space-y-0"
									>
										<FormControl>
											<Checkbox
												checked={field.value?.includes(allergen.uuid)}
												onCheckedChange={(checked) => {
													return checked
														? field.onChange([
																...field.value,
																allergen.uuid
														  ])
														: field.onChange(
																field.value?.filter(
																	(value: string) =>
																		value !== allergen.uuid
																)
														  );
												}}
											/>
										</FormControl>
										<FormLabel className="font-normal">
											{allergen.name}
										</FormLabel>
									</FormItem>
								);
							}}
						/>
					))}
					<FormDescription>This is the list of allergens in the course.</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
