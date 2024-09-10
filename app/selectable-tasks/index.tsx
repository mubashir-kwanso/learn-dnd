import React from "react";
import { cn } from "@/lib/utils";
import { SelectableTask } from "./selectable-task";
import { ITask } from "./data";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  tasks: ITask[];
}

export const SelectableTasks: React.FC<Props> = ({
  tasks,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("flex flex-col overflow-hidden w-4/12", className)}
      {...props}
    >
      <h2 className="text-lg font-bold p-4 border-b">Tasks</h2>
      <div className="flex-grow overflow-y-auto">
        {tasks.map((task) => {
          return <SelectableTask key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
};
