import { Virtualizer } from '@tanstack/react-virtual';
import { Table, ColumnDef, Row } from '@tanstack/react-table';

interface MenuItem {
    id: string,
    name: string
}

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

interface DataTableHeaderBindings<TData> {
    tableConfig: Table<TData>
}

interface DataTableBodyBindings<TData> {
    rows: Row<TData>[],
    rowVirtualizer: Virtualizer<Window, Element>,
    dataTableBindings: DataTableBindings<TData>
}

export type { MenuItem, DataTableBindings, DataTableHeaderBindings, DataTableBodyBindings }