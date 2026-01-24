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
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const { fetchingCoinList, coinList } = useCoinList({ currentPageNumber, searchValue, rowsPerPage });
    const rowsCountList = useRef([10, 25, 50, 100, 150, 200, 250]).current;

    function onSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentPageNumber(1);
        setSearchValue(event.target.value);
    }

    function onRowsPerPageChange(value: string) {
        setRowsPerPage(Number(value))
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
                />

                <div className="bottom-bar">
                    <div>
                        <Select
                            defaultValue={String(getRowsPerPageDefaultValue())}
                            onValueChange={(value) => { onRowsPerPageChange(value) }}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                {
                                    rowsCountList.map((rowsCount, index) => {
                                        return (
                                            <SelectItem
                                                key={index + '-rows'}
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

                    <div className="pagination-btn-group space-x-2 text-end">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => { setCurrentPageNumber(currentPageNumber - 1) }}
                            disabled={(currentPageNumber === 1 || fetchingCoinList)}
                        >
                            Previous
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
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