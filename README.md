# Skailar Api

[![npm version](https://badge.fury.io/js/skailar-api.svg)](https://badge.fury.io/js/skailar-api)

[![wakatime](https://wakatime.com/badge/user/e0979afa-f854-452d-b8a8-56f9d69eaa3b/project/938676a1-1012-45e5-ac4e-b3ca77eabe14.svg)](https://wakatime.com/badge/user/e0979afa-f854-452d-b8a8-56f9d69eaa3b/project/938676a1-1012-45e5-ac4e-b3ca77eabe14)

[![](https://dcbadge.vercel.app/api/server/skailar)](https://discord.gg/skailar)

## Introduction

This is a wrapper for the [Skailar Api](https://skailar.com/).

Made with Axios and TypeScript for better type support.

### Installation

Firstly, you need to install the SkailarChat package by running:

```bash
npm install skailar-api
```

### How to Use

<details>
<summary> CommonJS Compatibility </summary>
<br>
This is an ESM package, you might face some issues if you are using CommonJS. I recommend using ESM instead.
There are workarounds for using ESM packages in CommonJS, such as using "import()" instead of "require()":

```javascript
(async () => {
    const SkailarChat = await import("chimera-api");

    const Skailar = SkailarChat.default;

    const apiKey = "YOUR_API_KEY";

    const skailarApi = new Skailar(apiKey);

    const createChatCompletion = await skailarApi.CreateChatCompletion({
        model: "gpt-4",
        messages: [
            {
                content: "Hello, how are you?",
                role: "user",
            },
        ],
    });

    console.log(createChatCompletion);
    process.exit(0);
})();
```

No, you can not use top-level awaits in CommonJS. You can use the workaround above or use ESM instead.

---

</details>

The SkailarChat class provides an easy-to-use interface for interacting with the Skailar API in a Node.js environment.

First, you must import the SkailarChat class:

```javascript
import SkailarChat from "skailar";
```

Then, initialize a new instance of SkailarChat using your API key (You can get one by joining this [Discord Server](https://discord.com/invite/skailar)):

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
    } /* Optional */,
});
```

You can also pass a debugLogging boolean as the third parameter to the constructor to enable debug logging of the Proxy Handler:

```javascript
let skailar = new SkailarChat("your-api-key", undefined, true);
```

The SkailarChat class has a number of public methods:

-   CreateChatCompletion(data): Creates a chat completion. Expects a ChatCompletionRequest object as the parameter.

-   CreateClaudeChatCompletion(data): Creates a Claude chat completion. Expects a ClaudeChatCompletionRequest object as the parameter.

-   Usage(): Fetches usage data.

-   Models(): Fetches available models.

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

You might encounter some issues while using any model that is not gpt-4-32k. This is because Skailar Api had some problems with the other models and that wasnt fixed yet (As of 17/07/2023 - v1.0.0).

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

Also, this was not made by using fetch because the built-in fetch does not support proxies by default, and I don't want to use an workaround.

### Support and Others

<details>
<summary> Performance Related Stuff </summary>
<br>

### Proxy Handler:

The Proxy handler is 100% not a thing to be used with a single API: It provides advanced management of Axios instances, such as per-URL instance caching and optional proxy support. Originally, it was designed for managing multiple API endpoints, hence the proxy handler might seem over-engineered for a single API wrapper. It's optional and doesn't affect the main functionality if not utilized.

TLDR: The Proxy Handler is way too overengineered for a single API wrapper, but it's optional and doesn't affect the main functionality if not utilized.

---

</details>
