'use client';

import useNavigationTabBar from '@/hooks/useNavigationTabBar';
import NewsDialog from '@/components/features/news/news-dialog';
import WatchlistDialog from '@/components/features/watchlist/watchlist-dialog';
import { Fragment } from 'react';
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import { navigationBarTabList } from '@/constants/app.constants';
import { Home } from 'lucide-react';
import { useUser } from '@/contexts/user.context';
import { DialogProps } from "@/interfaces/global.interface";

type SharedBindings = DialogProps;

export default function NavigationTabBar() {
    const { scrollEnded, activeTab, onTabClick, dialogType, showDialog, setShowDialog } = useNavigationTabBar();
    const { user } = useUser();

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
                        navigationBarTabList.map((tab: { id: string, name: string, value: string }) => {
                            return (
                                <Fragment key={tab.id}>
                                    {
                                        <TabsTrigger
                                            disabled={((!user || !user.id) && (tab.value === 'watchlist')) && true}
                                            value={tab.value}
                                            onClick={(event) => { onTabClick(event, tab.value) }}
                                            style={{ 'paddingInline': '7px' }}
                                        >
                                            {tab.name === 'Home' && <Home strokeWidth={2.5} className="size-4" />}
                                            {!['Home'].includes(tab.name) && tab.name}
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

