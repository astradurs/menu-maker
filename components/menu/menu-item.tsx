'use client';
import { Input, InputProps } from '@/components/ui/input';
import { Textarea, TextareaProps } from '@/components/ui/textarea';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const MenuItemFormSchema = z.object({
	uuid: z.string(),
	weekday_number: z.number(),
	menu_item_title: z.string(),
	menu_item_description: z.string()
});

export type MenuItemType = {
	uuid: string;
	weekday_number: number;
	menu_item_title: string;
	menu_item_description: string;
};

export function MenuItem({
	weekday_number,
	menu_item,
	menu_items,
	setMenuItems
}: {
	weekday_number: number;
	menu_item: MenuItemType;
	menu_items: MenuItemType[];
	setMenuItems: (menu_items: MenuItemType[]) => void;
}) {
	const [isEditing, setIsEditing] = useState(true);

	return (
		<div className="flex border items-center justify-center p-1 rounded-md">
			<div className="flex flex-col p-1">
				{isEditing ? (
					<MenuItemForm
						weekday_number={weekday_number}
						menu_item={menu_item}
						setIsEditing={setIsEditing}
						menu_items={menu_items}
						setMenuItems={setMenuItems}
					/>
				) : (
					<MenuItemDisplay
						menu_item={menu_item}
						setIsEditing={setIsEditing}
						menu_items={menu_items}
						setMenuItems={setMenuItems}
					/>
				)}
			</div>
		</div>
	);
}

function MenuItemDisplay({
	menu_item,
	setIsEditing,
	menu_items,
	setMenuItems
}: {
	menu_item: MenuItemType;
	setIsEditing: (isEditing: boolean) => void;
	menu_items: MenuItemType[];
	setMenuItems: (menu_items: MenuItemType[]) => void;
}) {
	const onDelete = () => {
		const newMenuItems = menu_items.filter((c) => c.uuid !== menu_item.uuid);
		setMenuItems(newMenuItems);
	};
	return (
		<div>
			<h3>{menu_item.menu_item_title}</h3>
			<p>{menu_item.menu_item_description}</p>
			<Button onClick={() => setIsEditing(true)}>Edit</Button>
			<Button variant="destructive" type="button" onClick={onDelete}>
				-
			</Button>
		</div>
	);
}

function MenuItemForm({
	weekday_number,
	menu_item,
	setIsEditing,
	menu_items,
	setMenuItems
}: {
	weekday_number: number;
	menu_item: MenuItemType;
	setIsEditing: (isEditing: boolean) => void;
	menu_items: MenuItemType[];
	setMenuItems: (menu_items: MenuItemType[]) => void;
}) {
	const form = useForm<z.infer<typeof MenuItemFormSchema>>({
		resolver: zodResolver(MenuItemFormSchema),
		defaultValues: {
			uuid: menu_item.uuid,
			weekday_number: menu_item.weekday_number,
			menu_item_title: menu_item.menu_item_title,
			menu_item_description: menu_item.menu_item_description
		}
	});

	const onSubmit = (values: z.infer<typeof MenuItemFormSchema>) => {
		console.log('menu_item value', values);
		console.log('old menu_items', menu_items);
		const newMenuItems = menu_items.map((c) => {
			if (c.uuid === values.uuid) {
				return {
					...c,
					...values
				};
			}
			return c;
		});
		setMenuItems(newMenuItems);
		setIsEditing(false);
		console.log('new menu_items', newMenuItems);
	};

	const onDelete = () => {
		const newMenuItems = menu_items.filter((c) => c.uuid !== menu_item.uuid);
		setMenuItems(newMenuItems);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="menu_item_title"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>Menu item title</FormLabel>
								<FormControl>
									<Input placeholder="title" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="menu_item_description"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>Menu item description</FormLabel>
								<FormControl>
									<Textarea placeholder="description" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>

				<Button type="submit">+</Button>
				<Button variant="destructive" type="button" onClick={onDelete}>
					-
				</Button>
			</form>
		</Form>
	);
}
