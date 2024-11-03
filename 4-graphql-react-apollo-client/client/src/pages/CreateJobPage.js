import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { createJob, getJobById, updateJobById, getJobs } from "../graphql/qureies";
import { useMutation } from "@apollo/client";

function CreateJobPage() {
  const navigate = useNavigate();
  // used for passing values from one route to other
  const { state } = useLocation();
  const isEdit = state?.updateAction;
  const [mutateCreateJob, createJobResult] = useMutation(createJob, {
    refetchQueries: [getJobs],
  });
  const [mutateUpdateJob, updateJobResult] = useMutation(updateJobById, {
    refetchQueries: [getJobs],
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (state) {
      setTitle(state?.title);
      setDescription(state?.description);
    }
  }, [state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEdit) {
      const { id } = state;
      try {
        const { data } = await mutateUpdateJob({
          variables: {
            input: {
              id,
              title,
              description,
            },
          },
        });
        const { updateJobById } = data;
        updateJobById && navigate(`/jobs/${id}`);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const { data } = await mutateCreateJob({
          variables: {
            jobInput: {
              title,
              description,
            },
          },
          update: (cache, { data }) => {
            cache.writeQuery({
              query: getJobById,
              variables: { jobId: data.createJob.id },
              data: { fetchJob: data.createJob },
            });
          },
        });
        const {
          createJob: { id },
        } = data;
        id && navigate(`/jobs/${id}`);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input className="input" type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                rows={10}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className="button is-link"
                onClick={handleSubmit}
                disabled={createJobResult.loading || updateJobResult.loading}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobPage;
