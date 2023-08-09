import React, { useEffect, useState } from "react";

function AttributeSlider({ attribute, dispatch }) {
  let { type, name, value } = attribute;
  const [slider, setSlider] = useState(value);

  useEffect(() => {
    setSlider(value);
  }, []);

  const handleSliderVal = (e) => {
    setSlider(e.target.value);
    dispatch({
      type: type,
      name: name,
      value: slider,
    });
  };

  return (
    <div className="font-semibold">
      <label className="text-xl sm:text-lg" forhtml={name}>
        {name}
      </label>
      <div className="flex justify-between items-center gap-x-2">
        <input
          className="w-10/12 range-lg cursor-pointer accent-gray-900 bg-gray-900"
          id={name}
          min={0}
          max={1}
          step="0.01"
          type="range"
          value={slider}
          onChange={handleSliderVal}
        />

        <p className="text-base w-9">{slider}</p>
      </div>
    </div>
  );
}

export default AttributeSlider;
