import CoinDetailsContainer from '@/components/features/coin-details/coin-details-container';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;

    return {
        title: id.charAt(0).toUpperCase() + id.slice(1)
    }
}

async function CoinDetails({ params, searchParams }: Props) {
    const { id } = await params;

    return (
        <CoinDetailsContainer
            coinId={id}
        />
    )
}

export default CoinDetails;