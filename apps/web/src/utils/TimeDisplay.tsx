import { useState, useEffect } from "react";

const TimeDisplay = ({ time }: {time: Date}) => {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const date = new Date(time);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const formattedHour = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    setFormattedTime(`${formattedDate} ${formattedHour}`);
  }, [time]);

  return (
    <span className="text-sm font-semibold text-black">
      Created at: {formattedTime}
    </span>
  );
};

export default TimeDisplay;
