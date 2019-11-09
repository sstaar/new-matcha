import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../helpers/Input";
import { sendResetPassword } from "../../actions/registerActions";

export const ResetPassword = () => {
  const [resetInfo, setResetInfo] = useState({
    username: "",
    email: ""
  });

  const dispatch = useDispatch();

  const onChange = e => {
    setResetInfo({ ...resetInfo, [e.target.name]: e.target.value });
  };

  const onClick = async () => {
    dispatch(await sendResetPassword(resetInfo));
  };

  const resetStore = useSelector(state => state.resetPassword);

  return (
    <div>
      {resetStore.sendingSuccess || ""}
      <Input
        display="Username"
        type="text"
        name="username"
        onChange={e => onChange(e)}
        value={resetInfo.username}
        error={resetStore.sendingErrors.username}
      />
      <Input
        display="E-mail"
        type="text"
        name="email"
        onChange={e => onChange(e)}
        value={resetInfo.email}
        error={resetStore.sendingErrors.email}
      />
      <button onClick={onClick} type="submit" className="btn submit w-100 ">
        Submit
      </button>
    </div>
  );
};
