import { helix } from "ldrs";

export const LoadingState = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <l-helix size="65" speed="2.5" color="black"></l-helix>
      <p>Please wait, we fetching your data!</p>
    </div>
  );
};
