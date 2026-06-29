'use client';

import useBottomTabBar from '@/hooks/useBottomTabBar';
import NewsDialog from '@/components/features/news/news-dialog';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import { bottomBarTabList } from '@/constants/app.constants';
import { Home } from 'lucide-react';

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
                    {(dialogType === 'news') && showNewsDialog({ showDialog, setShowDialog })}
                </>
            }
        </div>
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