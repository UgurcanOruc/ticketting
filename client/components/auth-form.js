import { useState } from "react";
import useRequest from "../hooks/use-request";
import Router from 'next/router';

export default ({ url, title, buttonName }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: url,
    method: 'post',
    body: {
        email, password
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();

  };

  return (
    <form onSubmit={onSubmit} className="col-md-4">
      <h1>{ title }</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <button className="btn btn-primary">{ buttonName }</button>
    </form>
  );
};
