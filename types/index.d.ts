import { AxiosProxyConfig, AxiosInstance } from "axios";

export interface Auth {
    username: string;
    password: string;
}

export interface ProxyConfig {
    host: string;
    port: number;
    auth?: Auth;
    protocol: "http" | "https";
}

export interface ProxyServiceInstance {
    instance: AxiosInstance | undefined;
    isOnline: boolean | undefined;
    timeoutId: NodeJS.Timeout | undefined;
}

export interface Messages {
    role: "user" | "assistant" | "system" | "function";
    content?: string;
    name?: string;
    function_call?: string;
}

export interface Functions {
    name: string;
    description: string;
    parameters: {
        [key: string]: any;
    };
}

export type Models =
    | "gpt-3.5-turbo"
    | "gpt-3.5-turbo-16k"
    | "gpt-4"
    | "gpt-4-32k";

export interface ChatCompletionRequest {
    model: Models;
    messages: Array<Messages>;
    functions?: Array<Functions>;
    function_call?: string;
    temperature?: number;
    top_p?: number;
    n?: number;
    stream?: boolean;
    stop?: Array<string> | string;
    max_tokens?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
    logit_bias?: Object;
    user?: string;
}

export interface ClaudeChatCompletionRequest {
    messages: Array<string>;
    model: "claude-instant-1" | "claude-2";
    max_tokens_to_sample: number;
    stream: boolean;
    temperature: number;
    top_p: number;
    top_k: number;
}

export interface ChatCompletionResponseChoices {
    text?: string;
    index?: number;
    logprobs?: CreateCompletionResponseChoicesInnerLogprobs | null;
    finish_reason?: string;
}

export interface ChatCompletionResponseUsage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

export interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: Models;
    choices: Array<ChatCompletionResponseChoices>;
    usage?: ChatCompletionResponseUsage;
}

export interface ClaudeChatCompletionResponse {
    completion: string;
    stop_reason: string;
    model: "claude-instant-1" | "claude-2";
    stop: "string";
    log_id: string;
}

export interface UsageResponse {
    max: string;
    used: number;
    first_used_today: string;
}

export interface ModelList {
    object: string;
    data: ModelData[];
}

export interface ModelData {
    id: string;
    object: string;
    created: number;
    owned_by: string;
    permission: Permission[];
    root: string;
    parent: null | string;
}

export interface Permission {
    id?: string;
    object: string;
    created: number;
    allow_create_engine: boolean;
    allow_sampling: boolean;
    allow_logprobs: boolean;
    allow_search_indices: boolean;
    allow_view: boolean;
    allow_fine_tuning: boolean;
    organization: string;
    group: null | string;
    is_blocking: boolean;
}
