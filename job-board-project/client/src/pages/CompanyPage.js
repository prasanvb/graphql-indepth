import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCompanyById } from "../lib/graphql/queries";
import JobList from "../components/JobList.js";

function CompanyPage() {
  const { companyId } = useParams();
  const [componentState, setComponentState] = useState({
    isLoading: true,
    company: null,
    isError: false,
  });
  const { isLoading, company, isError } = componentState;

  useEffect(() => {
    (async () => {
      try {
        const company = await getCompanyById(companyId);
        setComponentState({ company, isLoading: false, isError: false });
      } catch (err) {
        console.error("error: ", JSON.stringify(err, null, 2));
        setComponentState({ company: null, isLoading: false, isError: true });
      }
    })();
  }, [companyId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error on trying to fetch company data, try again later</p>;
  }

  return (
    company && (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
        <h2 className="title is-5">Jobs at {company.name}</h2>
        <JobList jobs={company.jobs} />
      </div>
    )
  );
}

export default CompanyPage;
