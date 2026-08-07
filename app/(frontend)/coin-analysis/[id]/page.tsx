import CoinAnalysisContainer from '@/components/features/coin-analysis/coin-analysis-container';
import { Suspense } from 'react';

type Props = {
    params: Promise<{ id: string }>
    searchParams: Promise<Record<string, string | string[]>>
}

async function CoinAnalysis({ params }: Props) {
    const { id } = await params;

    return (
        <Suspense>
            <CoinAnalysisContainer
                coinId={id}
            />
        </Suspense>
    )
}

export default CoinAnalysis;