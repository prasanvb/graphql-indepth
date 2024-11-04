import JobList from "../components/JobList";
import { useQuery } from "@apollo/client";
import { getJobs } from "../graphql/qureies";
import { useState } from "react";

const JOBS_PER_PAGE_LIMIT = 10;

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageOffset = (currentPage - 1) * JOBS_PER_PAGE_LIMIT;
  const { loading, error, data } = useQuery(getJobs, {
    variables: {
      limit: JOBS_PER_PAGE_LIMIT,
      offset: pageOffset,
    },
    fetchPolicy: "network-only", // NOTE: Used for first execution
    nextFetchPolicy: "cache-first", // NOTE: Used for subsequent executions
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="has-text-danger">Error on trying to fetch data, try again later.</div>;
  }

  const { fetchJobs } = data;
  const totalPage = Math.ceil(fetchJobs?.totalCount / JOBS_PER_PAGE_LIMIT);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <div>
        <button
          className="button is-light"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="has-text-primary	is-size-4 mx-4">{currentPage}</span>
        <button
          className="button is-light"
          disabled={currentPage === totalPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
      <JobList jobs={fetchJobs.items} />
    </div>
  );
}

export default HomePage;
