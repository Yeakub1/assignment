import { Server } from "http";
import app from "./app";
import Config from "./app/Config";

async function main() {
  const server: Server = app.listen(Config.port, () => {
    console.log("server is reunning on port", Config.port);
  });
}

main();
