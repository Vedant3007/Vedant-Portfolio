type DataTableProps = {
  columns: readonly string[];
  rows: ReadonlyArray<readonly string[]>;
};

export function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
        <thead className="bg-surface">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="border-b border-border px-4 py-3 font-mono text-xs font-medium uppercase tracking-widest text-muted"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-border last:border-0">
              {row.map((cell, index) =>
                index === 0 ? (
                  <th
                    key={index}
                    scope="row"
                    className="px-4 py-3 align-top font-medium"
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={index} className="px-4 py-3 align-top leading-6 text-muted">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}