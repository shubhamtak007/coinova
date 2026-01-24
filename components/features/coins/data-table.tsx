import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Spinner } from '@/components/ui/spinner';

interface DataTableProps<TData> {
    list: TData[],
    columns: ColumnDef<TData>[],
    listEmptyMessage?: string,
    fetchingList?: boolean,
    currentPageNumber?: number,
    rowsPerPage?: number
}

function DataTable<TData,>({ list, columns, listEmptyMessage, fetchingList, currentPageNumber, rowsPerPage }: DataTableProps<TData>) {
    const tableConfig = useReactTable<TData>({
        data: list,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            currentPageNumber: currentPageNumber,
            rowsPerPage: rowsPerPage
        }
    });

    return (
        <div className="coins-sst-wrapper">
            <table className="coins-server-side-table">
                <thead>
                    {
                        tableConfig.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((header) => {
                                        return (
                                            <th
                                                key={header.id}
                                                className={header.column.columnDef.meta?.headerClassNames}
                                            >
                                                {
                                                    header.isPlaceholder ? null :
                                                        flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )
                                                }
                                            </th>
                                        )
                                    }
                                    )
                                }
                            </tr>
                        ))
                    }
                </thead>

                {fetchingList ?
                    <tbody className="h-[130px]">
                        <tr>
                            <td colSpan={columns.length} className="!p-[unset] place-items-center">
                                <Spinner className="size-20" />
                            </td>
                        </tr>
                    </tbody> :
                    <tbody>
                        {tableConfig.getRowModel().rows?.length ? (
                            tableConfig.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {
                                        row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                className={cell.column.columnDef.meta?.cellClassNames}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="italic text-[#ccc] text-center"
                                >
                                    {listEmptyMessage ? listEmptyMessage : 'No results'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                }
            </table>
        </div>
    )
}

export default DataTable;