import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/button";
import { ITask } from "../selectable-tasks/data";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  task: ITask;
  onClickRemove: (taskId: ITask) => void;
}

export const SelectedTask: React.FC<Props> = ({
  task,
  onClickRemove,
  className,
  ...props
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    isOver,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      task,
      taskType: "selected",
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "p-4 border rounded-md flex gap-x-4",
        (isDragging || isOver) && "bg-muted text-muted-foreground",
        className,
      )}
      {...props}
    >
      <Button
        ref={setActivatorNodeRef}
        variant={"secondary"}
        className="w-6 h-8 px-1 rounded-md"
        {...attributes}
        {...listeners}
      >
        <GripVerticalIcon className="w-4 h-4" />
      </Button>

      <div className="flex-grow">
        <h3 className="text-base font-semibold">{task.name}</h3>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </div>

      <Button
        onClick={() => onClickRemove(task)}
        variant={"secondary"}
        className="w-8 h-8 px-2 rounded-md"
      >
        <Trash2Icon className="w-4 h-4" />
      </Button>
    </div>
  );
};
