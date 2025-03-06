import { TableType } from "@/types/api";
import { apiSlice } from "../apiSlice";

const tableApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch data for all  tables
    getTables: builder.query<
      { data: TableType[]; totalPages: number },
      { endpoint: string; page: number; limit: number }
    >({
      query: ({ endpoint, page, limit }) => ({
        url: endpoint, // Use endpoint passed dynamically
        params: { page, limit }, // Pass pagination parameters
      }),
    }),
  }),
});

export const { useGetTablesQuery } = tableApi;
