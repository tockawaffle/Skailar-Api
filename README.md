# Skailar Api Usage Guide

## Introduction

This is an unofficial Node.js wrapper for the Skailar Api. It provides an easy-to-use interface for interacting with the Skailar Api in a Node.js environment.

I was bored and decided to make this wrapper to make my life easier since I use this API on multiple of my projects. I hope this helps you too.

The Proxy handler is 100% not a thing to be used with a single API, but I am lazy and didn't want to rework the whole thing to accomodate for this single wrapper. So I just made it a thing. If you want to use it, you can. If you don't, you don't have to. It's that simple.

### Installation

Firstly, you need to install the SkailarChat package by running:

```bash
npm install skailar
```

### How to Use

The SkailarChat class provides an easy-to-use interface for interacting with the Skailar API in a Node.js environment.

First, you must import the SkailarChat class:

```javascript
import SkailarChat from "skailar";
```

Then, initialize a new instance of SkailarChat using your API key:

```javascript
let skailar = new SkailarChat("your-api-key");
```

If you need to use a proxy, provide a configuration object as the second parameter to the constructor:

```javascript
let skailar = new SkailarChat("your-api-key", {
    host: "proxy-host",
    port: "proxy-port",
    protocol: "http",
    auth: {
        username: "proxy-username",
        password: "proxy-password",
    },
});
```

The SkailarChat class has a number of public methods:

-   CreateChatCompletion(data, debugLogging): Creates a chat completion. Expects a ChatCompletionRequest object as the parameter and optionally a boolean flag for enabling/disabling debugging logs.

-   CreateClaudeChatCompletion(data, debugLogging): Creates a Claude chat completion. Expects a ClaudeChatCompletionRequest object as the parameter and optionally a boolean flag for enabling/disabling debugging logs.

-   Usage(debugLogging): Fetches usage data. Optionally expects a boolean flag for enabling/disabling debugging logs.

-   Models(debugLogging): Fetches available models. Optionally expects a boolean flag for enabling/disabling debugging logs.

#### Example

Here is an example usage of the SkailarChat class:

```javascript
import SkailarChat from "skailar";

let skailar = new SkailarChat("your-api-key");

let request = {
    model: "gpt-4",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Who won the world series in 2020?" },
    ],
    max_tokens: 60,
};

skailar
    .CreateChatCompletion(request, true)
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
```

### Note

You might encounter some issues while using any model that is not gpt-4-32k. This is because Skailar Api had some problems with the other models and that wasnt fixed yet (As of 17/07/2023).

Also note that the 32k model is only available for boosters/donators on their discord server. You can also get access to it giving proper feedback/suggestions/use cases for the model.

### Types

The following types are used in the context of the SkailarChat:

-   Messages
-   Functions
-   Models
-   ChatCompletionRequest
-   ClaudeChatCompletionRequest
-   ChatCompletionResponseChoices
-   ChatCompletionResponseUsage
-   ChatCompletionResponse
-   ClaudeChatCompletionResponse
-   UsageResponse
-   ModelList
-   ModelData
-   Permission

Refer to the code comments in the SkailarChat class for more details about these types.

### Disclaimer

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see https://www.gnu.org/licenses/.

The author is not affiliated with the Skailar development team and created this wrapper for personal use and thought it might be helpful to others. This wrapper is to be used at your own risk.
