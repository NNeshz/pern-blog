/* eslint-disable react/prop-types */
export function Button({ children, className, ...props }) {
  return (
    <button
      className={`relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
