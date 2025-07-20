export const formatCurrency = (value: number) => Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
}).format(value)