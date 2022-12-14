<p>
  <a href="https://www.tinybird.co/join-our-slack-community"><img alt="Slack Status" src="https://img.shields.io/badge/slack-chat-1FCC83?style=flat&logo=slack"></a>
</p>

# Tinybird Log Analytics Starter Kit

Data can help developers build better software, but it can be hard to find data tools that are easy to integrate, scale with you as you grow, and are flexible enough to meet different demands. This Stater Kit provides an example for you can build your own logging & telemetry solution powered by [Tinybird](https://www.tinybird.co/).

![Tinybird Functions Analytics Dashboard](./assets/img/readme-dashboard.png)

## What's in the box?

This example includes a [Tinybird](https://www.tinybird.co/) data project, [Vercel](https://vercel.com/) Functions, and a [Next.js](https://nextjs.org/) + [Tremor](https://www.tremor.so/) app.

### Log Capture

In [logger.ts](./dashboard/lib/logger.ts) you'll find a simple reference implementation for a log capture class in TypeScript. This is built with [Next.js](https://nextjs.org/) in mind, but could be adapted to any other framework or language.

The logger exposes 3 methods `info`, `warn` and `error` that can be used to capture log messages with different log levels. Each one in turn calls the `log` method, which captures additional information about the incoming request.

Finally, the log message, level and request info is sent to [Tinybird's Events API](https://www.tinybird.co/docs/guides/high-frequency-ingestion.html) as JSON via a standard HTTP POST request. Because this is simply JSON over HTTP, you can use this approach to integrate pretty much any framework, language or application to send data to [Tinybird](https://www.tinybird.co/).

### Vercel Functions

Two examples of Vercel Functions are included, [genericFunction.ts](./dashboard/pages/api/example/genericFunction.ts) and [getProduct.ts](./dashboard/pages/api/example/getProduct.ts). These functions simply demonstrate how to use the logger in a function, and provide endpoints to hit that generate logs on demand.

### Web Dashboard

The Web Dashboard provides a set of example charts that combine the logging information with the request information, giving you deeper insight into the context around how your functions are used.

The dashboard is implemented using [Tremor](https://www.tremor.so/) as the visualisation library and [Tinybird](https://www.tinybird.co/) as the data layer. The logs are ingested into [Tinybird](https://www.tinybird.co/), queried with SQL and the results are published as HTTP APIs that are embedded directly into the application.

![Tinybird Functions Analytics Dashboard](./assets/img/readme-dashboard.png)

### Tinybird Data Project

The [Tinybird](https://www.tinybird.co/) data project is a complete example including Data Sources, Pipes, Materialized Views, and APIs.

You can bootstrap your [Tinybird](https://www.tinybird.co/) project using this example, either by cloning this repo and pushing with the CLI, or by creating a new Workspace and selecting the Functions Analytics Starter Kit.

![Tinybird Functions Analytics DataFlow](./assets/img/readme-dataflow.png)

## Deploy

There are two components to this Starter Kit, the frontend application & the Tinybird backend.

### Frontend application

Use the button below to deploy this Starter Kit to Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftinybirdco%2Flog-analytics-starter-kit&env=TINYBIRD_TOKEN&envDescription=These%20Env%20Vars%20link%20your%20frontend%20to%20the%20Tinybird%20backend.%20See%20the%20Starter%20Kit%20readme%20for%20more%20info.&envLink=https%3A%2F%2Fgithub.com%2Ftinybirdco%2Flog-analytics-starter-kit%23environment-variables&project-name=tinybird-log-analytics-starter-kit&repository-name=tinybird-log-analytics-starter-kit&demo-description=Custom%20analytics%20for%20your%20application%20logs%20using%20Tinybird&demo-url=http%3A%2F%2Flog-analytics.tinybird.co&demo-image=http%3A%2F%2Flog-analytics.tinybird.co%2Fbanner.png&root-directory=dashboard)

#### Environment Variables

The reference `logger.ts` implementation requires one environment variable to be defined:

- `TINYBIRD_TOKEN` is the append Auth Token that gives permission to send logs to the Data Source in Tinybird. You will need to copy this out of your Tinybird account by logging into the Tinybird UI.

### Tinybird backend

Use the button below to deploy this Starter Kit to Tinybird.

[![Deploy to Tinybird](https://cdn.tinybird.co/button)](https://ui.tinybird.co/workspaces/new?name=log_analytics_starter_kit&starter_kit=log-analytics-starter-kit)
