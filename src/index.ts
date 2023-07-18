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
import { AxiosInstance, AxiosProxyConfig } from "axios";

/**
 * Class for handling interactions with the Skailar API.
 */
class SkailarChat {
    private apiKey: string;
    private proxy: AxiosProxyConfig | undefined;

    /**
     * @param {string} apiKey - Your API key for the Skailar API.
     * @param {AxiosProxyConfig} [proxy] - Optional Axios proxy configuration.
     */
    constructor(apiKey: string, proxy?: AxiosProxyConfig) {
        this.apiKey = apiKey;

        if (proxy) {
            this.proxy = proxy;
        } else {
            this.proxy = undefined;
        }
    }

    /**
     * Internal function to get an instance of the API client.
     * @private
     * @returns {Promise<AxiosInstance>} An instance of the API client.
     */
    private async getInstance(debugLogging: boolean): Promise<AxiosInstance> {
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
                debugLogging
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
        if (error.response) {
            throw new Error(error.response.data);
        } else {
            throw new Error(error.message);
        }
    }

    /**
     * Creates a chat completion.
     * @param {ChatCompletionRequest} data - The chat completion request data.
     * @throws {Error} If the model includes "claude".
     * @returns {Promise<ChatCompletionResponse>} The server's response.
     */
    public async CreateChatCompletion(
        data: ChatCompletionRequest,
        debugLogging: boolean = false
    ): Promise<ChatCompletionResponse> {
        try {
            const client = await this.getInstance(debugLogging);

            if (data.model.includes("claude")) {
                throw new Error(
                    "Use CreateClaudeChatCompletion instead of CreateChatCompletion for Claude models."
                );
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
     * @returns {Promise<ClaudeChatCompletionResponse>} The server's response.
     */
    public async CreateClaudeChatCompletion(
        data: ClaudeChatCompletionRequest,
        debugLogging: boolean = false
    ): Promise<ClaudeChatCompletionResponse> {
        try {
            const client = await this.getInstance(debugLogging);
            if (data.model.includes("claude")) {
                const response = await client.post("chat/completions", data);

                return response.data;
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
    public async Usage(debugLogging: boolean = false): Promise<UsageResponse> {
        try {
            const client = await this.getInstance(debugLogging);

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
    public async Models(debugLogging: boolean = false): Promise<ModelList> {
        try {
            const client = await this.getInstance(debugLogging);

            const response = await client.get("models");

            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }
}

export default SkailarChat;
