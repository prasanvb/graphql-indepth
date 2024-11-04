import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/formatters";
import { useNavigate } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import { getJobById, deleteJobId } from "../graphql/qureies";

function JobPage() {
  const navigate = useNavigate();
  // NOTE: getting jobID from url query parameter
  const { jobId } = useParams();
  const { loading, error, data } = useQuery(getJobById, { variables: { jobId } });
  const [mutate] = useMutation(deleteJobId);

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
      const { data } = await mutate({ variables: { jobId } });

      data && navigate("/");
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
        <div className="is-flex is-justify-content-flex-end">
          <button className="button is-link mx-4" onClick={handleEdit}>
            Edit
          </button>
          <button className="button is-danger mx-4" onClick={handleDelete}>
            Delete
          </button>
        </div>
        <div className="box">
          <div className="block has-text-grey">Posted: {formatDate(job.date, "long")}</div>
          <p className="block">{job.description}</p>
        </div>
      </div>
    )
  );
}

export default JobPage;
