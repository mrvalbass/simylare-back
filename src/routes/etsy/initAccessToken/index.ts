import { mwCheckState } from "./checkState";
import { mwGetAccessToken } from "../../../middleware/getAccessToken";
import { codeVerifier } from "..";

export const initAccessToken = () => [
  mwCheckState,
  mwGetAccessToken(codeVerifier),
];
