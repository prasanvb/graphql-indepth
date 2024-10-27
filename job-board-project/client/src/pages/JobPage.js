import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";
import { getJobById } from "../lib/graphql/queries";

function JobPage() {
  // NOTE: getting jobID from url query parameter
  const { jobId } = useParams();
  const [componentState, setComponentState] = useState({
    isLoading: true,
    job: null,
    isError: false,
  });
  const { isLoading, job, isError } = componentState;

  useEffect(() => {
    (async () => {
      try {
        const job = await getJobById(jobId);
        setComponentState({ job, isLoading: false, isError: false });
      } catch (err) {
        console.error("error: ", JSON.stringify(err, null, 2));
        setComponentState({ job: null, isLoading: false, isError: true });
      }
    })();
  }, [jobId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error on trying to fetch company data, try again later</p>;
  }

  return (
    job && (
      <div>
        <h1 className="title is-2">{job.title}</h1>
        <h2 className="subtitle is-4">
          <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
        </h2>
        <div className="box">
          <div className="block has-text-grey">Posted: {formatDate(job.date, "long")}</div>
          <p className="block">{job.description}</p>
        </div>
      </div>
    )
  );
}

export default JobPage;
