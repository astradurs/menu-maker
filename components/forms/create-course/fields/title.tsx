import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function TitleField({ form }: { form: any }) {
	return (
		<FormField
			name="title"
			control={form.control}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Course Name</FormLabel>
					<FormControl>
						<Input placeholder="Input the course name" {...field} />
					</FormControl>
					<FormDescription>This is the name of the course.</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
