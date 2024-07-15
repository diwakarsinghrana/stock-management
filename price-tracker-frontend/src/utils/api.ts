export const fetchPrices = async (stock: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prices?name=${stock}`, {
        method: 'GET',
        credentials: 'include',
    });
    const data = await response.json();
    return data;
};
