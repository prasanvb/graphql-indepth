import { useEffect, useState } from "react";
import JobList from "../components/JobList";
import { getJobs } from "../graphql/fetching";

function HomePage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs().then((jobs) => setJobs(jobs));
  }, []);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      {jobs.length && <JobList jobs={jobs} />}
    </div>
  );
}

export default HomePage;
