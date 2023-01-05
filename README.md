# Asteroids

This is my clone of old Atari game with the same name. It's written entirely in `TypeScript` with use of [arrow-js](https://www.arrow-js.com/#watching-data)

## Before starting the application

Keep in mind, this application is not finished yet. To actually try it for yourself, you need to serve the compiled app somehow. (By node.js `http` module for example.)

**express server as example**

```javascript
import express from 'express';
import path from 'path';

const port = 5500;
const app = express();

app.get('/', express.static(path.resolve(__dirname, './dist/')));

app.listen(port, () => {
	console.log(`The server is now running at port: ${port}`);
});
```
