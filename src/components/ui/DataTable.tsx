import React from "react";
import { cn } from "@/lib/utils";
import { Pagination } from "./Pagination";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  className?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

export function DataTable<T>({ data, columns, onRowClick, className, pagination }: DataTableProps<T>) {
  return (
    <div className={cn("bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className={cn("py-3 px-4 font-semibold whitespace-nowrap", col.className)}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center text-slate-500">
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    "border-b border-slate-100 last:border-0 transition-colors",
                    onRowClick ? "cursor-pointer hover:bg-slate-50" : "hover:bg-slate-50/50"
                  )}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className={cn("py-3 px-4", col.className)}>
                      {col.cell 
                        ? col.cell(row) 
                        : (col.accessorKey ? String(row[col.accessorKey]) : null)
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <Pagination 
          currentPage={pagination.currentPage} 
          totalPages={pagination.totalPages} 
          onPageChange={pagination.onPageChange} 
        />
      )}
    </div>
  );
}
