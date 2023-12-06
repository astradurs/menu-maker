'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

export function DragNDrop() {
	const onDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return; // Do nothing if there is no valid destination
		}

		const { source, destination } = result;

		if (source.droppableId === destination.droppableId && source.index === destination.index) {
			return; // Do nothing if the item was dropped in the same position
		}

		// Perform your desired logic based on the valid drag and drop operation
		console.log(
			`Item ${result.draggableId} was dropped into ${result.destination.droppableId}`
		);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="grid grid-cols-2">
				{/* Left side - scrollable list */}
				<div className="overflow-y-auto">
					{/* Render your list of draggable items */}
					{/* Example: */}
					<Draggable draggableId="item1" index={0}>
						{(provided) => (
							<div
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								ref={provided.innerRef}
							>
								Item 1
							</div>
						)}
					</Draggable>

					{/* More items... */}
				</div>

				{/* Right side - menu */}
				<div className="grid grid-cols-5 gap-4">
					{/* Example: Render the Droppable areas */}
					<Droppable droppableId="monday">
						{(provided) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className="bg-gray-300 p-4"
							>
								{/* Render Monday's slot */}
								{provided.placeholder}
							</div>
						)}
					</Droppable>

					{/* Render other Droppable areas for the remaining days */}

					{/* Tuesday */}

					{/* Wednesday */}

					{/* Thursday */}

					{/* Friday */}
				</div>
			</div>
		</DragDropContext>
	);
}
