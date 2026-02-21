import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonMenuItem {
  label: string;
  icon: React.ReactNode;
  onSelect: () => void;
}

export interface ButtonMenuProps {
  /** Label shown on the trigger button (e.g. "View") */
  label: string;
  /** Optional icon shown to the left of the label on the trigger button */
  icon?: React.ReactNode;
  /** Submenu items: label, icon, and onSelect handler */
  items: ButtonMenuItem[];
  /** Optional class name for the trigger button */
  className?: string;
  /** Button size - matches Presentation button when "sm" */
  size?: "default" | "sm" | "lg" | "icon";
}

/**
 * A dropdown trigger that looks like the Presentation (super3d) button
 * with a down/up arrow. Arrow points up when the submenu is open.
 * Submenu uses theme-aware popover styles.
 */
export function ButtonMenu({
  label,
  icon,
  items,
  className,
  size = "sm",
}: ButtonMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerIcon = icon ?? <Eye className="h-3.5 w-3.5" />;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="super3d"
          size={size}
          className={cn(
            "text-xs h-7 px-2 flex items-center gap-1.5",
            className
          )}
        >
          {triggerIcon}
          {label}
          {open ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        sideOffset={6}
        className="min-w-[8rem]"
      >
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onSelect={() => {
              item.onSelect();
              setOpen(false);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            {item.icon}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
