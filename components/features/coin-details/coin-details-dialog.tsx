'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogDescription } from '@/components/ui/dialog';
import type { CoinDetailsDialogCoin } from '@/interfaces/coin.interface';
import React from 'react';
import Image from 'next/image';
import CoinDetailsBlock from '@/components/features/coin-details/coin-details-block';
import { coinSymbolImageSize } from '@/constants/coin.constants';

type Bindings = {
    showDialog: boolean,
    setShowDialog: (value: boolean) => void,
    coin: CoinDetailsDialogCoin | null
}

function CoinDetailsDialog(bindings: Bindings) {
    if (!bindings.coin) return;
    const { showDialog, setShowDialog, coin } = bindings;

    return (
        <Dialog
            open={showDialog}
            onOpenChange={setShowDialog}
        >
            <DialogContent
            >
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center">
                            {
                                coin.image ?
                                    <Image
                                        className="coin-symbol-image"
                                        width={coinSymbolImageSize.width}
                                        height={coinSymbolImageSize.height}
                                        alt={`Image of ${coin.name}`}
                                        src={coin.image}
                                    />
                                    :
                                    <div className="coin-letter-mark">
                                        {coin.symbol[0].toUpperCase()}
                                    </div>
                            }

                            <span className="ml-[6px]">{coin.name}</span>
                        </div>

                        <DialogDescription
                            className="text-[11px] m-[4px_0px] sr-only"
                        >
                            {coin.name} details dialog
                        </DialogDescription>
                    </DialogTitle>
                </DialogHeader>

                <DialogBody>
                    <CoinDetailsBlock
                        coinId={coin.id}
                    />
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}

export default React.memo(CoinDetailsDialog);