'use client';

import useBottomTabBar from '@/hooks/useBottomTabBar';
import CoinSearchDialog from '@/components/features/coin-search/coin-search-dialog';
import NewsDialog from '@/components/features/news/news-dialog';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import { FiGithub } from "react-icons/fi";
import { bottomBarTabList } from '@/constants/app.constants';
import { Home, Search } from 'lucide-react';

type SharedBindings = {
    showDialog: boolean,
    setShowDialog: Dispatch<SetStateAction<boolean>>
}

function BottomTabBar() {
    const { scrollEnded, activeTab, onTabClick, dialogType, showDialog, setShowDialog } = useBottomTabBar();

    return (
        <div
            className={`bottom-tab-bar`}
        >
            <Tabs
                className={`${scrollEnded === true && 'remove-shadow'}`}
                defaultValue={'home'}
                value={activeTab}
            >
                <TabsList>
                    {
                        bottomBarTabList.map((tab: { id: string, name: string, value: string }) => {
                            return (
                                <Fragment key={tab.id}>
                                    {
                                        tab.name === 'Github' ?
                                            <a
                                                href="https://github.com/shubhamtak007/coinova"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`max-h-[38px] max-w-[33px]`}
                                            >
                                                <FiGithub
                                                    className="size-4 m-auto"
                                                />
                                            </a>
                                            :
                                            <TabsTrigger
                                                value={tab.value}
                                                onClick={(event) => { onTabClick(event, tab.value) }}
                                                style={{ 'paddingInline': '7px' }}
                                            >
                                                {tab.name === 'Home' && <Home className="size-4" />}
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
                    {(dialogType === 'coinSearch') && showCoinSearchDialog({ showDialog, setShowDialog })}
                    {(dialogType === 'news') && showNewsDialog({ showDialog, setShowDialog })}
                </>
            }
        </div>
    )
}

function showCoinSearchDialog({ showDialog, setShowDialog }: SharedBindings) {
    return (
        <CoinSearchDialog
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

export default BottomTabBar;