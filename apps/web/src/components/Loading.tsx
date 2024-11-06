import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-full",
        "text-gray-600 text-center p-4"
      )}
    >
      <svg
        className="animate-spin h-8 w-8 mr-3 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
        ></path>
      </svg>
      <span>Loading...</span>
    </div>
  );
}
