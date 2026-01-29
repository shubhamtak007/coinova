async function CoinDetails({ params, }: { params: Promise<{ symbol: string }> }) {
    const { symbol } = await params;

    return (
        <div className="text-center font-medium text-[18px] mt-[30px]">
            Page is on its way.
        </div>
    )
}

export default CoinDetails;