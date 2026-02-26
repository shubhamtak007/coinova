'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import useCoinDetailsDialog from '@/hooks/useCoinDetailsDialog';
import type { CoingeckoCrypto } from '@/interfaces/crypto-currency';

type Bindings = {
    showDialog: boolean,
    setShowDialog: (value: boolean) => void,
    coin: CoingeckoCrypto | null
}

function CoinDetailsDialog(bindings: Bindings) {
    if (!bindings.coin) return;
    const { showDialog, setShowDialog, coin } = bindings;
    const memoizeCoinDetailsDialogHook = useCallback(() => {
        return useCoinDetailsDialog({ coinId: coin.id });
    }, [coin.id]);

    const { fetchingCoinDetails, coinDetails } = memoizeCoinDetailsDialogHook();

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
                    <div>
                        {
                            fetchingCoinDetails ?
                                <div className="w-max mx-auto"><Spinner className="size-10" /></div> :
                                <>
                                    {coinDetails &&
                                        <div>
                                            <div className="text-[16px] font-semibold">
                                                What is {`${coinDetails.name[0].toUpperCase()}${coinDetails.name.slice(1)}`}?
                                            </div>

                                            <div className="text-[13px] mb-[8px]">
                                                {coinDetails?.description.en.split('.').slice(0, 3)}.
                                            </div>

                                            <div>

                                            </div>
                                        </div>
                                    }
                                </>
                        }
                    </div>
                </DialogBody>
            </DialogContent>
        </Dialog>
    )
}

export default React.memo(CoinDetailsDialog);