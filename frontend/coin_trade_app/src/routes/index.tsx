import { createFileRoute } from "@tanstack/react-router";
import DataTable from "../components/Table/DataTable";
import { useGetCrypto } from "../hooks/useGetCrypto";

/**
 * Defines the root route for the application using TanStack Router.
 */
export const Route = createFileRoute("/")({
    component: Index,
});

/**
 * Main landing page for displaying cryptocurrency data.
 * - Uses SWR hook to fetch crypto data
 * - Renders a responsive table with current stats
 */
function Index() {
    const { data: success, error, isLoading } = useGetCrypto();

    // Column headers used in the DataTable component
    const cols = [
        "MCR", // Market Cap Rank
        "Logo", // Crypto image/logo
        "Coin Name", // Full name of the cryptocurrency
        "Current Price", // Live price in USD
        "High (24h)", // 24-hour high
        "Low (24h)", // 24-hour low
        "24h Change", // 24-hour price change percentage
    ];

    // Skeleton loader shown while data is being fetched
    const Fallback = (
        <div className="w-full min-h-75 d-flex relative flex-column gap-2 py-4 px-2">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="skeleton h-4 rounded"></div>
            ))}
            <p className="absolute absolute--center fs-2 text-muted">
                Loading Coins...
            </p>
        </div>
    );

    // Conditional rendering states for success, error, and loading
    const CompState = {
        success: <DataTable cols={cols} data={success?.data ?? []} />,
        isLoading: Fallback,
        error: (
            <div className="alert alert-danger mt-3">
                <p>❌ Failed to load data. Please try again later.</p>
            </div>
        ),
    };

    return (
        <main className="container py-4">
            <header className="mb-4">
                <h1 className="fw-bold">🚀 Coin Trader</h1>
                <p className="text-muted">
                    Track current crypto prices in real time.
                </p>
                <h2 className="mt-2">
                    Top 100 Cryptocurrencies by Market Cap Rank (MCR)
                </h2>
            </header>

            <section className="data-table scrollbar scrollbar--thin">
                {success && CompState.success}
                {error && CompState.error}
                {isLoading && CompState.isLoading}
            </section>
        </main>
    );
}
