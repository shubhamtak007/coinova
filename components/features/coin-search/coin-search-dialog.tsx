import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Dialog, DialogHeader, DialogTitle, DialogBody, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Search, X } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner';
import useCoinSearchDialog from '@/hooks/useCoinSearchDialog';
import Image from 'next/image';

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
                    closeOnOutsideClick={true}
                    style={{ '--dialog-body-height': '60vh' } as React.CSSProperties}
                >
                    <DialogHeader
                        showCloseButton={false}
                        className="p-[unset]"
                    >
                        <DialogTitle className="font-normal">
                            <InputGroup className="w-full h-[40px] m-[12px] w-[stretch]">
                                <InputGroupInput
                                    className="!text-[13px] h-[inherit]"
                                    placeholder="Search for the coin you want to analyze"
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
                            <Spinner className="size-12 mx-auto" />
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
                                                        key={coin.id}
                                                        className="cursor-pointer hover:bg-[#f2f3f8]"
                                                        onClick={(event) => { onCoinClick(event, coin); }}
                                                    >
                                                        <td className={`!p-[8px_10px] mb-[4px]
                                                                        rounded-[var(--border-radius)]`}
                                                        >
                                                            <div className="flex items-center">
                                                                <div className="pr-[8px]">
                                                                    {
                                                                        coin.large ? <Image
                                                                            className="object-contain rounded-[10px]"
                                                                            width={23}
                                                                            height={23}
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