'use client';

import { Fragment } from 'react';
import useBottomTabBar from '@/hooks/useBottomTabBar';
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import { House } from 'lucide-react';
import { GoHomeFill } from "react-icons/go";
import { FaGithub } from "react-icons/fa";
import { bottomBarTabList } from '@/constants/coin.constants';
import CoinSearchDialog from '@/components/features/coin-search/coin-search-dialog'

function BottomTabBar() {
    const { scrollEnded, activeTab, onTabClick, showCoinSearchDialog, setShowCoinSearchDialog } = useBottomTabBar();

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
                                                <FaGithub
                                                    className="size-5"
                                                />
                                            </a>
                                            :
                                            <TabsTrigger
                                                value={tab.value}
                                                onClick={(event) => { onTabClick(event, tab.value) }}
                                            >
                                                {tab.name === 'Home' ? <GoHomeFill
                                                    className="size-5"
                                                /> :
                                                    tab.name}
                                            </TabsTrigger>
                                    }
                                </Fragment>
                            )
                        })
                    }
                </TabsList>
            </Tabs>

            {
                showCoinSearchDialog === true &&
                <CoinSearchDialog
                    showDialog={showCoinSearchDialog}
                    setShowDialog={setShowCoinSearchDialog}
                />
            }
        </div>
    )
}

export default BottomTabBar;