import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCompanyById } from "../lib/graphql/queries";
import JobList from "../components/JobList.js";

function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState();

  useEffect(() => {
    getCompanyById(companyId).then((company) => setCompany(company));
  }, [companyId]);

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
