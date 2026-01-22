import React, { ReactNode } from "react";

type Placement = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  text: string;
  placement?: Placement;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  placement = "top",
  children,
}) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2",
    bottom: "bottom-full left-1/2 -translate-x-1/2",
    left: "left-full top-1/2 -translate-y-1/2",
    right: "right-full top-1/2 -translate-y-1/2",
  };

  return (
    <div className="tooltip-container">
      {children}

      <div className={`tooltip-content ${positionClasses[placement]}`}>
        {text}
        <div className={`tooltip-arrow ${arrowClasses[placement]}`} />
      </div>
    </div>
  );
};

export default Tooltip;

