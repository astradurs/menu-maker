'use client';
import { Button } from '@/components/ui/button';
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';

export default function CourseTranslationsField({
	form,
	courseTranslations,
	languages
}: {
	form: any;
	courseTranslations: {
		languageId: string;
		title: string;
		description: string;
	}[];
	languages: {
		uuid: string;
		name: string;
		localeId: string;
	}[];
}) {
	if (courseTranslations.length === 0) {
		return (
			<LanguageSelect
				languages={languages}
				courseTranslations={courseTranslations}
				form={form}
			/>
		);
	}

	return (
		<div className="grid gap-2">
			<LanguageSelect
				languages={languages}
				courseTranslations={courseTranslations}
				form={form}
			/>
			{courseTranslations.map((translation, index) => (
				<div key={index} className="border-2 p-4 rounded-md">
					<div className="flex gap-2 items-center">
						<div className="font-bold text-lg">
							{
								languages.find(
									(language) => language.uuid === translation.languageId
								)?.name
							}
						</div>
						<Button
							typeof="button"
							variant="destructive"
							onClick={() => {
								const values = form.getValues().courseTranslations;
								values.splice(index, 1);
								form.setValue('courseTranslations', values);
							}}
						>
							Remove
						</Button>
					</div>
					<FormField
						name={`courseTranslations[${index}].title`}
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
					<FormField
						name={`courseTranslations[${index}].description`}
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
				</div>
			))}
		</div>
	);
}

function LanguageSelect({
	languages,
	courseTranslations,
	form
}: {
	languages: {
		uuid: string;
		name: string;
		localeId: string;
	}[];
	courseTranslations: {
		languageId: string;
		title: string;
		description: string;
	}[];
	form: any;
}) {
	const [selectedLanguageId, setSelectedLanguageId] = useState(undefined as string | undefined);

	return (
		<div className="flex gap-2">
			<Select
				defaultValue={selectedLanguageId}
				onValueChange={(languageId) => {
					setSelectedLanguageId(languageId);
				}}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select a language" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{languages.map((language) => (
							<SelectItem key={language.uuid} value={language.uuid}>
								{language.localeId}: {language.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Button
				disabled={selectedLanguageId === undefined}
				typeof="button"
				variant="outline"
				onClick={() => {
					if (selectedLanguageId === undefined) {
						return;
					}
					const languageIsAlreadyAdded = courseTranslations.find(
						(translation) => translation.languageId === selectedLanguageId
					);
					if (languageIsAlreadyAdded) {
						return;
					}
					form.setValue('courseTranslations', [
						...courseTranslations,
						{
							languageId: selectedLanguageId,
							title: '',
							description: ''
						}
					]);
				}}
			>
				Add Translation
			</Button>
		</div>
	);
}
