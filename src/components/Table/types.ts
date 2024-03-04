export type TableColumn = {
    label?: string
    key?: string
    sortable?: boolean
    order?: 'none' | 'desc' | 'asc'
}

export type SelectQuery = {
    all: boolean;
    excluded: Array<string>
    included: Array<string>
}