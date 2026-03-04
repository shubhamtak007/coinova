'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody } from '@/components/ui/dialog';
import type { CoingeckoCrypto } from '@/interfaces/coin.interface';
import React from 'react';
import Image from 'next/image';
import CoinDetailsBlock from '@/components/features/coin-details/coin-details-block';

type Bindings = {
    showDialog: boolean,
    setShowDialog: (value: boolean) => void,
    coin: CoingeckoCrypto | null
}

function CoinDetailsDialog(bindings: Bindings) {
    if (!bindings.coin) return;
    const { showDialog, setShowDialog, coin } = bindings;

    return (
        <Dialog
            open={showDialog}
            onOpenChange={setShowDialog}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex items-center">
                            {
                                coin.image ?
                                    <Image
                                        className="object-cover rounded-[10px]"
                                        width={22}
                                        height={22}
                                        alt={`Image of ${coin.name}`}
                                        src={coin.image}
                                    />
                                    :
                                    <div className="coin-letter-mark">
                                        {coin.symbol[0].toUpperCase()}
                                    </div>
                            }

                            <span className="ml-[6px]"> {coin.name}</span>
                        </div>
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