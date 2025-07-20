import Table from "react-bootstrap/Table";
import type { Crypto } from "../../hooks/useGetCrypto";
import { formatCurrency } from "../../utils/currency";

type DataTableProps = {
    data: Crypto[];
    cols: string[];
};

function DataTable({ data, cols }: DataTableProps) {
    return (
        <Table responsive="sm" striped>
            <thead>
                <tr>
                    {cols.map((colName) => (
                        <th key={colName}>{colName}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        <td>{row.marketCapRank}</td>
                        <td>
                            <img src={row.image} className="thumbnail" alt="" />
                        </td>
                        <td>{row.name}</td>
                        <td>{formatCurrency(row.currentPrice / 100)}</td>
                        <td>{formatCurrency(row.high24h / 100)}</td>
                        <td>{formatCurrency(row.low24h / 100)}</td>
                        <td>{row.priceChangePercentage24h?.toFixed(2)}%</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default DataTable;
