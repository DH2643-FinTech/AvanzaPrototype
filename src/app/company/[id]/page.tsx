// app/company/[id]/page.tsx

import { Company } from "@/interfaces";
import AddToFavoritesButton from "@/src/components/AddToFavoritesButton";
import { getCachedCompany } from "@/src/lib/api/cachedCalls";
import clientPromise from "@/src/lib/database/mongodb";

interface CompanyPageProps {
  params: { id: string };
}

const CompanyPage = async ({ params }: CompanyPageProps) => {
  const { id } = params;
  const client = await clientPromise;
  const db = client.db('database');
  const collection = db.collection<Company>('stocks');
  const company = await getCachedCompany(id, collection);




  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <AddToFavoritesButton stockId={company._id} />
    </div>
  )
};

export default CompanyPage;
