'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogDescription } from '@/components/ui/dialog';
import type { CoinDetailsDialogCoin } from '@/interfaces/coin.interface';
import React from 'react';
import Image from 'next/image';
import CoinDetailsBlock from '@/components/features/coin-details/coin-details-block';
import { coinSymbolImageSize } from '@/constants/app.constants';

type Bindings = {
    showDialog: boolean,
    setShowDialog: (value: boolean) => void,
    coin: CoinDetailsDialogCoin | null,
    dialogNumber?: number
}

function CoinDetailsDialog(bindings: Bindings) {
    const { showDialog, setShowDialog, coin, dialogNumber } = bindings;

    return (
        <Dialog
            open={showDialog}
            onOpenChange={setShowDialog}
        >
            <DialogContent dialogNumber={dialogNumber} size="sm">
                <DialogHeader>
                    <DialogTitle>
                        {coin && <div className="flex items-center">
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
                        </div>}

                        <DialogDescription
                            className="text-[11px] m-[4px_0px] sr-only"
                        >
                            {coin && coin.name} details dialog
                        </DialogDescription>
                    </DialogTitle>
                </DialogHeader>

                <DialogBody>
                    {coin && <CoinDetailsBlock
                        coinId={coin.id}
                    />}
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}

export default React.memo(CoinDetailsDialog);