import Table from "react-bootstrap/Table";
import type { Crypto } from "../../hooks/useGetCrypto";
import { formatCurrency } from "../../utils/currency";

// Props accepted by the DataTable component
type DataTableProps = {
    data: Crypto[]; // Array of cryptocurrency objects to display
    cols: string[]; // Array of column header labels
};

/**
 * Renders a responsive table showing cryptocurrency metrics.
 * Uses Bootstrap's <Table> component for styling and responsiveness.
 *
 * @component
 * @param {DataTableProps} props - Props for DataTable
 * Each row includes:
 * - Market Cap Rank
 * - Logo
 * - Name
 * - Current Price
 * - 24h High and Low
 * - 24h Price Change %
 */
function DataTable({ data, cols }: DataTableProps) {
    return (
        <Table responsive="sm" striped>
            {/* Table headers */}
            <thead>
                <tr>
                    {cols.map((colName) => (
                        <th key={colName}>{colName}</th>
                    ))}
                </tr>
            </thead>

            {/* Table rows */}
            <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        <td>{row.marketCapRank}</td>
                        <td>
                            <img
                                src={row.image}
                                className="thumbnail"
                                alt={`${row.name} logo`}
                            />
                        </td>
                        <td>{row.name}</td>
                        <td>{formatCurrency(row.currentPrice / 100)}</td>
                        <td>{formatCurrency(row.high24h / 100)}</td>
                        <td>{formatCurrency(row.low24h / 100)}</td>
                        <td>
                            {row.priceChangePercentage24h?.toFixed(2) ?? "0.00"}
                            %
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default DataTable;
