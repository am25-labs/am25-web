declare module "*.css";
declare module "@/styles/globals.css";

export {};

declare global {
  type PlausibleFunction = ((eventName: string, options?: {
    props?: Record<string, string | number | boolean>;
  }) => void) & {
    q?: IArguments[];
  };

  interface Window {
    plausible?: PlausibleFunction;
  }
}
