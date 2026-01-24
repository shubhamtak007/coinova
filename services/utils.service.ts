function roundOffNumber(value: number, decimalPlaces: number) {
    if (value === null || value === undefined) {
        console.trace();
        throw new Error('Value is undefined or null');
    }
    return Math.round((value + Number.EPSILON) * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
}

function formatValueInUsdCompact(value: number, decimalPlaces: number) {
    if (value === null || value === undefined) throw new Error('Value is undefined or null');

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: decimalPlaces ? decimalPlaces : 0
    }).format(value);
}

function formatValueIntoCommaSeparated(value: number, decimalPlaces?: number | null, withCurrencySymbol?: boolean) {
    if (value === null || value === undefined) throw new Error('Value is undefined or null');

    const roundOffValue = roundOffNumber(value, decimalPlaces ? decimalPlaces : 0);

    return new Intl.NumberFormat('en-US', {
        style: withCurrencySymbol ? 'currency' : undefined,
        currency: withCurrencySymbol ? 'USD' : undefined,
        maximumFractionDigits: !Number.isInteger(roundOffValue) ? (decimalPlaces ? decimalPlaces : 0) : 0
    }).format(roundOffValue);
}

function getRowsPerPageDefaultValue() {
    return 10;
}

export { roundOffNumber, formatValueInUsdCompact, formatValueIntoCommaSeparated, getRowsPerPageDefaultValue }