function isbn13(digits) {
    const parts = [];
    if (digits.length > 0) {
        parts.push(digits.slice(0, 3));
    }
    if (digits.length > 3) {
        parts.push(digits.slice(3, 4));
    }
    if (digits.length > 4) {
        parts.push(digits.slice(4, 9));
    }
    if (digits.length > 9) {
        parts.push(digits.slice(9, 12));
    }
    if (digits.length > 12) {
        parts.push(digits.slice(12));
    }
    return parts.join('-');
}
export { isbn13 as default };
