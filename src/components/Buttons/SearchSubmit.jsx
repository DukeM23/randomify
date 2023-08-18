import Loader from "../Loaders/Loader";

export default function SearchSubmit({ loading }) {
  return (
    <button
      className="border-2 rounded-full border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-gray-900 font-bold my-2 px-3 py-2"
      type={"submit"}
    >
      {loading ? <Loader /> : "Search"}
    </button>
  );
}
