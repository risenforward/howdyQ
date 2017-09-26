![](https://imgur.com/DY6zMxf.png)

GraphQL IDE including interactive Docs & Subscriptions (use as Browser/Native App). A friendly fork of [GraphiQL](https://github.com/graphql/graphiql).

## Features

* Syntax highlighting
* Intelligent type ahead of fields, arguments, types, and more
* Real-time error highlighting and reporting
* Automatic query completion
* Run and inspect query results
* Interactive Docs with arrow-key control
* Interactive GraphQL Subscriptions
* `graphql-config` support

![](https://i.imgur.com/JkiNjQo.png)

## Getting Started
There are multiple ways to use the GraphQL Playground.
- [Download](https://s3-eu-west-1.amazonaws.com/graphcool-assets/graphql-playground/GraphQL+Playground-0.1.2.dmg) it as an Electron App
- Use it as a [React Component](#react-component)
- Include it in your graphql-js server with the [Middleware](#middleware)



## React Component
```
yarn add graphql-playground
```

GraphQL Playground provides a React component responsible for rendering the UI, which should be provided with a function for fetching from GraphQL, we recommend using the [fetch](https://fetch.spec.whatwg.org/) standard API.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Playground from 'graphql-playground';
import fetch from 'isomorphic-fetch';

function graphQLFetcher(graphQLParams) {
  return fetch(window.location.origin + '/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

ReactDOM.render(<Playground fetcher={graphQLFetcher} />, document.body);
```

## Middleware
GraphQL Playground has middleware for the next frameworks:

### Express

#### Properties
Express middleware supports the following properties:

+ `options`
  + `endpointUrl` [`string`] - the GraphQL endpoint url.

#### Usage
```js
import express from 'express';
import { express as middleware } from 'graphql-playground/middleware';

const app = express();

app.use('/playground', middleware({ endpointUrl: '/graphql' }));

app.listen(3000);
```

### Hapi

#### Properties
Hapi middleware supports the following properties:

+ `options`
  + `path` [`string`] - the Playground middleware url
  + `playgroundOptions`
      + `endpointUrl` [`string`] - the GraphQL endpoint url.

#### Usage
```js
import hapi from 'hapi';
import { hapi as middleware } from 'graphql-playground/middleware';

const server = new Hapi.Server();

server.connection({
  port: 3001
});

server.register({
  register: middleware,
  options: {
    path: '/playground',
    endpointUrl: '/graphql'
  }
},() => server.start());
```

### Koa

#### Properties
Koa middleware supports the following properties:

+ `options`
  + `endpointUrl` [`string`] - the GraphQL endpoint url.

#### Usage
```js
import Koa from 'koa';
import KoaRouter from 'koa-router';
import { koa as playgroundMiddleware } from 'graphql-playground/middleware';

const app = new Koa();
const router = new KoaRouter();

router.all('/playground', playgroundMiddleware({
  endpointUrl: '/graphql'
}));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3001);
```

## Development of GraphQL Playground [![npm version](https://badge.fury.io/js/graphql-playground.svg)](https://badge.fury.io/js/graphql-playground)

```sh
$ cd packages/graphql-playground
$ yarn install
$ yarn start
```
Open
[localhost:3000](http://localhost:3000/?endpoint=https://api.graph.cool/simple/v1/cj56h35ol3y93018144iab4wo&subscription=wss://subscriptions.graph.cool/v1/cj56h35ol3y93018144iab4wo)


<a name="help-and-community" />

## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Join our [Slack community](http://slack.graph.cool/) if you run into issues or have questions. We love talking to you!

[![](http://i.imgur.com/5RHR6Ku.png)](https://www.graph.cool/)
