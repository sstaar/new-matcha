import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../helpers/Input";
import { resetPassword } from "../../actions/registerActions";

export const ResetPasswordInfo = ({ match }) => {
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const onChange = e => {
    setNewPassword(e.target.value);
  };

  const onClick = async () => {
    const info = { newPassword, resetToken: match.params.token };
    dispatch(await resetPassword(info));
  };

  const resetStore = useSelector(state => state.resetPassword);

  return (
    <div>
      {resetStore.errors.general || resetStore.success}
      <Input
        display="New password"
        type="password"
        name="newPassword"
        onChange={e => onChange(e)}
        value={newPassword}
        error={resetStore.errors.newPassword}
      />
      <button onClick={onClick} type="submit" className="btn submit w-100 ">
        Submit
      </button>
    </div>
  );
};
