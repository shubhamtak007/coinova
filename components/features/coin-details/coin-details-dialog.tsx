'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import useCoinDetailsDialog from '@/hooks/useCoinDetailsDialog';
import type { CoingeckoCrypto } from '@/interfaces/crypto-currency';
import { FaReddit, FaGithub } from "react-icons/fa";
import { ExternalLink } from 'lucide-react';

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
                    <div className="coin-details-dialog-container">
                        {
                            fetchingCoinDetails ?
                                <div className="w-max mx-auto"><Spinner className="size-10" /></div> :
                                <>
                                    {coinDetails &&
                                        <div>
                                            <div className="text-[13px] mb-[12px]">
                                                {coinDetails.description}
                                            </div>

                                            <div>
                                                <table className="coin-details-table">
                                                    <tbody>
                                                        <tr>
                                                            <td>Website</td>
                                                            <td>
                                                                <a
                                                                    href={coinDetails.websiteUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center"
                                                                >
                                                                    {new URL(coinDetails.websiteUrl).hostname.replace('www.', '')}
                                                                    <ExternalLink className="ml-[4px] size-3" />
                                                                </a>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td>Socials</td>
                                                            <td>
                                                                <div className="social-container">
                                                                    {
                                                                        coinDetails.socialLinks.map((socialLink, index) => {
                                                                            return (
                                                                                <a
                                                                                    key={`${index}-${socialLink.name}`}
                                                                                    className="social-link-chip"
                                                                                    href={socialLink.url}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                >
                                                                                    <div className="icon">
                                                                                        {socialLink.name === 'Github' && <FaGithub name="github" />}
                                                                                        {socialLink.name === 'Reddit' && <FaReddit name="reddit" />}
                                                                                    </div>

                                                                                    <div className="name">
                                                                                        {socialLink.name}
                                                                                    </div>
                                                                                </a>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
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