const express = require('express');
const ntpClient = require('ntp-client');

const app = express();
const port = process.env.APP_PORT || 4040;
const host = process.env.APP_HOST || '0.0.0.0';

const ntpServers = ['time.apple.com'];

const getNtpTime = async () => {
  return await new Promise((success, failure) => {
    ntpClient.getNetworkTime(ntpServers[0], 123, (err, data) => {
      if (err) {
        failure(err);
      } else {
        success(data);
      };
    });
  });
};

app.get('/', (req, res) => {
  res.render('index', {
    plainUrl: req.protocol + '://' + req.get('Host') + req.url
  });
});

app.get('/plain/ntp', async (req, res) => {
  res.send(await getNtpTime());
});

app.set('view engine', 'ejs')

app.listen(port, host, () => {
  console.log(`Start serving requests at http://${host}:${port}`);
});