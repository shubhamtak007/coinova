'use client';

import useNavigationTabBar from '@/hooks/useNavigationTabBar';
import NewsDialog from '@/components/features/news/news-dialog';
import WatchlistDialog from '@/components/features/watchlist/watchlist-dialog';
import { Fragment } from 'react';
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import { Home, Lock } from 'lucide-react';
import { DialogProps } from "@/interfaces/global.interface";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type SharedBindings = DialogProps;

export default function NavigationTabBar() {
    const {
        scrollEnded, activeTab, onTabClick, dialogType, showDialog,
        setShowDialog, tabList
    } = useNavigationTabBar();

    return (
        <div
            className={`navigation-tab-bar`}
        >
            <Tabs
                className={`${scrollEnded === true && 'remove-shadow'}`}
                defaultValue={'home'}
                value={activeTab}
            >
                <TabsList>
                    {
                        tabList.map((tab) => {
                            return (
                                <Fragment key={tab.id}>
                                    {
                                        <TabsTrigger
                                            disabled={tab.disabled}
                                            value={tab.value}
                                            onClick={(event) => { onTabClick(event, tab.value) }}
                                            style={{ 'paddingInline': '7px' }}
                                        >
                                            {(tab.name === 'Home') && <Home strokeWidth={2.5} className="size-4" />}
                                            {
                                                ((tab.name === 'Watchlist') && tab.disabled) &&
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div>
                                                            <Lock strokeWidth={2.5} className="size-3" />
                                                        </div>
                                                    </TooltipTrigger>

                                                    <TooltipContent
                                                        side="top"
                                                        className="!z-60"
                                                    >
                                                        Please sign in to add coins to your watchlist.
                                                    </TooltipContent>
                                                </Tooltip>
                                            }
                                            {(tab.value !== 'home') && tab.name}
                                        </TabsTrigger>
                                    }
                                </Fragment>
                            )
                        })
                    }
                </TabsList>
            </Tabs>

            {(showDialog === true) &&
                <>
                    {(dialogType === 'news') && showNewsDialog({ showDialog, setShowDialog })}
                    {(dialogType === 'watchlist') && showWatchlistDialog({ showDialog, setShowDialog })}
                </>
            }
        </div>
    )
}

function showWatchlistDialog({ showDialog, setShowDialog }: SharedBindings) {
    return (
        <WatchlistDialog
            showDialog={showDialog}
            setShowDialog={setShowDialog}
        />
    )
}

function showNewsDialog({ showDialog, setShowDialog }: SharedBindings) {
    return (
        <NewsDialog
            showDialog={showDialog}
            setShowDialog={setShowDialog}
        />
    )
}

