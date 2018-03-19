'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const witToken = process.env.WIT_TOKEN;
const witClient = require('../server/witClient')(witToken);

const slackToken = process.env.SLACK_TOKEN;
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3010));

server.on('listening', function () {
    console.log(`IRIS-TIME is listening on ${server.address().port} in ${service.get('env')} mode.`);
});