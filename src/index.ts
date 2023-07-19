/**
 * @License GNU GPLv3
 * @Description Skailar API wrapper for Node.js
 * @Version 1.0.0
 * 
    Skailar Api Wrapper, made for an easier interaction with the Skailar API, all compliant with the GNU Affero General Public License v3.
    Copyright (C) 2023 tockawaffle/Nixyi

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// <reference path="../types/index.d.ts" />
import InstanceHandler from "./tools/ProxyHandler.js";
import {
    ChatCompletionRequest,
    ChatCompletionResponse,
    ClaudeChatCompletionRequest,
    ClaudeChatCompletionResponse,
    ModelList,
    UsageResponse,
} from "../types";
import { AxiosError, AxiosInstance, AxiosProxyConfig } from "axios";

/**
 * Class for handling interactions with the Skailar API.
 */
class SkailarChat {
    private apiKey: string;
    private proxy: AxiosProxyConfig | undefined;
    private debugLogging: boolean = false;

    /**
     * @param {string} apiKey - Your API key for the Skailar API.
     * @param {AxiosProxyConfig} [proxy] - Optional Axios proxy configuration.
     */
    constructor(
        apiKey: string,
        proxy?: AxiosProxyConfig,
        debugLogging?: boolean
    ) {
        this.apiKey = apiKey;

        if (proxy) {
            this.proxy = proxy;
        } else {
            this.proxy = undefined;
        }

        if (debugLogging) {
            this.debugLogging = debugLogging;
        }
    }

    /**
     * Internal function to get an instance of the API client.
     * @private
     * @returns {Promise<AxiosInstance>} An instance of the API client.
     */
    private async getInstance(): Promise<AxiosInstance> {
        if (this.proxy) {
            return await new InstanceHandler(
                "https://api.skailar.net/v1/",
                {
                    Authorization: `Bearer ${this.apiKey}`,
                },
                {
                    host: this.proxy.host,
                    port: this.proxy.port,
                    protocol: this.proxy.protocol as "http" | "https",
                    auth: this.proxy.auth,
                },
                this.debugLogging
            ).getInstance();
        } else {
            return await new InstanceHandler("https://api.skailar.net/v1/", {
                Authorization: `Bearer ${this.apiKey}`,
            }).getInstance();
        }
    }

    /**
     * Internal function to handle API errors.
     * @private
     * @param {any} error - The error to handle.
     */
    private handleError(error: any): never {
        if (error.response || error instanceof AxiosError) {
            throw new Error(error.response.data);
        } else {
            throw new Error(error.message);
        }
    }

    /**
     * Internal function to handle Streamed Responses.
     * @private
     * @param {AxiosInstance} instance - The Axios instance to use.
     * @param {ChatCompletionRequest | ClaudeChatCompletionRequest} data - The data to send.
     * @returns {Promise<string>} The response data.
     */
    private async handleStream(
        instance: AxiosInstance,
        data: ClaudeChatCompletionRequest | ChatCompletionRequest
    ): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            instance
                .post("chat/completions", data, {
                    responseType: "stream",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    let data = "";
                    response.data.on(
                        "data",
                        (chunk: string) => (data += chunk)
                    );
                    response.data.on("end", () => resolve(data));
                    response.data.on("error", reject);
                })
                .catch(reject);
        });
    }

    /**
     * Creates a chat completion.
     * @param {ChatCompletionRequest} data - The chat completion request data.
     * @throws {Error} If the model includes "claude".
     * @returns {Promise<ChatCompletionResponse | string>} The server's response.
     */
    public async CreateChatCompletion(
        data: ChatCompletionRequest
    ): Promise<ChatCompletionResponse | string> {
        try {
            const client = await this.getInstance();

            if (data.stream) {
                return await this.handleStream(client, data);
            } else {
                const response = await client.post("chat/completions", data);

                return response.data;
            }
        } catch (error: any) {
            this.handleError(error);
        }
    }

    /**
     * Creates a Claude chat completion.
     * @param {ClaudeChatCompletionRequest} data - The Claude chat completion request data.
     * @throws {Error} If the model does not include "claude".
     * @returns {Promise<ClaudeChatCompletionResponse | string>} The server's response.
     */
    public async CreateClaudeChatCompletion(
        data: ClaudeChatCompletionRequest
    ): Promise<ClaudeChatCompletionResponse | string> {
        try {
            const client = await this.getInstance();
            if (data.model.includes("claude")) {
                if (data.stream) {
                    return await this.handleStream(client, data);
                } else {
                    const response = await client.post(
                        "chat/completions",
                        data
                    );
                    return response.data;
                }
            } else {
                throw new Error(
                    "Use CreateChatCompletion instead of CreateClaudeChatCompletion for non Claude models."
                );
            }
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Fetches usage data.
     * @returns {Promise<UsageResponse>} The server's response.
     */
    public async Usage(): Promise<UsageResponse> {
        try {
            const client = await this.getInstance();
            const response = await client.get("usage");
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    /**
     * Fetches available models.
     * @returns {Promise<ModelList>} The server's response.
     */
    public async Models(): Promise<ModelList> {
        try {
            const client = await this.getInstance();
            const response = await client.get("models");
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }
}

export default SkailarChat;
