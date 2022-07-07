export type Sorting = {
    field: string;
    direction: 'asc' | 'desc';
}[];

export type Filters = {
    [field: string]: string | number | boolean;
};

// Let's wrap the data in an "entry" holding a recognizable "key", because
// not every entity should be forced to hold a primary key called "id".
// Therefore we need to be able to create a custom and recognizable key, directly after
// a fetch process has been finished.
export type Entry<Data = any> = {
    key: string;
    data: Data;
};

// Furthermore we should support pagination by a "limit" and "offset" param.
// This keeps the door open to reload some entries for every constellation.
export type CollectionQuery = {
    search?: string;
    offset: number;
    limit: number;
    filters: Filters;
    sorting: Sorting;
};

// Let's provide a reusable default query
export const defaultQuery: CollectionQuery = {
    offset: 0,
    limit: 10,
    filters: {},
    sorting: [],
};

// Furthermore we should provide a collection information object holding at least all params
// of the query itself.
// With this we store the information for which filters, sorting and pagination params the delivered entries
// were received. This should normally correspond with the params of the query, but HAS NOT TO!
export type CollectionInfo = CollectionQuery & {
    totalCount: number;
    filteredCount: number;
};

export function createQuery(provider: CollectionProvider): CollectionQuery {
    const latestQueryInfo = provider.latestQueryInfo ?? {};
    return {
        ...defaultQuery,
        ...latestQueryInfo,
    };
}

// To display useful information we should support things like "isFetching" in the
// state of a collection provider. With this we e.g. could show a loader icon or so.
export type CollectionProviderState<D = any> = {
    key: string;
    isFetching: boolean;
    hasInitialFetchBeenDone: boolean;
    entries: Entry<D>[];
    latestQueryInfo?: CollectionInfo;
};

export type EntriesOperation = 'append' | 'replace';

export type CollectionProvider<D = any> = CollectionProviderState<D> & {
    fetch: (query?: CollectionQuery, op?: EntriesOperation) => Promise<any>;
};
