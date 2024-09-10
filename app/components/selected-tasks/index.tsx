import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { ITask } from "../selectable-tasks/data";
import { SelectedTask } from "./selected-task";

interface Props {
  tasks: ITask[];
  onClickRemove: (taskId: ITask) => void;
}

export const SelectedTasks: React.FC<Props> = ({ tasks, onClickRemove }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "tasks-droppable-area",
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "w-8/12 border-r flex flex-col p-4 space-y-4 overflow-y-auto",
        isOver && "bg-muted",
        !tasks.length && !isOver ? "items-center justify-center" : "",
      )}
    >
      {!tasks.length && !isOver && (
        <p className="p-4 text-muted-foreground">Drop tasks here...</p>
      )}
      {tasks.map((task) => {
        return (
          <SelectedTask
            key={task.id}
            task={task}
            onClickRemove={onClickRemove}
          />
        );
      })}
    </div>
  );
};
