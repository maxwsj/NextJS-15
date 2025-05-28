// Import React hooks
import { useEffect, useState } from 'react';
import useSWR from 'swr';

// Define and export the page component
export default function LastSalesPage() {
   // Set up local state: one for sales data, one for loading state
   //    const [sales, setSales] = useState(undefined);
   //    const [isLoading, setIsLoading] = useState(false);

   // Inside component body
   const { data, error } = useSWR('https://your-api-url.com', (url) =>
      fetch(url).then((res) => res.json())
   );

   if (error) return <p>Failed to load</p>;
   if (!data || !sales) return <p>Loading...</p>;

   const [sales, setSales] = useState();

   useEffect(() => {
      if (data) {
         const transformedSales = [];

         for (const key in data) {
            transformedSales.push({
               id: key,
               username: data[key].username,
               volume: data[key].volume,
            });
         }

         setSales(transformedSales);
      }
   }, [data]);

   //    // useEffect is used to fetch data after the component mounts
   //    useEffect(() => {
   //       setIsLoading(true); // Set loading to true while fetching

   //       fetch('https://<your-firebase-project>.firebaseio.com/sales.json')
   //          .then((response) => response.json()) // Convert response to JSON
   //          .then((data) => {
   //             // Transform the object returned by Firebase into an array
   //             const transformedSales = [];

   //             for (const key in data) {
   //                transformedSales.push({
   //                   id: key,
   //                   username: data[key].username,
   //                   volume: data[key].volume,
   //                });
   //             }

   //             // Update state with transformed data
   //             setSales(transformedSales);
   //             setIsLoading(false); // Stop loading indicator
   //          });
   //    }, []); // Empty dependency array => runs only once on mount

   //    // Render loading state
   //    if (isLoading) {
   //       return <p>Loading...</p>;
   //    }

   //    // Render fallback if sales are not yet loaded
   //    if (!sales) {
   //       return <p>No data yet</p>;
   //    }

   // Render the list of sales
   return (
      <ul>
         {sales.map((sale) => (
            <li key={sale.id}>
               {sale.username} - ${sale.volume}
            </li>
         ))}
      </ul>
   );
}
