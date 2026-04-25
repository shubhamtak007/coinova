'use client';

import useBottomTabBar from '@/hooks/useBottomTabBar';
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import { House } from 'lucide-react';
import { FiGithub } from "react-icons/fi";
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
                                <TabsTrigger
                                    key={tab.id}
                                    value={tab.value}
                                    onClick={(event) => { onTabClick(event, tab.value) }}
                                >
                                    {
                                        tab.name === 'Home' ? <House
                                            className="size-4"
                                            absoluteStrokeWidth={true}
                                            strokeWidth={3}
                                        /> :
                                            tab.name === 'Github' ? <FiGithub
                                                className="size-4"
                                                strokeWidth={3}
                                            /> :
                                                tab.name
                                    }
                                </TabsTrigger>
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