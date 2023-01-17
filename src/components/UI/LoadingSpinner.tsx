import React from "react";

const LoadingSpinner = () => {
  return (
    <>
      <div className="my-10 mx-auto grid w-min place-content-center">
        <div className="flex items-center gap-2 text-gray-500">
          <svg className="block h-10 w-10 animate-spin rounded-full border-4 border-t-indigo-500"></svg>
        </div>
      </div>
    </>
  );
};

export default LoadingSpinner;
