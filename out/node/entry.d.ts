import { Args } from "./cli";
export declare const runVsCodeCli: (args: Args) => void;
export declare const openInExistingInstance: (args: Args, socketPath: string) => Promise<void>;
