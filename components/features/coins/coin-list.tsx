'use client';

import useCoinList from '@/hooks/useCoinList';
import DataTable from '@/components/features/coins/data-table';
import React, { useState, useRef } from 'react';
import type { CoingeckoCrypto } from '@/interfaces/CryptoCurrency';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { columns } from '@/components/features/coins/columns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getRowsPerPageDefaultValue } from '@/services/utils.service';

function CoinList() {
    const [rowsPerPage, setRowsPerPage] = useState<number>(getRowsPerPageDefaultValue());
    const [sortingValue, setSortingValue] = useState<string>('market_cap_desc');
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const { fetchingCoinList, coinList } = useCoinList({ currentPageNumber, searchValue, rowsPerPage, sortingValue });
    const rowsCountList = useRef([10, 25, 50, 100, 150, 200, 250]).current;

    function onSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentPageNumber(1);
        setSearchValue(event.target.value);
    }

    function onRowsPerPageChange(value: string) {
        setRowsPerPage(Number(value))
    }

    function setSortingValueFromDt(key: string) {
        setSortingValue(key ? key : 'market_cap_desc')
    }

    return (
        <>
            <div className="coins-sst-container">
                <div className="search-bar">
                    <InputGroup className="max-w-xs search-input-group">
                        <InputGroupInput
                            placeholder="Search Coin Name"
                            value={searchValue}
                            onChange={(event) => { onSearchInputChange(event) }}
                            disabled={fetchingCoinList}
                        />

                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <DataTable<CoingeckoCrypto>
                    list={coinList}
                    columns={columns}
                    listEmptyMessage={'No coins found.'}
                    fetchingList={fetchingCoinList}
                    currentPageNumber={currentPageNumber}
                    rowsPerPage={rowsPerPage}
                    currentSortingValue={sortingValue}
                    sendSortingValueToParent={setSortingValueFromDt}
                />

                <div className="bottom-bar">
                    <div className="rows-per-page-dropdown">
                        <p className="text-sm">Rows per page</p>

                        <Select
                            defaultValue={String(getRowsPerPageDefaultValue())}
                            onValueChange={(value) => { onRowsPerPageChange(value) }}
                            disabled={fetchingCoinList}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                {
                                    rowsCountList.map((rowsCount) => {
                                        return (
                                            <SelectItem
                                                key={rowsCount + '-rows'}
                                                value={String(rowsCount)}
                                            >
                                                {rowsCount}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="pagination-btn-group">
                        <Button
                            variant="outline"
                            size="sm"
                            aria-label="previous button"
                            onClick={() => { setCurrentPageNumber(currentPageNumber - 1) }}
                            disabled={(currentPageNumber === 1 || fetchingCoinList)}
                        >
                            Previous
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            aria-label="close button"
                            onClick={() => { setCurrentPageNumber((prev) => prev + 1) }}
                            disabled={(coinList.length < rowsPerPage || fetchingCoinList)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default CoinList;