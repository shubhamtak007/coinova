import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { DialogProps } from "@/interfaces/global.interface";
import { Button } from "@/components/ui/button";
import { CirclePlus, TrashIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import Image from "next/image";
import useWatchlistDialog from "@/hooks/useWatchlistDialog";
import WatchlistFormDialog from "./watchlist-form-dialog";
import CoinSearchDialog from "@/components/features/coin-search/coin-search-dialog";

type SharedBindings = DialogProps;
type Bindings = {} & SharedBindings;

export default function WatchlistDialog(bindings: Bindings) {
    const { showDialog, setShowDialog } = bindings;
    const {
        showCreateWatchlistDialog, setShowCreateWatchlistDialog, fetchingWatchlists,
        watchlists, onWatchlistClick, activeWatchlist, fetchingWatchlistCoins, watchlistCoins,
        onCreateWatchlistDialogClose, watchlistContextMenuList, onContextMenuItemClicked,
        showCoinSearchDialog, setShowCoinSearchDialog, onCoinSearchDialogClose,
        showWatchlistDeleteDialog, setShowWatchlistDeleteDialog, deleteWatchlist,
        deletingWatchlist, setDeletingWatchlist, onDeleteDialogClose
    } = useWatchlistDialog();

    return (
        <>
            <Dialog
                open={showDialog}
                onOpenChange={setShowDialog}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Watchlist
                        </DialogTitle>

                        <DialogDescription className="sr-only">
                            watchlist dialog
                        </DialogDescription>
                    </DialogHeader>

                    <DialogBody>
                        {mountWatchlists({ fetchingWatchlists, watchlists, onWatchlistClick, activeWatchlist, watchlistContextMenuList, onContextMenuItemClicked })}
                        {mountWatchlistCoins({ fetchingWatchlists, watchlists, fetchingWatchlistCoins, watchlistCoins, showCoinSearchDialog, setShowCoinSearchDialog, activeWatchlist, onCoinSearchDialogClose })}
                    </DialogBody>

                    <DialogFooter className="justify-center">
                        <Button
                            variant={"secondary"}
                            onClick={() => { setShowCreateWatchlistDialog(true) }}
                            disabled={fetchingWatchlists}
                        >
                            <CirclePlus />Create Watchlist
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {(showCreateWatchlistDialog === true) &&
                <WatchlistFormDialog
                    dialogNumber={2}
                    showDialog={showCreateWatchlistDialog}
                    setShowDialog={setShowCreateWatchlistDialog}
                    onDialogClose={onCreateWatchlistDialogClose}
                >
                </WatchlistFormDialog>
            }

            {(showWatchlistDeleteDialog === true) &&
                createWatchlistDeleteDialog({
                    showWatchlistDeleteDialog, setShowWatchlistDeleteDialog, deleteWatchlist, deletingWatchlist,
                    onDeleteDialogClose
                })
            }
        </>
    )
}

function mountWatchlists(props: any) {
    const {
        fetchingWatchlists, watchlists, onWatchlistClick, activeWatchlist,
        watchlistContextMenuList, onContextMenuItemClicked
    } = props;

    return (
        (fetchingWatchlists === true) ? <Skeleton className="h-[34px] w-full" /> :
            (watchlists && watchlists.length > 0) ?
                <div className={`navigation-tab-bar mb-[12px]`}>
                    <Tabs
                        defaultValue={watchlists[0].name}
                        value={activeWatchlist?.name}
                        className="!mx-[unset] !items-start"
                    >
                        <TabsList>
                            {
                                watchlists.map((watchlist: Record<string, string>) => {
                                    return (
                                        <ContextMenu
                                            key={watchlist.id}
                                        >
                                            <ContextMenuTrigger>
                                                <TabsTrigger
                                                    className="h-[25px]"
                                                    value={watchlist.name}
                                                    onClick={(event) => { onWatchlistClick(event, watchlist) }}
                                                >
                                                    {watchlist.name}
                                                </TabsTrigger>
                                            </ContextMenuTrigger>

                                            <ContextMenuContent className="z-[201]">
                                                <ContextMenuGroup>
                                                    {
                                                        watchlistContextMenuList.map((menu: Record<string, string>) => {
                                                            return (
                                                                <ContextMenuItem
                                                                    variant={`${(menu.name === 'Delete') ? 'destructive' : 'default'}`}
                                                                    key={menu.id}
                                                                    onSelect={(event) => onContextMenuItemClicked(watchlist, menu, event)}
                                                                    disabled={(activeWatchlist.id === watchlist.id) && true}
                                                                >
                                                                    {menu.name}
                                                                </ContextMenuItem>
                                                            )
                                                        })
                                                    }
                                                </ContextMenuGroup>
                                            </ContextMenuContent>
                                        </ContextMenu>
                                    )
                                })
                            }
                        </TabsList>
                    </Tabs>
                </div> :
                <div className="no-value-text !text-center">No watchlist found</div>
    )
}

function mountWatchlistCoins(props: any) {
    const {
        fetchingWatchlists, watchlists, fetchingWatchlistCoins, watchlistCoins,
        showCoinSearchDialog, setShowCoinSearchDialog, activeWatchlist, onCoinSearchDialogClose
    } = props;

    return (
        ((watchlists.length > 0) && (fetchingWatchlists) === false) &&
        <>
            {
                (fetchingWatchlistCoins === true) ?
                    <div className="m-auto w-max">
                        <Spinner className="size-8" />
                    </div>
                    :
                    <>
                        {
                            (watchlistCoins.length > 0) ?
                                <table className="cnv-table watchlist-coins-table">
                                    <tbody>
                                        {
                                            watchlistCoins.map((watchlistCoin: Record<string, string>, index: number) => {
                                                return (
                                                    <tr key={watchlistCoin.id}>
                                                        <td className="!w-[30px] text-center">{index + 1}</td>

                                                        <td>
                                                            <div className="flex items-center">
                                                                <div className="pr-[8px]">
                                                                    {
                                                                        watchlistCoin.imageUrl ? <Image
                                                                            className="object-cover"
                                                                            width={21}
                                                                            height={21}
                                                                            alt={`Image of ${watchlistCoin.name}`}
                                                                            src={watchlistCoin.imageUrl}
                                                                        /> :
                                                                            <div className="coin-letter-mark cursor-pointer">
                                                                                {watchlistCoin.symbol[0]}
                                                                            </div>
                                                                    }
                                                                </div>

                                                                <div>
                                                                    {watchlistCoin.name}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                :
                                <div className="no-value-text !text-center mb-[12px]">
                                    No coins added
                                </div>
                        }

                        <div className="m-auto w-max">
                            <Button
                                variant={"secondary"}
                                onClick={() => { setShowCoinSearchDialog(true); }}
                            >
                                <CirclePlus /> Add Coins
                            </Button>
                        </div>
                    </>
            }

            {
                (showCoinSearchDialog === true) &&
                <CoinSearchDialog
                    dialogNumber={2}
                    showDialog={showCoinSearchDialog}
                    setShowDialog={setShowCoinSearchDialog}
                    context={'watchlist'}
                    contextProperties={activeWatchlist}
                    onDialogClose={onCoinSearchDialogClose}
                />
            }
        </>
    )
}

function createWatchlistDeleteDialog(props: any) {
    const { showWatchlistDeleteDialog, setShowWatchlistDeleteDialog, deleteWatchlist, deletingWatchlist, onDeleteDialogClose } = props;

    return (
        <Dialog
            open={showWatchlistDeleteDialog}
            onOpenChange={setShowWatchlistDeleteDialog}
        >
            <DialogContent
                dialogNumber={2}
                onCloseAutoFocus={onDeleteDialogClose}
            >
                <DialogHeader disableCloseButton={deletingWatchlist}>
                    <DialogTitle>
                        Delete Watchlist

                        <DialogDescription className="sr-only">watchlist delete dialog</DialogDescription>
                    </DialogTitle>
                </DialogHeader>

                <DialogBody>
                    <h3>
                        Are you sure you want to delete this watchlist?
                    </h3>
                </DialogBody>

                <DialogFooter className="justify-center">
                    <Button
                        variant={'destructive'}
                        onClick={() => { deleteWatchlist() }}
                        disabled={deletingWatchlist}
                    >
                        {deletingWatchlist && <Spinner />} Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}