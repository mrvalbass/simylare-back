import { mwCheckState } from "./checkState";
import { mwGetAccessToken } from "../../../middleware/getAccessToken";

export const initAccessToken = () => [mwCheckState, mwGetAccessToken()];
