import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

export default function DescriptionField({ form }: { form: any }) {
	return (
		<FormField
			name="description"
			control={form.control}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Course Description</FormLabel>
					<FormControl>
						<Textarea
							placeholder="Input a long description for the course"
							{...field}
						/>
					</FormControl>
					<FormDescription>
						This is the description that shows up on the menu.
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
