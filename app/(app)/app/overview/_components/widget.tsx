import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}
const Widget: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="bg-card rounded-lg border w-full space-y-4 p-4">
        {children}
      </div>
    </div>
  );
};

export default Widget;
