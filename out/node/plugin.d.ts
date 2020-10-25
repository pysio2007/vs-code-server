import { Args } from "./cli";
import { HttpServer } from "./http";
export declare type Activate = (httpServer: HttpServer, args: Args) => void;
/**
 * Plugins must implement this interface.
 */
export interface Plugin {
    activate: Activate;
}
/**
 * Load all plugins from the `plugins` directory, directories specified by
 * `CS_PLUGIN_PATH` (colon-separated), and individual plugins specified by
 * `CS_PLUGIN` (also colon-separated).
 */
export declare const loadPlugins: (httpServer: HttpServer, args: Args) => Promise<void>;
