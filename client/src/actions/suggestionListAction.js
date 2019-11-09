import {
  SUGGESTIONS_FAILED,
  SUGGESTIONS_RECIEVED,
  SUGGESTIONS_REACT_SUCCESS,
  SUGGESTIONS_REACT_FAIL
} from "./types";
import axios from "axios";

//The request to the back-end server will take the token
//Extract the userId embeded in the token and return the user suggestion list
//In case there is a problem with the token the response will containe an error
export const suggestionsList = async () => {
  const token = window.localStorage.getItem("token");

  const list = await axios.post(
    "http://localhost:5000/api/matching/suggestion",
    { token: token }
  );

  console.log("list");

  if (list.error)
    return {
      type: SUGGESTIONS_FAILED,
      payload: list.data.error
    };
  else
    return {
      type: SUGGESTIONS_RECIEVED,
      payload: list.data
    };
};

export const reactToUser = async (target, reaction) => {
  const token = window.localStorage.getItem("token");

  try {
    let res = await axios.post("http://localhost:5000/api/matching/relation", {
      token: token,
      target: target.id,
      relation: reaction
    });
    console.log(res.data);

    return {
      type: SUGGESTIONS_REACT_SUCCESS,
      payload: target
    };
  } catch (error) {
    console.log("Jma3 karek lay darek.");
    return {
      type: SUGGESTIONS_REACT_FAIL
    };
  }
};
