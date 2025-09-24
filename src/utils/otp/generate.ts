/**
 * @param length - Length of the OTP to be generated, default is 6.
 * @returns A numeric OTP of the specified length.
 */
export const GenerateOtp = (length: number = 6): string => {
    return Math.floor(Math.random() * Math.pow(10, length)).toString();
};
