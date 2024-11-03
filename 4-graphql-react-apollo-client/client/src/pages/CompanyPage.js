import { useParams } from "react-router";
import JobList from "../components/JobList.js";
import { useQuery } from "@apollo/client";
import { getCompanyById } from "../graphql/qureies";

function CompanyPage() {
  const { companyId } = useParams();

  const { loading, error, data } = useQuery(getCompanyById, { variables: { companyId } });
  console.log({ loading, error, data });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="has-text-danger">Error on trying to fetch data, try again later.</div>;
  }

  const { fetchCompany } = data;
  const company = fetchCompany;

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
