import React from "react";

// Step 1: Define the props interface
interface ToggleSwitchProps {
  isOn: boolean; // Type for isOn prop
  setIsOn: (value: boolean) => void; // Type for setIsOn prop
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, setIsOn }) => {
  return (
    <div
      className={`relative inline-flex h-14 w-60 items-center rounded-full cursor-pointer transition-colors duration-300 bg-black `}
      onClick={() => setIsOn(!isOn)} // Use setIsOn to toggle the state
    >
      <div
        className={`absolute left-2 top-2 h-10 w-28 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-28" : "translate-x-0"
        }`}
      />
      <div className="z-10 grid-cols-2 grid w-full  text-black text-lg font-semibold font-mono ">
        <p
          style={{
            color: `${isOn ? "White" : "Black"}`,
            transition: "color 0.5s",
          }}
        >
          Score
        </p>
        <p
          style={{
            color: `${!isOn ? "White" : "Black"}`,
            transition: "color 0.25s",
          }}
        >
          Summary
        </p>
      </div>
    </div>
  );
};

export default ToggleSwitch;
