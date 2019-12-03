# Cloudflare Zero-Scale Slack Worker for Camunda Cloud

This is a [Cloudflare worker](https://developers.cloudflare.com/workers) that provides a zero-scale Slack messaging task for [Camunda Cloud](https://zeebe.io/blog/2019/09/getting-started-camunda-cloud/), using the Camunda Cloud HTTP Worker.

On the free tier of Cloudflare Workers, you can send 100,000 messages a day.

## Setup

### Slack Setup

1. Go to your Slack.
2. Click on the part that has your name and the Slack team name, then go to "Customize Slack".
3. Click on "Configure apps".
4. Search the App Directory for "Incoming WebHooks".
5. Click on "Add to Slack".
6. Choose a channel, then click on "Add Incoming WebHooks integration"
7. Copy the Webhook URL.

### Cloudflare Setup

1. Sign up for a [Cloudflare Workers account](https://dash.cloudflare.com/).
2. Clone [this repo](https://github.com/jwulf/slack-cloud-worker), then cd into the checked out directory and run `npm i`.
3. Install `wrangler`, the Cloudflare Worker CLI:

```bash
npm i -g wrangler
```

4. Grab your Account ID from your Cloudflare dashboard (click on Workers on the right). Put it into `wrangler.toml` in the `account_id` field.
5. Create a new API key in your Cloudflare account. Click on "Get your API token" under your Account ID, and create a new token with Permissions: Account > Workers Scripts > Edit.
6. Copy the API key.
7. Run `wrangler config`.
8. Enter the email address of your Cloudflare account, and paste in the API key.
9. Now publish the worker with `wrangler publish`
10. Copy the url of your deployed Cloudflare worker.

### Camunda Cloud Setup

1. Log in to your [Camunda Cloud](https://console.cloud.camunda.io/) account.
2. Go to the configuration screen for your cluster.
3. Click on "Worker Variables" next to the HTTP-Worker.
4. Create a new variable `slackWorkerUrl` and paste in your Cloudflare Worker url.
5. Create a new variable `slackWebhook` and paste in your Slack webhook url.

## Use

Check the `bpmn/test-message.bpmn` file for an example. 

To send a message to Slack in a business process, add a task with the Type "CAMUNDA-HTTP".

Set these Headers on the task:

url : ${slackWorkerUrl}
slackWebhook : ${slackWebhook}
method : post

You have two options for setting the message. 

1. You can hardcode a message in the task header.
2. You can set a `message` variable in the workflow.

Either way, any field that you want replaced by a variable from the workflow should be escaped like this: `{{ variable }}`.

The templating is performed using [micromustache](https://www.npmjs.com/package/micromustache).

In the example, the message is set in the headers: `Hello {{ name }}`. When the worker receives a job, it substitutes the value of the variable `name`. If you examine the file `bpmn/test.js`, you'll see that it kicks off a workflow setting the variable `name` to "World!", leading to the Slack message "Hello World!".

## Running the demo

1. Cd into the `bpmn` directory. 
2. Run `npm i`.
3. Grab your config from your Camunda Cloud account (create Client credentials for the cluster if you don't already have some in there).
4. Run the demo like this - substituting your configuration:

```bash
ZEEBE_ADDRESS=${YOUR CLUSTER CONTACT POINT} ZEEBE_CLIENT_ID=${CLIENT ID} ZEEBE_CLIENT_SECRET=${CLIENT SECRET} node index.js
```