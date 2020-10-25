/// <reference types="node" />
import * as http from "http";
import { HttpProvider, HttpProviderOptions, HttpResponse, Route } from "../http";
import { SettingsProvider, UpdateSettings } from "../settings";
export interface Update {
    checked: number;
    version: string;
}
export interface LatestResponse {
    name: string;
}
/**
 * HTTP provider for checking updates (does not download/install them).
 */
export declare class UpdateHttpProvider extends HttpProvider {
    readonly enabled: boolean;
    /**
     * The URL for getting the latest version of code-server. Should return JSON
     * that fulfills `LatestResponse`.
     */
    private readonly latestUrl;
    /**
     * Update information will be stored here. If not provided, the global
     * settings will be used.
     */
    private readonly settings;
    private update?;
    private updateInterval;
    constructor(options: HttpProviderOptions, enabled: boolean, 
    /**
     * The URL for getting the latest version of code-server. Should return JSON
     * that fulfills `LatestResponse`.
     */
    latestUrl?: string, 
    /**
     * Update information will be stored here. If not provided, the global
     * settings will be used.
     */
    settings?: SettingsProvider<UpdateSettings>);
    handleRequest(route: Route, request: http.IncomingMessage): Promise<HttpResponse>;
    /**
     * Query for and return the latest update.
     */
    getUpdate(force?: boolean): Promise<Update>;
    private _getUpdate;
    get currentVersion(): string;
    /**
     * Return true if the currently installed version is the latest.
     */
    isLatestVersion(latest: Update): boolean;
    private request;
    private requestResponse;
}
