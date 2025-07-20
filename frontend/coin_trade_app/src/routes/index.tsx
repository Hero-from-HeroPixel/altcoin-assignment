import { createFileRoute } from "@tanstack/react-router";
import DataTable from "../components/table/DataTable";
import { useGetCrypto } from "../hooks/useGetCrypto";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const { data } = useGetCrypto();
    const cols = [
        "Market Cap Rank",
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

    return (
        <section className="container">
            <h1>Coin Trader</h1>
            <p>View current crypto prices below.</p>
            <div className="data-table scrollbar scrollbar--thin">
                {data ? <DataTable cols={cols} data={data.data} /> : Fallback}
            </div>
        </section>
    );
}
