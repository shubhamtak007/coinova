import '@tanstack/react-table';

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        headerClassNames?: string;
        cellClassNames?: string;
    }

    interface TableMeta<TData extends RowData> {
        currentPageNumber?: number,
        rowsPerPage?: number,
        currentSortingValue: string,
        sortBy?(key: string): void
    }
}