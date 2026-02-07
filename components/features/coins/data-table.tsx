import { ColumnDef, useReactTable, getCoreRowModel, flexRender, Row } from '@tanstack/react-table';
import { Spinner } from '@/components/ui/spinner';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuGroup, ContextMenuItem } from '@/components/ui/context-menu';
import type { MenuItem } from '@/interfaces/data-table.ts'

interface DataTableProps<TData> {
    list: TData[],
    columns: ColumnDef<TData>[],
    contextMenuList: MenuItem[],
    listEmptyMessage?: string,
    fetchingList?: boolean,
    currentPageNumber?: number,
    rowsPerPage?: number,
    currentSortingValue: string | null,
    sendSortingValueToParent: (key: string) => void,
    onRowClicked: (row: Row<TData>) => void,
    onContextMenuItemClicked: (row: Row<TData>, contextMenu: MenuItem) => void
}

function DataTable<TData,>({ sendSortingValueToParent, onRowClicked, onContextMenuItemClicked, ...props }: DataTableProps<TData>) {
    const tableConfig = useReactTable<TData>({
        data: props.list,
        columns: props.columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            fetchingList: props.fetchingList,
            currentSortingValue: props.currentSortingValue,
            currentPageNumber: props.currentPageNumber,
            rowsPerPage: props.rowsPerPage,
            sortBy: (key: string) => sendSortingValueToParent(key)
        },
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

                {props.fetchingList ?
                    <tbody className="h-[130px]">
                        <tr>
                            <td colSpan={props.columns.length} className="!p-[unset] place-items-center">
                                <Spinner className="size-20" />
                            </td>
                        </tr>
                    </tbody> :
                    <tbody>
                        {tableConfig.getRowModel().rows?.length ? (
                            tableConfig.getRowModel().rows.map((row) => (
                                <ContextMenu key={row.id}>
                                    <ContextMenuTrigger asChild>
                                        <tr
                                            data-state={row.getIsSelected() && "selected"}
                                            onClick={() => { onRowClicked(row) }}
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
                                    </ContextMenuTrigger>

                                    <ContextMenuContent>
                                        <ContextMenuGroup>
                                            {
                                                props.contextMenuList.map((contextMenu) => {
                                                    return (
                                                        <ContextMenuItem
                                                            key={contextMenu.id}
                                                            onClick={() => onContextMenuItemClicked(row, contextMenu)}
                                                        >
                                                            {contextMenu.name}
                                                        </ContextMenuItem>
                                                    )
                                                })
                                            }
                                        </ContextMenuGroup>
                                    </ContextMenuContent>
                                </ContextMenu>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={props.columns.length}
                                    className="no-value-text"
                                >
                                    {props.listEmptyMessage ? props.listEmptyMessage : 'No results'}
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