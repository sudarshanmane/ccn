import combineContextProvider from "@/utils/combineContext.jsx";
import AuthContextProvider from "./AuthContext";
import { CreateCandidateContextProvider } from "./CreateCandidateContext.jsx";

export const AppContextProvider = combineContextProvider(
  AuthContextProvider,
  CreateCandidateContextProvider
);
