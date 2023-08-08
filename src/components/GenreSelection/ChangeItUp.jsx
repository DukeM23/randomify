import { useState } from "react";
import AttributeSlider from "./AttributeSlider";

export default function ChangeItUp({ state, dispatch }) {
  const [show, setShow] = useState(false);
  return (
    <div className="sticky top-10 sm:hidden m-8 overflow-hidden bg-emerald-600 border-emerald-500 border-2 rounded-2xl">
      <div className="group outline-none accordion-section">
        <div
          className="group  text-gray-900 transition ease duration-500 cursor-pointer relative"
          onClick={() => {
            setShow(!show);
          }}
        >
          <div className=" text-gray-900 text-center transition ease duration-1000">
            <button type="button" className="my-3 text-2xl font-bold">
              Change it up!
            </button>
          </div>
        </div>
        <div
          className={`${
            show ? "max-h-screen" : "max-h-0"
          } px-4 overflow-hidden ease duration-1000`}
        >
          <div className="text-gray-900 block sm:hidden overflow-hidden transition 1s ease-out">
            <div className="flex flex-col w-full px-10 gap-y-5 my-8 sm:px-5">
              {state.map((attr, key) => (
                <AttributeSlider
                  key={key}
                  attribute={attr}
                  dispatch={dispatch}
                />
              ))}
              <button
                type="button"
                onClick={() => {
                  setShow(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
