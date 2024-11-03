import JobList from "../components/JobList";
import { useQuery } from "@apollo/client";
import { getJobs } from "../graphql/qureies";

function HomePage() {
  const { loading, error, data } = useQuery(getJobs);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="has-text-danger">Error. Data Unavailable. </div>;
  }

  const { fetchJobs } = data;

  return (
    <div>
      <h1 className="title">Job Board</h1>
      {fetchJobs?.length && <JobList jobs={fetchJobs} />}
    </div>
  );
}

export default HomePage;
