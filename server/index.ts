import express from "express";
import next from "next";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";

const server = express();

const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();

(async () => {
  try {
    await nextServer.prepare();

    server.all("*", (req, res) => handle(req, res));

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
