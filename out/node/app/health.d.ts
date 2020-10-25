import { HttpProvider, HttpResponse, Heart, HttpProviderOptions } from "../http";
/**
 * Check the heartbeat.
 */
export declare class HealthHttpProvider extends HttpProvider {
    private readonly heart;
    constructor(options: HttpProviderOptions, heart: Heart);
    handleRequest(): Promise<HttpResponse>;
}
