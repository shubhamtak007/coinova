import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { DialogProps } from "@/interfaces/global.interface";
import { Button } from "@/components/ui/button";
import { CirclePlus, TrashIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import useWatchlistDialog from "@/hooks/useWatchlistDialog";
import WatchlistFormDialog from "./watchlist-form-dialog";
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";

type SharedBindings = DialogProps;
type Bindings = {} & SharedBindings;

export default function WatchlistDialog(bindings: Bindings) {
    const { showDialog, setShowDialog } = bindings;
    const {
        showCreateWatchlistDialog, setShowCreateWatchlistDialog, fetchingWatchlists,
        watchlists, onWatchlistClick, activeWatchlist, fetchingWatchlistCoins, watchlistCoins,
        onCreateWatchlistDialogClose, watchlistContextMenuList, onContextMenuItemClicked
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
                        {mountWatchlistCoins({ fetchingWatchlists, watchlists, fetchingWatchlistCoins, watchlistCoins })}
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
                    showDialog={showCreateWatchlistDialog}
                    setShowDialog={setShowCreateWatchlistDialog}
                    onDialogClose={onCreateWatchlistDialogClose}
                >
                </WatchlistFormDialog>
            }
        </>
    )
}

function mountWatchlists(props: any) {
    const { fetchingWatchlists, watchlists, onWatchlistClick, activeWatchlist, watchlistContextMenuList, onContextMenuItemClicked } = props;

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

                                            <ContextMenuContent className="!z-[201]">
                                                <ContextMenuGroup>
                                                    {
                                                        watchlistContextMenuList.map((menu: Record<string, string>) => {
                                                            return (
                                                                <ContextMenuItem
                                                                    variant={`${(menu.name === 'Delete') ? 'destructive' : 'default'}`}
                                                                    key={menu.id}
                                                                    onSelect={(event) => onContextMenuItemClicked(watchlist, menu, event)}
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
    const { fetchingWatchlists, watchlists, fetchingWatchlistCoins, watchlistCoins } = props;

    return (
        ((watchlists.length > 0) && (fetchingWatchlists) === false) &&
        <>
            {
                (fetchingWatchlistCoins === true) ?
                    <div className="m-auto w-max">
                        <Spinner className="size-8" />
                    </div>
                    :
                    (watchlistCoins.length > 0) ?
                        <div></div> :
                        <div className="m-auto w-max">
                            <Button
                                variant={"secondary"}
                                onClick={() => { }}
                            >
                                <CirclePlus /> Add Coins
                            </Button>
                        </div>
            }
        </>
    )
}