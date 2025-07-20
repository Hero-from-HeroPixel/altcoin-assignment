import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
    component: About,
});

/**
 * About page for the Coin Trader web app.
 * Provides an overview of the project, its tech stack, and data sources.
 */
function About() {
    return (
        <main className="container py-4">
            <header className="mb-3">
                <h1 className="fw-bold">🪙 About Coin Trader</h1>
            </header>

            <section className="mb-4">
                <p>
                    Coin Trader is a lightweight web application built to help
                    users explore real-time cryptocurrency data. It displays
                    price trends, market cap rankings, and other useful
                    statistics for the top 100 coins.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="fs-4">🔧 Tech Stack</h2>
                <ul className="list-disc ms-4">
                    <li>React with TanStack Router for dynamic routing</li>
                    <li>SWR for data fetching and caching</li>
                    <li>TypeScript for type safety</li>
                    <li>Custom REST API integration via Axios</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="fs-4">📊 Data Source</h2>
                <p>
                    All data is fetched from a backend API that aggregates
                    cryptocurrency metrics—such as price, market cap, and daily
                    performance—from trusted sources.
                </p>
            </section>
        </main>
    );
}
