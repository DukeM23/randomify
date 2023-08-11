import React, { useEffect, useState } from "react";

function Header() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);
  }, [token]);

  const logout = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="grid grid-cols-2 place-content-between py-10 px-6">
      <div>
        <h1 className="flex item-center text-emerald-500 font-semibold text-4xl sm:text-6xl">
          <a href={window.location.href}>Randomify</a>
        </h1>
      </div>
      {token && (
        <div className="flex item-center justify-self-end">
          <button
            className="border-2 text-base sm:text-2xl font-bold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 py-1 sm:py-2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
