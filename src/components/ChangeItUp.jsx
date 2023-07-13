import { useState } from "react"
import AttributeSlider from "./AttributeSlider";

export default function ChangeItUp({ state, dispatch ,attribute }) {
    const [ show, setShow ] = useState(false);
    return(
        <div class="block sm:hidden m-8 overflow-hidden bg-emerald-600 border-emerald-500 border-2 rounded-2xl">
            <div class="group outline-none accordion-section" tabindex="1">
              <div class="group  text-gray-900 transition ease duration-500 cursor-pointer relative" onClick={() => {setShow(!show)}}>
                <div class=" text-gray-900 text-center transition ease duration-1000">
                 <button type="button" className="my-3 text-2xl font-bold">
                  Change it up!
                 </button>
                </div>
              </div>
              <div class={`${show ? "max-h-screen" : "max-h-0"} px-4 overflow-hidden ease duration-1000`}>
                <div className="text-gray-900 block sm:hidden overflow-hidden transition 1s ease-out">
                  <div className="flex flex-col w-full px-10 gap-y-5 my-8 sm:px-5">
                    {
                      state.map(attr => <AttributeSlider
                        attribute={attr}
                        dispatch={dispatch}
                      />)
                    }
                  <button type="button" onClick={() => {setShow(false)}}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}