import { mwCheckState } from "./checkState";
import { mwGetAccessToken } from "../../../middleware/getAccessToken";
import { codeVerifier } from "..";

export const saveAccessToken = () => [
  mwCheckState,
  mwGetAccessToken(codeVerifier),
];
