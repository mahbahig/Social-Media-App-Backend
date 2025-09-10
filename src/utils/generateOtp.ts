export const GenerateOtp = (length: number = 6): string => {
    return Math.floor(Math.random() * Math.pow(10, length)).toString();
}