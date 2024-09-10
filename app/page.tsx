"use client";

import { useState } from "react";
import { useIsClient, useLocalStorage } from "usehooks-ts";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { selectableTasks, ITask } from "./components/selectable-tasks/data";
import { SelectableTasks } from "./components/selectable-tasks";
import { SelectedTasks } from "./components/selected-tasks";
import { DraggingTask } from "./components/dragging-task";

export default function Home() {
  const isClient = useIsClient();
  const [workflowName, setWorkflowName] = useLocalStorage<string>(
    "workflowName",
    "",
  );
  const [selectedTasks, setSelectedTasks] = useLocalStorage<ITask[]>(
    "selectedTasks",
    [],
  );
  const [draggingTask, setDraggingTask] = useState<ITask | null>(null);

  const handleDragStart = ({ active }: DragStartEvent) => {
    if (active && active.data.current) {
      const task = active.data.current.task as ITask;
      setDraggingTask(task);
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active) {
      setSelectedTasks((prev) => {
        if (!active.data.current) return prev;
        const task = active.data.current.task as ITask;
        const taskType = active.data.current.taskType as string;
        const updatedTasks = [
          ...prev,
          ...(taskType === "selectable"
            ? [{ ...task, id: `${task.id}__${Date.now()}` }]
            : []),
        ];
        const oldIndex = updatedTasks.findIndex(
          (task) => task.id === active.id,
        );
        const newIndex = updatedTasks.findIndex((task) => task.id === over.id);
        return arrayMove(updatedTasks, oldIndex, newIndex);
      });
    }
    setDraggingTask(null);
  };

  if (!isClient) return null;

  return (
    <main className="max-w-screen-2xl mx-auto p-4">
      <div className="border h-[calc(100vh-2rem)] rounded-md flex flex-col overflow-hidden">
        <div className="p-4 border-b flex justify-between">
          <Input
            className="w-1/2"
            placeholder="Workflow Name"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
          />
          <Button
            className="ml-4"
            variant={"destructive"}
            onClick={() => {
              setWorkflowName("");
              setSelectedTasks([]);
            }}
          >
            Reset
          </Button>
        </div>

        <div className="flex flex-grow overflow-hidden relative">
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            {/* Droppable Components */}
            <SortableContext
              items={selectableTasks}
              strategy={verticalListSortingStrategy}
            >
              <SelectedTasks
                tasks={selectedTasks}
                onClickRemove={(task) => {
                  setSelectedTasks((prev) =>
                    prev.filter((t) => t.id !== task.id),
                  );
                }}
              />
            </SortableContext>

            {/* Draggable Components */}
            <SelectableTasks tasks={selectableTasks} />

            {/* Overlay */}
            <DragOverlay dropAnimation={null}>
              {draggingTask ? <DraggingTask task={draggingTask} /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </main>
  );
}
