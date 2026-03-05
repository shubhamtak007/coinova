import { ColumnDef, useReactTable, getCoreRowModel, flexRender, Row } from '@tanstack/react-table';
import { Spinner } from '@/components/ui/spinner';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuGroup, ContextMenuItem } from '@/components/ui/context-menu';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import type { MenuItem } from '@/interfaces/data-table.interface';

interface DataTableBindings<TData> {
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
    onContextMenuItemClicked: (row: Row<TData>, contextMenu: MenuItem, event: React.MouseEvent<HTMLElement>) => void
}

function DataTable<TData,>(bindings: DataTableBindings<TData>) {
    const { sendSortingValueToParent, onRowClicked, onContextMenuItemClicked, ...props } = bindings;

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
        }
    });

    const tableWrapperRef = useRef<HTMLDivElement>(null);
    const { rows } = tableConfig.getRowModel();

    const rowVirtualizer = useWindowVirtualizer({
        count: rows.length,
        estimateSize: () => 60,
        measureElement: (el) => el.getBoundingClientRect().height,
        overscan: 10
    })

    const virtualItems = rowVirtualizer.getVirtualItems();
    const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
    const paddingBottom = virtualItems.length > 0 ? rowVirtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end : 0;

    return (
        <>
            <div
                ref={tableWrapperRef}
                className="coins-sst-wrapper"
                style={{
                    overflow: 'auto',
                    position: 'relative'
                }}
            >
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

                    {
                        (props.fetchingList === false)
                        &&
                        <tbody style={{ position: 'relative' }}>
                            {
                                rows?.length > 0 ?
                                    <>
                                        {paddingTop > 0 && (
                                            <tr style={{ border: 0 }}>
                                                <td
                                                    colSpan={props.columns.length}
                                                    style={{ height: `${paddingTop}px`, padding: 0, border: 0, lineHeight: 0 }}
                                                />
                                            </tr>
                                        )}

                                        {virtualItems.map((virtualRow) => {
                                            const row = rows[virtualRow.index] as Row<TData>
                                            return (
                                                (
                                                    <ContextMenu
                                                        key={virtualRow.key}
                                                    >
                                                        <ContextMenuTrigger asChild>
                                                            <tr
                                                                key={row.id}
                                                                onClick={() => { onRowClicked(row) }}
                                                                data-state={row.getIsSelected() && "selected"}
                                                                data-index={virtualRow.index}
                                                                ref={rowVirtualizer.measureElement}
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
                                                                                onClick={(event) => onContextMenuItemClicked(row, contextMenu, event)}
                                                                            >
                                                                                {contextMenu.name}
                                                                            </ContextMenuItem>
                                                                        )
                                                                    })
                                                                }
                                                            </ContextMenuGroup>
                                                        </ContextMenuContent>
                                                    </ContextMenu>
                                                )
                                            )
                                        })}

                                        {paddingBottom > 0 && (
                                            <tr style={{ border: 0 }}>
                                                <td
                                                    colSpan={props.columns.length}
                                                    style={{ height: `${paddingBottom}px`, padding: 0, border: 0, lineHeight: 0 }}
                                                />
                                            </tr>
                                        )}
                                    </>
                                    :
                                    <tr>
                                        <td
                                            colSpan={props.columns.length}
                                            className="no-value-text"
                                        >
                                            {props.listEmptyMessage ? props.listEmptyMessage : 'No results'}
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    }
                </table>
            </div>

            {
                (props.fetchingList === true)
                &&
                <div className="place-items-center m-[20px]">
                    <Spinner className="size-20" />
                </div>
            }
        </>
    )
}

export default DataTable;