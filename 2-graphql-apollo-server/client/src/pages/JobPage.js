import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";
import { getJobById, deleteJobById } from "../lib/graphql/queries";
import { useNavigate } from "react-router";

function JobPage() {
  const navigate = useNavigate();
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

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const res = await deleteJobById(job.id);
      res && navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const { id, title, description } = job;
    navigate("/jobs/new", { state: { id, title, description, updateAction: true } });
  };

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
        <div className="field">
          <div className="warning">
            <button className="button is-link" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default JobPage;
