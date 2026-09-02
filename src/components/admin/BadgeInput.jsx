"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";

export default function BadgeInput({
  badges = [],
  onChange,
  placeholder = "Type & press Enter or comma...",
  suggestions = [],
  label,
  helperText,
}) {
  const [inputVal, setInputVal] = useState("");

  const addBadge = (val) => {
    const trimmed = (val || inputVal).trim().replace(/^,+|,+$/g, "");
    if (!trimmed) return;
    
    // Split by comma if pasted multiple
    const items = trimmed
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !badges.includes(s));

    if (items.length > 0) {
      onChange([...badges, ...items]);
    }
    setInputVal("");
  };

  const removeBadge = (indexToRemove) => {
    onChange(badges.filter((_, idx) => idx !== indexToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addBadge();
    } else if (e.key === "Backspace" && !inputVal && badges.length > 0) {
      removeBadge(badges.length - 1);
    }
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-[10px] uppercase tracking-wider text-neutral-600 font-medium">
            {label}
          </label>
          <span className="text-[10px] text-neutral-400 font-normal">
            {badges.length} items
          </span>
        </div>
      )}

      <div className="min-h-[42px] p-1.5 bg-white border border-neutral-300 focus-within:border-black rounded-none flex flex-wrap items-center gap-1.5 transition-colors">
        {badges.map((badge, idx) => (
          <span
            key={`${badge}-${idx}`}
            className="inline-flex items-center gap-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800 text-[11px] px-2 py-0.5 rounded-none font-medium transition-colors"
          >
            <span>{badge}</span>
            <button
              type="button"
              onClick={() => removeBadge(idx)}
              className="text-neutral-400 hover:text-red-600 p-0.5 cursor-pointer rounded-none"
              title="Remove keyword"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        <div className="flex-1 min-w-[120px] flex items-center">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => addBadge()}
            placeholder={badges.length === 0 ? placeholder : "+ Add more..."}
            className="w-full text-xs bg-transparent border-none outline-none font-normal text-black placeholder-neutral-400 px-1 py-1"
          />
          {inputVal.trim() && (
            <button
              type="button"
              onClick={() => addBadge()}
              className="px-2 py-0.5 text-[10px] bg-black text-white rounded-none cursor-pointer hover:bg-neutral-800 shrink-0 font-medium"
            >
              Add
            </button>
          )}
        </div>
      </div>

      {helperText && (
        <p className="text-[10px] text-neutral-500 font-normal">{helperText}</p>
      )}

      {suggestions && suggestions.length > 0 && (
        <div className="pt-1">
          <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-medium block mb-1">
            Quick suggestions:
          </span>
          <div className="flex flex-wrap gap-1">
            {suggestions
              .filter((s) => !badges.includes(s))
              .slice(0, 8)
              .map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => addBadge(s)}
                  className="inline-flex items-center gap-1 text-[10px] bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 hover:border-neutral-400 text-neutral-600 px-1.5 py-0.5 rounded-none cursor-pointer transition-colors"
                >
                  <Plus className="w-2.5 h-2.5" />
                  <span>{s}</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
