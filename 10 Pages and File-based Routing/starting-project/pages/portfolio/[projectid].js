import { useRouter } from 'next/router';

export default function PortfolioProjectPage() {
   const router = useRouter();

   router.return(
      <div>
         <h1>The Portfolio Project Page</h1>
      </div>
   );
}
