const coinKeyList = [
    {
        name: 'Market Cap.',
        key: 'market_cap',
        toolTipValue: `Refers to the total market value of a cryptocurrency’s circulating supply. It is similar to the\
        stock market’s measurement of multiplying price per share by shares readily available in the market (not held\
        & locked by insiders, governments).

        Market Cap = Current Price x Circulating Supply.`
    }, {
        name: 'Fully Diluted Valuation',
        key: 'fully_diluted_valuation',
        toolTipValue: `Fully Diluted Valuation (FDV) = Current Price x Total Supply.
                \nFully Diluted Valuation (FDV) is the theoretical market capitalization of a coin if the entirety\
                of its supply is in circulation, based on its current market price. The FDV value is theoretical as\
                increasing the circulating supply of a coin may impact its market price. Also depending on the\
                tokenomics, emission schedule or lock-up period of a coin's supply, it may take a significant time\
                before its entire supply is released into circulation.`
    }, {
        name: 'Circulating Supply',
        key: 'circulating_supply',
        toolTipValue: `The amount of coins that are circulating in the market and are tradeable by the public. It is\
        comparable to looking at shares readily available in the market (not held & locked by insiders, governments).`
    }, {
        name: 'Total Supply',
        key: 'total_supply',
        toolTipValue: `The amount of coins that have already been created, minus any coins that have been burned\
                        (removed from circulation).\ It is comparable to outstanding shares in the stock market.
                        \nTotal Supply = Onchain supply - burned tokens.`
    }, {
        name: 'Max. Supply',
        key: 'max_supply',
        toolTipValue: `The maximum number of coins coded to exist in the lifetime of the cryptocurrency. It is\
                        comparable to the maximum number of issuable shares in the stock market.
                        \nMax Supply = Theoretical maximum as coded.`
    }, {
        name: 'Total Volume',
        key: 'total_volume',
        toolTipValue: `the total amount of a specific digital asset bought and sold on exchanges within a specific timeframe,\ most commonly measured over 24 hours.`
    }
]

const timeFrameList = [
    { name: '24H', value: '1' },
    { name: '7D', value: '7' },
    { name: '14D', value: '14' },
    { name: '1M', value: '30' },
    { name: '200D', value: '200' },
    { name: '1Y', value: '365' }
]

const chartViewList = [
    { name: 'Price', value: 'price' },
    { name: 'Volume', value: 'volume' },
    { name: 'Market Capital', value: 'marketCapital' }
]

export { coinKeyList, timeFrameList, chartViewList };