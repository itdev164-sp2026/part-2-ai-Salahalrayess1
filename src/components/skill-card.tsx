import React from "react";
import type { SVGProps } from "react";

type IconComponent = (props: SVGProps<SVGSVGElement>) => React.ReactNode;

export function SkillCard({ icon: Icon, title }: { icon: IconComponent; title: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-sm font-medium leading-none">{title}</h3>
        </div>
      </div>
    </div>
  );
}

export default SkillCard;
