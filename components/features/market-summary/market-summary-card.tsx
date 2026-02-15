'use client';

import React, { useState } from "react";
import MarketSummaryCoins from '@/components/features/market-summary/market-summary-coins';
import { Item, ItemContent, ItemTitle } from '@/components/ui/item';
import { MarketSummaryItem } from '@/interfaces/market-summary';
import { ChevronRight } from 'lucide-react';
import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent, DialogDescription } from '@/components/ui/dialog';

interface Bindings {
    marketSummaryItem: MarketSummaryItem
}

function MarketSummaryCard({ marketSummaryItem }: Bindings) {
    const [showMarketSummaryItemCardDialog, setShowMarketSummaryItemCardDialog] = useState<boolean>(false);

    return (
        <>
            <Item
                key={marketSummaryItem.id}
                className="item border-[#ebeef5]"
                variant="outline"
            >
                <ItemContent>
                    <ItemTitle className="mb-[8px] text-[12px]">
                        <div>
                            {marketSummaryItem.title}
                        </div>

                        <div
                            onClick={() => { setShowMarketSummaryItemCardDialog(true) }}
                            className="more-link"
                        >
                            More <ChevronRight />
                        </div>
                    </ItemTitle>

                    <MarketSummaryCoins
                        noOfCoins={3}
                        key={marketSummaryItem.id}
                        marketSummaryItem={marketSummaryItem}
                    />
                </ItemContent>
            </Item>

            <Dialog
                open={showMarketSummaryItemCardDialog}
                onOpenChange={setShowMarketSummaryItemCardDialog}
            >
                <DialogTrigger asChild>

                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {marketSummaryItem.title}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="dialog-body">
                        <MarketSummaryCoins
                            noOfCoins={15}
                            key={marketSummaryItem.id}
                            marketSummaryItem={marketSummaryItem}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default React.memo(MarketSummaryCard);