import React, {useState} from "react";

function AttributeSlider({attribute, dispatch}) {
    let { type, name } = attribute
    // console.log(attribute)
    const [slider, setSlider] = useState(0.50);

    const handleSliderVal = (e) => {
        setSlider(e.target.value);

        dispatch({
          type: type,
          name: name,
          value: slider
        });
    }

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
          <p className="text-base">{slider}</p>
        </div>
      </div>
    );
}

export default AttributeSlider;

