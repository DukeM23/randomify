import React, {useState} from "react";

function AttributeSlider({attribute, dispatch, attrState}) {
    const [slider, setSlider] = useState(0.50);

    const handleSliderVal = (e) => {
        setSlider(e.target.value);

        dispatch({
          type: "set_accousticness",
          name: "Accousticness",
          value: slider
        });
    }

    return (
      <div className="font-semibold">
        <label className="lg:text-lg" forhtml="danceability">
          {attribute}
        </label>
        <div className="flex justify-between items-center gap-x-2">
          <input
            className="w-10/12 range-lg cursor-pointer accent-gray-900 bg-gray-900"
            id="danceability"
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

