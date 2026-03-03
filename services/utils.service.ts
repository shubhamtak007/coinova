function roundOffNumber(value: number, decimalPlaces = 2) {
    if (!Number.isFinite(value) || !Number.isFinite(decimalPlaces)) return 0;

    const finalValue = Math.round((value + Number.EPSILON) * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    return finalValue;
}

function formatValueInUsdCompact(value: number, decimalPlaces: number, withCurrencySymbol?: boolean) {
    if (value === null || value === undefined) throw new Error('Value is undefined or null');

    if (typeof withCurrencySymbol !== "boolean") withCurrencySymbol = true;

    return new Intl.NumberFormat('en-US', {
        style: withCurrencySymbol === true ? 'currency' : undefined,
        currency: withCurrencySymbol === true ? 'USD' : undefined,
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
    return 50;
}

const getUiRoute = (pageName: string, properties: { id: string }) => {
    switch (pageName) {
        case 'coinAnalysis': { return `/coin-analysis/${properties.id}` }
        default: return null;
    }
}

function getCoinovaApiBaseUrl() {
    const url = `${globalThis.location?.origin}/api/`;
    return url;
}

export {
    roundOffNumber, formatValueInUsdCompact, formatValueIntoCommaSeparated,
    getRowsPerPageDefaultValue, getUiRoute, getCoinovaApiBaseUrl
}