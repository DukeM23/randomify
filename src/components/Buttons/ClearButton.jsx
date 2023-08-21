export default function ClearButton() {
  function handleRIB() {
    window.location.reload();
  }

  return (
    <button
      className="border-2 rounded-full border-transparent text-emerald-600 hover:border-emerald-500 font-bold my-2 px-3 py-2"
      type={"button"}
      onClick={handleRIB}
    >
      Clear
    </button>
  );
}
