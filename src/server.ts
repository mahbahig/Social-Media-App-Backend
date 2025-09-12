import bootstrap from "./app";

const app = bootstrap();
const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});