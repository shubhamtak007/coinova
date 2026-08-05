import CoinAnalysisContainer from '@/components/features/coin-analysis/coin-analysis-container';

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<Record<string, string | string[]>>
}

async function CoinAnalysis({ params }: Props) {
    const { id } = await params;

    return (
        <CoinAnalysisContainer
            coinId={id}
        />
    )
}

export default CoinAnalysis;