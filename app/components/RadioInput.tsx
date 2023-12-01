import { useState } from "react";

interface RadioInputProps {
  id: string;
  name: string;
  label: string;
  value: number;
  setter: (value: number) => void;
  maxValue?: number;
}

interface StarProps {
  enabled: boolean;
  onClick: () => void;
}

const Star = ({ enabled, onClick }: StarProps) => {
  return (
    <span
      className={`px-3 text-2xl ${enabled ? "text-[#386641]" : ""}`}
      onClick={onClick}
    >
      {enabled ? "★" : "☆"}
    </span>
  );
};

const RadioInput = ({
  id,
  name,
  label,
  value,
  setter,
  maxValue = 5,
}: RadioInputProps) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      <div className="flex">
        {Array.from(Array(maxValue).keys()).map((i) => (
          <Star
            key={`key-${name}-${i}`}
            enabled={value >= i + 1}
            onClick={() => setter(i + 1)}
          />
        ))}
      </div>
    </fieldset>
  );
};

export default RadioInput;
