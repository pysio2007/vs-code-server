/// <reference types="node" />
import * as cp from "child_process";
interface HandshakeMessage {
    type: "handshake";
}
interface RelaunchMessage {
    type: "relaunch";
    version: string;
}
export declare type Message = RelaunchMessage | HandshakeMessage;
export declare class ProcessError extends Error {
    readonly code: number | undefined;
    constructor(message: string, code: number | undefined);
}
/**
 * Allows the wrapper and inner processes to communicate.
 */
export declare class IpcMain {
    private readonly parentPid?;
    private readonly _onMessage;
    readonly onMessage: import("../common/emitter").Event<Message>;
    private readonly _onDispose;
    readonly onDispose: import("../common/emitter").Event<"SIGABRT" | "SIGALRM" | "SIGBUS" | "SIGCHLD" | "SIGCONT" | "SIGFPE" | "SIGHUP" | "SIGILL" | "SIGINT" | "SIGIO" | "SIGIOT" | "SIGKILL" | "SIGPIPE" | "SIGPOLL" | "SIGPROF" | "SIGPWR" | "SIGQUIT" | "SIGSEGV" | "SIGSTKFLT" | "SIGSTOP" | "SIGSYS" | "SIGTERM" | "SIGTRAP" | "SIGTSTP" | "SIGTTIN" | "SIGTTOU" | "SIGUNUSED" | "SIGURG" | "SIGUSR1" | "SIGUSR2" | "SIGVTALRM" | "SIGWINCH" | "SIGXCPU" | "SIGXFSZ" | "SIGBREAK" | "SIGLOST" | "SIGINFO" | undefined>;
    readonly processExit: (code?: number) => never;
    constructor(parentPid?: number | undefined);
    /**
     * Ensure we control when the process exits.
     */
    preventExit(): void;
    get isChild(): boolean;
    exit(error?: number | ProcessError): never;
    handshake(child?: cp.ChildProcess): Promise<void>;
    relaunch(version: string): void;
    private send;
}
/**
 * Channel for communication between the child and parent processes.
 */
export declare const ipcMain: IpcMain;
export interface WrapperOptions {
    maxMemory?: number;
    nodeOptions?: string;
}
/**
 * Provides a way to wrap a process for the purpose of updating the running
 * instance.
 */
export declare class WrapperProcess {
    private currentVersion;
    private readonly options?;
    private process?;
    private started?;
    private readonly logStdoutStream;
    private readonly logStderrStream;
    constructor(currentVersion: string, options?: WrapperOptions | undefined);
    private disposeChild;
    private relaunch;
    start(): Promise<void>;
    private _start;
    private spawn;
}
export {};
