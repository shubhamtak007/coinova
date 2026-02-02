import CoinDetailsContainer from '@/components/features/coin-details/coin-details-container';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: { details: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { name } = parseDetails(params.details);

    return {
        title: name
    }
}

function CoinDetails({ params, searchParams }: Props) {
    const { symbol, name } = parseDetails(params.details);

    return (
        <CoinDetailsContainer
            name={name}
            symbol={symbol}
        />
    )
}

function parseDetails(details: string) {
    const symbol = decodeURIComponent(details).split('+')[0].toUpperCase();
    const name = decodeURIComponent(details).split('+')[1];

    return {
        symbol: symbol,
        name: name
    }
}

export default CoinDetails;