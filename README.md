<p>
  <a href="https://www.tinybird.co/join-our-slack-community"><img alt="Slack Status" src="https://img.shields.io/badge/slack-chat-1FCC83?style=flat&logo=slack"></a>
</p>

# Tinybird Vercel Edge Functions Analytics Starter Kit

Data can help developers build better software, but it can be hard to find data tools that are easy to integrate, scale with you as you grow, and are flexible enough to meet different demands. This Stater Kit provides an example for you can build your own logging & telemetry solution powered by [Tinybird](https://www.tinybird.co/).

## What's in the box?

This example includes a [Tinybird](https://www.tinybird.co/) data project, [Vercel](https://vercel.com/) Functions, and a [Next.js](https://nextjs.org/) + [Tremor](https://www.tremor.so/) app.

### Log Capture

In [logger.ts](./dashboard/lib/logger.ts) you'll find a simple reference implementation for a log capture class in TypeScript. This is built with [Next.js](https://nextjs.org/) in mind, but could be adapted to any other framework or language.

The logger exposes 3 methods `info`, `warn` and `error` that can be used to capture log messages with different log levels. Each one in turn calls the `log` method, which captures additional information about the incoming request.

Finally, the log message, level and request info is sent to [Tinybird's Events API](https://www.tinybird.co/docs/guides/high-frequency-ingestion.html) as JSON via a standard HTTP POST request. Because this is simply JSON over HTTP, you can use this approach to integrate pretty much any framework, language or application to send data to [Tinybird](https://www.tinybird.co/).

### Vercel Functions

Two examples of Vercel Functions are included, [genericFunction.ts](./dashboard/pages/api/example/genericFunction.ts) and [getProduct.ts](./dashboard/pages/api/example/getProduct.ts). These functions simply demonstrate how to use the logger in a function, and provide endpoints to hit that generate logs on demand.

### Application

#### API Tester

The first page of the demo app is the API Tester. This page provides a Swagger interface to execute the example Vercel Function endpoints. You can also upload a custom OpenAPI 3.0 spec file to generate a Swagger interface for any other API, so you can implement logging into your own APIs and use the app to test it.

#### Dashboard

The second page of the demo app is the Dashboard. This page provides a set of example charts that combine the logging information with the request information, giving you deeper insight into the context around how your functions are used.

The dashboard is implemented using [Tremor](https://www.tremor.so/) as the visualisation library and [Tinybird](https://www.tinybird.co/) as the data layer. The logs are ingested into [Tinybird](https://www.tinybird.co/), queried with SQL and the results are published as HTTP APIs that are embedded directly into the application.

### Tinybird Data Project

The [Tinybird](https://www.tinybird.co/) data project is a complete example including Data Sources, Pipes, Materialized Views, and APIs.

You can bootstrap your [Tinybird](https://www.tinybird.co/) project using this example, either by cloning this repo and pushing with the CLI, or by creating a new Workspace and selecting the Functions Analytics Starter Kit.