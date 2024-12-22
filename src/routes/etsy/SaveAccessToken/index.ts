import { mwCheckState } from "./checkState";
import { mwGetAccessToken } from "../../../middleware/getAccessToken";
import { mwSaveAccessToken } from "./saveAccessToken";

export const saveAccessToken = () => [
  mwCheckState,
  mwGetAccessToken,
  mwSaveAccessToken,
];

export const refreshAccessToken = () => [mwGetAccessToken, mwSaveAccessToken];
