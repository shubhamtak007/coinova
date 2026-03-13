'use client';

import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import { House } from 'lucide-react';
import useBottomTabBar from '@/hooks/useBottomTabBar';
import { bottomBarTabList } from '@/constants/coin.constants';

function BottomTabBar() {
    const { activeTab, onTabChange } = useBottomTabBar();

    return (
        <div className="bottom-tab-bar">
            <Tabs
                onValueChange={(value) => { onTabChange(value) }}
                defaultValue={'home'}
                value={activeTab}
            >
                <TabsList>
                    {
                        bottomBarTabList.map((tab: { id: string, name: string, value: string }) => {
                            return (
                                <TabsTrigger key={tab.id} value={tab.value}>
                                    {tab.name === 'Home' ? <House /> : tab.name}
                                </TabsTrigger>
                            )
                        })
                    }
                </TabsList>
            </Tabs>
        </div>
    )
}

export default BottomTabBar;