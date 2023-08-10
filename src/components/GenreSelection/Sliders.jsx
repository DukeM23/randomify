import AttributeSlider from "./AttributeSlider";
import { useReducerContext } from "./ReducerContext";
export default function Slider() {
  const { state, dispatch } = useReducerContext();
  console.log(state);
  return (
    <div className="bg-emerald-500 border-emerald-700 border-2 rounded-2xl">
      <div className="flex justify-center">
        <div className="flex flex-col w-full gap-y-5 my-5 px-10 sm:px-3">
          {state.map((attr, idx) => (
            <AttributeSlider key={idx} attribute={attr} dispatch={dispatch} />
          ))}
        </div>
      </div>
    </div>
  );
}
