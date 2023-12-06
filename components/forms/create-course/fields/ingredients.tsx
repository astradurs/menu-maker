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

export default function IngredientsField({
	form,
	ingredients,
	handleAllergenChangeFromIngredient
}: {
	form: any;
	ingredients: any;
	handleAllergenChangeFromIngredient: Function;
}) {
	return (
		<FormField
			name="ingredients"
			control={form.control}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Course Ingredients</FormLabel>
					{ingredients.map((ingredient: any) => (
						<FormField
							key={ingredient.uuid}
							control={form.control}
							name="ingredients"
							render={({ field }) => {
								return (
									<FormItem
										key={ingredient.uuid}
										className="flex flex-row items-start space-x-3 space-y-0"
									>
										<FormControl>
											<Checkbox
												checked={field.value?.includes(ingredient.uuid)}
												onCheckedChange={(checked) => {
													if (checked) {
														handleAllergenChangeFromIngredient(
															ingredient.uuid
														);
													}
													return checked
														? field.onChange([
																...field.value,
																ingredient.uuid
														  ])
														: field.onChange(
																field.value?.filter(
																	(value: string) =>
																		value !== ingredient.uuid
																)
														  );
												}}
											/>
										</FormControl>
										<FormLabel className="font-normal">
											{ingredient.name}
										</FormLabel>
									</FormItem>
								);
							}}
						/>
					))}
					<FormDescription>
						This is the list of ingredients in the course.
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
