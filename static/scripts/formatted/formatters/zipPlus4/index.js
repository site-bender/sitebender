function zipPlus4(value) {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 9);
    if (digitsOnly.length > 5) {
        return `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5)}`;
    }
    return digitsOnly;
}
export { zipPlus4 as default };
