/// <reference types="node" />
import * as http from "http";
import { HttpProvider, HttpResponse, Route } from "../http";
/**
 * Static file HTTP provider. Static requests do not require authentication if
 * the resource is in the application's directory except requests to serve a
 * directory as a tar which always requires authentication.
 */
export declare class StaticHttpProvider extends HttpProvider {
    handleRequest(route: Route, request: http.IncomingMessage): Promise<HttpResponse>;
    /**
     * Return a resource with variables replaced where necessary.
     */
    protected getReplacedResource(request: http.IncomingMessage, route: Route): Promise<HttpResponse>;
    /**
     * Tar up and stream a directory.
     */
    private getTarredResource;
}
