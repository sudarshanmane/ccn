import combineContextProvider from "@/utils/combineContext.jsx";
import AuthContextProvider from "./AuthContext";

export const AppContextProvider = combineContextProvider(AuthContextProvider);
