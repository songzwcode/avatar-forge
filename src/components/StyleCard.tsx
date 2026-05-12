"use client";

import { GAME_STYLES, type GameStyleId } from "@/lib/styles";
import { clsx } from "clsx";

interface StyleCardProps {
  id: GameStyleId;
  name: string;
  description: string;
  color: string;
  preview: string;
  selected: boolean;
  onClick: () => void;
}

export function StyleCard({
  id,
  name,
  description,
  color,
  preview,
  selected,
  onClick,
}: StyleCardProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "card flex flex-col items-center p-3 w-[120px] shrink-0 transition-all duration-200 cursor-pointer",
        selected && "border-[2px]"
      )}
      style={{
        borderColor: selected ? color : undefined,
        boxShadow: selected ? `0 0 20px ${color}40` : undefined,
      }}
    >
      <div
        className="w-[80px] h-[80px] rounded-lg overflow-hidden mb-2"
        style={{ boxShadow: `0 0 10px ${color}30` }}
      >
        <img
          src={preview}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = `https://via.placeholder.com/80x80/${color.slice(1)}/000000?text=${name}`;
          }}
        />
      </div>
      <span
        className="text-xs font-bold uppercase tracking-wider"
        style={{ color }}
      >
        {name}
      </span>
      <span className="text-[10px] text-[--text-muted] mt-1 text-center leading-tight">
        {description}
      </span>
    </button>
  );
}

export function StylePicker({
  selected,
  onSelect,
}: {
  selected: GameStyleId;
  onSelect: (id: GameStyleId) => void;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 px-1">
      {GAME_STYLES.map((style) => (
        <StyleCard
          key={style.id}
          {...style}
          selected={selected === style.id}
          onClick={() => onSelect(style.id)}
        />
      ))}
    </div>
  );
}
