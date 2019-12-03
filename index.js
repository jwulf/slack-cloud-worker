const micromustache = require('micromustache')
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    const body = await request.json()
    const message = request.headers.get('message') || body.message || ''

    const renderedMessage = micromustache.render(message || '', body || {})
    const slackwebhook = request.headers.get('slackwebhook')
    const channel = request.headers.get('channel')

    await fetch(slackwebhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: channel || '#general',
        text: renderedMessage,
      }),
    })
  }

  return new Response(
    {},
    {
      headers: { 'content-type': 'application/json' },
    },
  )
}
