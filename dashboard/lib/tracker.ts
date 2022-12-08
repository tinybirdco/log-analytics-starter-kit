import { NextRequest, userAgent } from 'next/server'

export async function track(
  req: NextRequest,
  functionName: string,
  functionData?: object
) {
  const { isBot, browser, device, engine, os, cpu } = userAgent(req)

  const data = {
    event_ts: new Date().toISOString(),
    ip_address: req.ip,
    city: req.geo ? req.geo.city : 'unknown',
    country: req.geo ? req.geo.country : 'unknown',
    region: req.geo ? req.geo.region : 'unknown',
    latitude: req.geo ? req.geo.latitude : 'unknown',
    longitude: req.geo ? req.geo.longitude : 'unknown',
    protocol: req.headers.get('x-forwarded-proto'),
    method: req.method,
    host: req.headers.get('host'),
    url: req.url,
    headers: Array.from(req.headers.keys()).join(','),
    useragent: req.headers.get('user-agent'),
    referer: req.headers.get('referer'),
    acceptencoding: req.headers.get('accept-encoding'),
    acceptlanguage: req.headers.get('accept-language'),
    acceptcharset: req.headers.get('accept-charset'),
    origin: req.headers.get('origin'),
    xforwaredforip: req.headers.get('x-forwarded-for'),
    connection: req.headers.get('connection'),
    cachecontrol: req.headers.get('cache-control'),
    contenttype: req.headers.get('content-type'),
    from: req.headers.get('from'),
    via: req.headers.get('via'),
    contentlength: req.headers.get('content-length'),
    isbot: isBot,
    browsername: browser.name ? browser.name : 'unknown',
    browserversion: browser.version ? browser.version : 'unknown',
    devicemodel: device.model ? device.model : 'unknown',
    devicetype: device.type ? device.type : 'unknown',
    devicevendor: device.vendor ? device.vendor : 'unknown',
    enginename: engine.name ? engine.name : 'unknown',
    engineversion: engine.version ? engine.version : 'unknown',
    osname: os.name ? os.name : 'unknown',
    osverison: os.version ? os.version : 'unknown',
    cpuarchitecture: cpu.architecture ? cpu.architecture : 'unknown',
    function_name: functionName,
    function_data: functionData
      ? JSON.stringify(functionData)
      : JSON.stringify({}),
  }

  await sendToTinybird(data)
}

async function sendToTinybird(data: Record<string, unknown>) {
  await fetch(
    `https://api.tinybird.co/v0/events?name=${process.env.TINYBIRD_DATASOURCE_NAME}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${process.env.TINYBIRD_TOKEN}` },
    }
  )
}
