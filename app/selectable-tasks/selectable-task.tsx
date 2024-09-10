import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { ITask } from "./data";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  task: ITask;
}

export const SelectableTask: React.FC<Props> = ({
  task,
  className,
  ...props
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id,
    data: {
      task,
      taskType: "selectable",
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn("m-4 p-4 border rounded-md", className)}
      {...props}
      {...attributes}
      {...listeners}
    >
      <div className="flex-grow">
        <h3 className="text-base font-semibold">{task.name}</h3>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </div>
    </div>
  );
};
