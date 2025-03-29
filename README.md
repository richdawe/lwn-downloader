# lwn-downloader

Download Linux Weekly news from LWN.net

## Setup

I use the nodejs provided by snap on Ubuntu. Unfortunately this causes installation issues with plain `npm install`, because the snap is confined and can't run the post-install scripts required by Puppeteer. This works on my system:

```bash
npm install --ignore-scripts
npx puppeteer browsers install chrome
npm run start
```

See also ["node 16 via snap fails to install puppeteer but it works with .deb node"](https://github.com/nodejs/snap/issues/25).
