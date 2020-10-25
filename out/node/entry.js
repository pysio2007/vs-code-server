#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openInExistingInstance = exports.runVsCodeCli = void 0;
var logger_1 = require("@coder/logger");
var cp = __importStar(require("child_process"));
var fs_1 = require("fs");
var http_1 = __importDefault(require("http"));
var path = __importStar(require("path"));
var util_1 = require("../common/util");
var health_1 = require("./app/health");
var login_1 = require("./app/login");
var proxy_1 = require("./app/proxy");
var static_1 = require("./app/static");
var update_1 = require("./app/update");
var vscode_1 = require("./app/vscode");
var cli_1 = require("./cli");
var coder_cloud_1 = require("./coder-cloud");
var http_2 = require("./http");
var plugin_1 = require("./plugin");
var util_2 = require("./util");
var wrapper_1 = require("./wrapper");
var pkg = {};
try {
    pkg = require("../../package.json");
}
catch (error) {
    logger_1.logger.warn(error.message);
}
var version = pkg.version || "development";
var commit = pkg.commit || "development";
exports.runVsCodeCli = function (args) {
    logger_1.logger.debug("forking vs code cli...");
    var vscode = cp.fork(path.resolve(__dirname, "../../lib/vscode/out/vs/server/fork"), [], {
        env: __assign(__assign({}, process.env), { CODE_SERVER_PARENT_PID: process.pid.toString() }),
    });
    vscode.once("message", function (message) {
        logger_1.logger.debug("got message from VS Code", logger_1.field("message", message));
        if (message.type !== "ready") {
            logger_1.logger.error("Unexpected response waiting for ready response", logger_1.field("type", message.type));
            process.exit(1);
        }
        var send = { type: "cli", args: args };
        vscode.send(send);
    });
    vscode.once("error", function (error) {
        logger_1.logger.error("Got error from VS Code", logger_1.field("error", error));
        process.exit(1);
    });
    vscode.on("exit", function (code) { return process.exit(code || 0); });
};
exports.openInExistingInstance = function (args, socketPath) { return __awaiter(void 0, void 0, void 0, function () {
    var pipeArgs, isDir, i, fp, vscode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pipeArgs = {
                    type: "open",
                    folderURIs: [],
                    fileURIs: [],
                    forceReuseWindow: args["reuse-window"],
                    forceNewWindow: args["new-window"],
                };
                isDir = function (path) { return __awaiter(void 0, void 0, void 0, function () {
                    var st, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, fs_1.promises.stat(path)];
                            case 1:
                                st = _a.sent();
                                return [2 /*return*/, st.isDirectory()];
                            case 2:
                                error_1 = _a.sent();
                                return [2 /*return*/, false];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < args._.length)) return [3 /*break*/, 4];
                fp = path.resolve(args._[i]);
                return [4 /*yield*/, isDir(fp)];
            case 2:
                if (_a.sent()) {
                    pipeArgs.folderURIs.push(fp);
                }
                else {
                    pipeArgs.fileURIs.push(fp);
                }
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                if (pipeArgs.forceNewWindow && pipeArgs.fileURIs.length > 0) {
                    logger_1.logger.error("--new-window can only be used with folder paths");
                    process.exit(1);
                }
                if (pipeArgs.folderURIs.length === 0 && pipeArgs.fileURIs.length === 0) {
                    logger_1.logger.error("Please specify at least one file or folder");
                    process.exit(1);
                }
                vscode = http_1.default.request({
                    path: "/",
                    method: "POST",
                    socketPath: socketPath,
                }, function (response) {
                    response.on("data", function (message) {
                        logger_1.logger.debug("got message from VS Code", logger_1.field("message", message.toString()));
                    });
                });
                vscode.on("error", function (error) {
                    logger_1.logger.error("got error from VS Code", logger_1.field("error", error));
                });
                vscode.write(JSON.stringify(pipeArgs));
                vscode.end();
                return [2 /*return*/];
        }
    });
}); };
var main = function (args, configArgs) { return __awaiter(void 0, void 0, void 0, function () {
    var envPassword, password, _a, host, port, options, _b, _c, httpServer, serverAddress, openAddress_1, err_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (args.link) {
                    // If we're being exposed to the cloud, we listen on a random address and disable auth.
                    args = __assign(__assign({}, args), { host: "localhost", port: 0, auth: http_2.AuthType.None, socket: undefined, cert: undefined });
                    logger_1.logger.info("link: disabling auth and listening on random localhost port for cloud agent");
                }
                if (!args.auth) {
                    args = __assign(__assign({}, args), { auth: http_2.AuthType.Password });
                }
                logger_1.logger.info("Using user-data-dir " + util_2.humanPath(args["user-data-dir"]));
                logger_1.logger.trace("Using extensions-dir " + util_2.humanPath(args["extensions-dir"]));
                envPassword = !!process.env.PASSWORD;
                password = args.auth === http_2.AuthType.Password && (process.env.PASSWORD || args.password);
                if (args.auth === http_2.AuthType.Password && !password) {
                    throw new Error("Please pass in a password via the config file or $PASSWORD");
                }
                _a = cli_1.bindAddrFromAllSources(args, configArgs), host = _a[0], port = _a[1];
                _b = [{ auth: args.auth, commit: commit, host: host, 
                        // The hash does not add any actual security but we do it for obfuscation purposes.
                        password: password ? util_2.hash(password) : undefined, port: port, proxyDomains: args["proxy-domain"], socket: args.socket }];
                if (!(args.cert && !args.cert.value)) return [3 /*break*/, 2];
                return [4 /*yield*/, util_2.generateCertificate()];
            case 1:
                _c = _d.sent();
                return [3 /*break*/, 3];
            case 2:
                _c = {
                    cert: args.cert && args.cert.value,
                    certKey: args["cert-key"],
                };
                _d.label = 3;
            case 3:
                options = __assign.apply(void 0, _b.concat([(_c)]));
                if (options.cert && !options.certKey) {
                    throw new Error("--cert-key is missing");
                }
                httpServer = new http_2.HttpServer(options);
                httpServer.registerHttpProvider(["/", "/vscode"], vscode_1.VscodeHttpProvider, args);
                httpServer.registerHttpProvider("/update", update_1.UpdateHttpProvider, false);
                httpServer.registerHttpProvider("/proxy", proxy_1.ProxyHttpProvider);
                httpServer.registerHttpProvider("/login", login_1.LoginHttpProvider, args.config, envPassword);
                httpServer.registerHttpProvider("/static", static_1.StaticHttpProvider);
                httpServer.registerHttpProvider("/healthz", health_1.HealthHttpProvider, httpServer.heart);
                return [4 /*yield*/, plugin_1.loadPlugins(httpServer, args)];
            case 4:
                _d.sent();
                wrapper_1.ipcMain.onDispose(function () {
                    httpServer.dispose().then(function (errors) {
                        errors.forEach(function (error) { return logger_1.logger.error(error.message); });
                    });
                });
                logger_1.logger.info("code-server " + version + " " + commit);
                logger_1.logger.info("Using config file " + util_2.humanPath(args.config));
                return [4 /*yield*/, httpServer.listen()];
            case 5:
                serverAddress = _d.sent();
                logger_1.logger.info("HTTP server listening on " + serverAddress);
                if (args.auth === http_2.AuthType.Password) {
                    if (envPassword) {
                        logger_1.logger.info("    - Using password from $PASSWORD");
                    }
                    else {
                        logger_1.logger.info("    - Using password from " + util_2.humanPath(args.config));
                    }
                    logger_1.logger.info("    - To disable use `--auth none`");
                }
                else {
                    logger_1.logger.info("  - No authentication");
                }
                delete process.env.PASSWORD;
                if (httpServer.protocol === "https") {
                    logger_1.logger.info(args.cert && args.cert.value
                        ? "  - Using provided certificate and key for HTTPS"
                        : "  - Using generated certificate and key for HTTPS");
                }
                else {
                    logger_1.logger.info("  - Not serving HTTPS");
                }
                if (httpServer.proxyDomains.size > 0) {
                    logger_1.logger.info("  - " + util_1.plural(httpServer.proxyDomains.size, "Proxying the following domain") + ":");
                    httpServer.proxyDomains.forEach(function (domain) { return logger_1.logger.info("    - *." + domain); });
                }
                if (!(serverAddress && !options.socket && args.open)) return [3 /*break*/, 7];
                openAddress_1 = serverAddress.replace(/:\/\/0.0.0.0/, "://localhost");
                return [4 /*yield*/, util_2.open(openAddress_1).catch(function (error) {
                        logger_1.logger.error("Failed to open", logger_1.field("address", openAddress_1), logger_1.field("error", error));
                    })];
            case 6:
                _d.sent();
                logger_1.logger.info("Opened " + openAddress_1);
                _d.label = 7;
            case 7:
                if (!args.link) return [3 /*break*/, 11];
                _d.label = 8;
            case 8:
                _d.trys.push([8, 10, , 11]);
                return [4 /*yield*/, coder_cloud_1.coderCloudBind(serverAddress, args.link.value)];
            case 9:
                _d.sent();
                return [3 /*break*/, 11];
            case 10:
                err_1 = _d.sent();
                logger_1.logger.error(err_1.message);
                wrapper_1.ipcMain.exit(1);
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
function entry() {
    return __awaiter(this, void 0, void 0, function () {
        var cliArgs, configArgs, args, socketPath, wrapper;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cliArgs = cli_1.parse(process.argv.slice(2));
                    return [4 /*yield*/, cli_1.readConfigFile(cliArgs.config)
                        // This prioritizes the flags set in args over the ones in the config file.
                    ];
                case 1:
                    configArgs = _a.sent();
                    args = Object.assign(configArgs, cliArgs);
                    return [4 /*yield*/, cli_1.setDefaults(args)
                        // There's no need to check flags like --help or to spawn in an existing
                        // instance for the child process because these would have already happened in
                        // the parent and the child wouldn't have been spawned.
                    ];
                case 2:
                    args = _a.sent();
                    if (!wrapper_1.ipcMain.isChild) return [3 /*break*/, 4];
                    return [4 /*yield*/, wrapper_1.ipcMain.handshake()];
                case 3:
                    _a.sent();
                    wrapper_1.ipcMain.preventExit();
                    return [2 /*return*/, main(args, configArgs)];
                case 4:
                    if (args.help) {
                        console.log("code-server", version, commit);
                        console.log("");
                        console.log("Usage: code-server [options] [path]");
                        console.log("");
                        console.log("Options");
                        cli_1.optionDescriptions().forEach(function (description) {
                            console.log("", description);
                        });
                        return [2 /*return*/];
                    }
                    if (args.version) {
                        if (args.json) {
                            console.log({
                                codeServer: version,
                                commit: commit,
                                vscode: require("../../lib/vscode/package.json").version,
                            });
                        }
                        else {
                            console.log(version, commit);
                        }
                        return [2 /*return*/];
                    }
                    if (cli_1.shouldRunVsCodeCli(args)) {
                        return [2 /*return*/, exports.runVsCodeCli(args)];
                    }
                    return [4 /*yield*/, cli_1.shouldOpenInExistingInstance(cliArgs)];
                case 5:
                    socketPath = _a.sent();
                    if (socketPath) {
                        return [2 /*return*/, exports.openInExistingInstance(args, socketPath)];
                    }
                    wrapper = new wrapper_1.WrapperProcess(require("../../package.json").version);
                    return [2 /*return*/, wrapper.start()];
            }
        });
    });
}
entry().catch(function (error) {
    logger_1.logger.error(error.message);
    wrapper_1.ipcMain.exit(error);
});
//# sourceMappingURL=entry.js.map