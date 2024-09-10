import React from "react";
import { cn } from "@/lib/utils";
import { ITask } from "../selectable-tasks/data";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  task: ITask;
}

export const DraggingTask: React.FC<Props> = ({
  task,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "m-4 p-4 border rounded-md cursor-move w-full bg-white",
        className,
      )}
      {...props}
    >
      <h3 className="text-base font-semibold">{task.name}</h3>
      <p className="text-sm text-muted-foreground">{task.description}</p>
    </div>
  );
};
