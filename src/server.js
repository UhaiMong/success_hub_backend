import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

let server;
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url);
    console.log(`🛢Database is connected successfully`);
    server = app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }

  process.on("uncaughtException", (error) => {
    if (server) {
      server.close(() => {
        console.log(error);
      });
    } else {
      process.exit(1);
    }
    process.exit(1);
  });
}

bootstrap();

process.on("SIGTERM", (error) => {
  console.log(error);
  if (server) {
    server.close();
  }
});
