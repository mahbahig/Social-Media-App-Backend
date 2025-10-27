import { devConfig } from "./config/dev.config";
import bootstrap from "./app";
import { initSocket } from "./socket";
import { Server as HttpServer } from "http";

const app = bootstrap();
const PORT: string | number = devConfig.PORT || 5000;

const server: HttpServer = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

initSocket(server);