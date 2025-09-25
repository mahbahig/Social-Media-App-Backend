import { devConfig } from "./config/dev.config";
import bootstrap from "./app";

const app = bootstrap();
const PORT: string | number = devConfig.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});