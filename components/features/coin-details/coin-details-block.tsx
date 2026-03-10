'use client';

import { useCallback } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { FaReddit, FaGithub } from "react-icons/fa";
import { ExternalLink } from 'lucide-react';
import { formatValueIntoCommaSeparated } from '@/services/utils.service';
import useCoinDetailsDialog from '@/hooks/useCoinDetailsDialog';

type Bindings = {
    coinId: string
}

export default function CoinDetailsBlock({ coinId }: Bindings) {
    const memoizeCoinDetailsBlockHook = useCallback(() => {
        return useCoinDetailsDialog({ coinId: coinId });
    }, [coinId]);

    const { fetchingCoinDetails, coinDetails } = memoizeCoinDetailsBlockHook();

    return (
        <div className="coin-details-wrapper">
            {
                fetchingCoinDetails ?
                    <div className="w-max mx-auto"><Spinner className="size-10" /></div> :
                    <>
                        {coinDetails &&
                            <div>
                                {coinDetails.description && <div className="text-[13px] mb-[12px]">
                                    {coinDetails.description}
                                </div>}

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

                                        <tr>
                                            <td>Current Price</td>
                                            <td>
                                                {coinDetails.currentPrice &&
                                                    formatValueIntoCommaSeparated(coinDetails.currentPrice, 5, true)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                    </>
            }
        </div>
    )
}