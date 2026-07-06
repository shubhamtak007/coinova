import Image from 'next/image';
import useCoinSearchDialog from '@/hooks/useCoinSearchDialog';
import { coinSymbolImageSize } from '@/constants/app.constants';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogContent, DialogFooter, DialogOverlay } from '@/components/ui/dialog';
import { CirclePlus, Search, X } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { Dispatch, SetStateAction } from 'react';

type Bindings = {
    showDialog: boolean,
    setShowDialog: Dispatch<SetStateAction<boolean>>,
    context?: string,
    contextProperties?: Record<string, string>,
    onDialogClose?: () => void,
    dialogNumber?: number
}

function CoinSearchDialog(bindings: Bindings) {
    let { showDialog, setShowDialog, context, contextProperties, onDialogClose, dialogNumber } = bindings;
    const {
        searchValue, setSearchValue, onSearchValueChange,
        searchingCoins, coins, onCoinClick, addCoinToActiveWatchlist
    } = useCoinSearchDialog({ setShowDialog, contextProperties, context });

    return (
        <div>
            <Dialog
                open={showDialog}
                onOpenChange={setShowDialog}
            >
                <DialogContent
                    closeOnOutsideClick={true}
                    onCloseAutoFocus={onDialogClose}
                    dialogNumber={dialogNumber}
                >
                    <DialogHeader
                        showCloseButton={false}
                        className="p-[unset]"
                    >
                        <DialogTitle className="font-normal">
                            <div>
                                <InputGroup className="w-full h-[40px] m-[12px] w-[stretch]">
                                    <InputGroupInput
                                        type="text"
                                        tabIndex={0}
                                        placeholder="Search coin"
                                        className="!text-[13px] h-[inherit]"
                                        value={searchValue}
                                        onChange={(event) => { onSearchValueChange(event) }}
                                    />

                                    <InputGroupAddon>
                                        <Search className="size-4" />
                                    </InputGroupAddon>

                                    <InputGroupAddon
                                        className={`clear-btn ${(searchValue && searchValue.length > 0) ? 'block' : 'hidden'}`}
                                        align="inline-end"
                                        onClick={() => { setSearchValue('') }}
                                    >
                                        <X />
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>

                            <DialogDescription className="text-[11px] m-[4px_0px] sr-only">
                                coin search dialog
                            </DialogDescription>
                        </DialogTitle>
                    </DialogHeader>

                    <DialogBody>
                        {
                            searchingCoins === true &&
                            <Spinner className="size-13 mx-auto" />
                        }

                        {
                            (searchingCoins === false && coins.length === 0) &&
                            <div className="no-value-text !text-center">No coins.</div>
                        }

                        {
                            (searchingCoins === false && coins.length > 0) &&
                            <>
                                <div className="text-gray-500 text-[12px] mb-[8px]">
                                    Search Results
                                </div>

                                <table className="cnv-borderless-table coin-search-table">
                                    <tbody>
                                        {
                                            coins.map((coin, index) => {
                                                return (
                                                    <tr
                                                        tabIndex={0}
                                                        key={coin.id}
                                                        onClick={(event) => { onCoinClick(event, coin); }}
                                                        onKeyDown={(event) => {
                                                            if (event.key === 'Enter') {
                                                                onCoinClick(event, coin);
                                                            }
                                                        }}
                                                    >
                                                        <td>
                                                            <div className="flex items-center">
                                                                <div className="pr-[8px]">
                                                                    {
                                                                        coin.large ? <Image
                                                                            className="coin-symbol-image"
                                                                            width={coinSymbolImageSize.width}
                                                                            height={coinSymbolImageSize.height}
                                                                            alt={`Image of ${coin.name}`}
                                                                            src={coin.large}
                                                                        /> :
                                                                            <div className="coin-letter-mark cursor-pointer">
                                                                                {coin.symbol[0]}
                                                                            </div>
                                                                    }
                                                                </div>

                                                                <div
                                                                    className="crypto-symbol cursor-pointer"
                                                                >
                                                                    {coin.name}
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {
                                                            (context === 'watchlist') &&
                                                            <td
                                                                className="place-items-end"
                                                                onClick={(event) => {
                                                                    event?.stopPropagation();
                                                                    event?.preventDefault();
                                                                    addCoinToActiveWatchlist(coin);
                                                                }}
                                                            >
                                                                {
                                                                    (coin.loading === true) ? <Spinner className="size-5" /> :
                                                                        <CirclePlus className="size-5" />
                                                                }
                                                            </td>
                                                        }
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </>
                        }
                    </DialogBody>

                    <DialogFooter>
                        <div className="text-[.75em] text-[grey] text-right">
                            Click the coin to go to the analysis page.
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default CoinSearchDialog;