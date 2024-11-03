import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";
import { deleteJobById } from "../graphql/fetching";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";
import { getJobById } from "../graphql/qureies";

function JobPage() {
  const navigate = useNavigate();
  // NOTE: getting jobID from url query parameter
  const { jobId } = useParams();

  const { loading, error, data } = useQuery(getJobById, { variables: { jobId } });
  console.log({ loading, error, data });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="has-text-danger">Error on trying to fetch data, try again later.</div>;
  }

  const { fetchJob } = data;
  const job = fetchJob;

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
