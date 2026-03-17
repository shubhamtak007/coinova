import Image from 'next/image';
import useCoinSearchDialog from '@/hooks/useCoinSearchDialog';
import { coinSymbolImageSize } from '@/constants/coin.constants';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Dialog, DialogHeader, DialogTitle, DialogBody, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Search, X } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

type Bindings = {
    showDialog: boolean,
    setShowDialog: (value: boolean) => void
}

function CoinSearchDialog(bindings: Bindings) {
    const { showDialog, setShowDialog } = bindings;
    const {
        searchValue, setSearchValue, onSearchValueChange,
        searchingCoins, coins, onCoinClick
    } = useCoinSearchDialog({ setShowDialog });

    return (
        <div>
            <Dialog
                open={showDialog}
                onOpenChange={setShowDialog}
            >
                <DialogContent
                    style={{ '--dialog-body-height': '60vh' } as React.CSSProperties}
                    closeOnOutsideClick={true}
                >
                    <DialogHeader
                        showCloseButton={false}
                        className="p-[unset]"
                    >
                        <DialogTitle className="font-normal">
                            <InputGroup className="w-full h-[40px] m-[12px] w-[stretch]">
                                <InputGroupInput
                                    type="text"
                                    tabIndex={0}
                                    placeholder="Search for the coin you want to analyze"
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

                                <table className="coins-table">
                                    <tbody>
                                        {
                                            coins.map((coin, index) => {
                                                return (
                                                    <tr
                                                        tabIndex={0}
                                                        key={coin.id}
                                                        className={`cursor-pointer hover:bg-[#f2f3f8]
                                                                outline-[#2663eb] rounded-[var(--border-radius)]
                                                            `}
                                                        onClick={(event) => { onCoinClick(event, coin); }}
                                                        onKeyDown={(event) => {
                                                            if (event.key === 'Enter') {
                                                                onCoinClick(event, coin);
                                                            }
                                                        }}
                                                    >
                                                        <td className={`!p-[8px_10px] mb-[4px]
                                                                        rounded-[var(--border-radius)]`}
                                                        >
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