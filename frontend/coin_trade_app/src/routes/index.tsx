import { createFileRoute } from "@tanstack/react-router";
import DataTable from "../components/Table/DataTable";
import { useGetCrypto } from "../hooks/useGetCrypto";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const { data: success, error, isLoading } = useGetCrypto();
    const cols = [
        "MCP",
        "Logo",
        "Coin Name",
        "Current Price",
        "High (24h)",
        "Low (24h)",
        "24h Change",
    ];

    const Fallback = (
        <div className="w-full min-h-75 d-flex relative flex-column gap-1">
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
            <p className="absolute absolute--center fs-2">Loading Coins...</p>
        </div>
    );

    const CompState = {
        success: <DataTable cols={cols} data={success?.data ?? []} />,
        isLoading: Fallback,
        error: (
            <div className="">
                <p>Failed to load data. Please try again later</p>
            </div>
        ),
    };

    return (
        <section className="container">
            <h1>Coin Trader</h1>
            <p>View current crypto prices below.</p>
            <h2>Top 100 Crypto currencies by Market Cap Rank (MCP)</h2>
            <div className="data-table scrollbar scrollbar--thin">
                {success && CompState.success}
                {error && CompState.error}
                {isLoading && CompState.isLoading}
            </div>
        </section>
    );
}
