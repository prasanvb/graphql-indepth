import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { createJob, updateJobById } from "../lib/graphql/queries";

function CreateJobPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(state.title);
    setDescription(state.description);
  }, [state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (state.updateAction) {
      const { id } = state;
      const res = await updateJobById({ id, title, description });
      res && navigate(`/jobs/${id}`);
    } else {
      const {
        createJob: { id },
      } = await createJob({ title, description });
      id && navigate(`/jobs/${id}`);
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
              <button className="button is-link" onClick={handleSubmit}>
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
