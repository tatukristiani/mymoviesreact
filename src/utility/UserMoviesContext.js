import {createContext} from "react";

/**
 * Used to share logged users movies accross the application.
 * @type {React.Context<null>}
 */
export const UserMoviesContext = createContext(null);