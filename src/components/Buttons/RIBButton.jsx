import { useNavigate } from "react-router-dom";

export default function RIBButton() {
  const navigate = useNavigate();

  return (
    <button
      className="border-2 font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 md:px-4  py-2 md:py-4"
      onClick={() => navigate(-1)}
    >
      Run it back!
    </button>
  );
}
