import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { getPersons } from "../helpers/api";
import { State } from "./rootStore";

const START_LOADING = "START_LOADING";
const SUCCESS_LOADING = "SUCCESS_LOADING";
const ERROR_LOADING = "ERROR_LOADING";


//ActionTypes and action creators
type StartLoading = Action<typeof START_LOADING> & {
    isLoading: boolean;
};
type ErrorLoading = Action<typeof ERROR_LOADING> & {
    isError: boolean;
};
type SuccessLoading = Action<typeof SUCCESS_LOADING> & {
    persons: Person[];
};

export const startLoading = (isLoading: boolean): StartLoading => ({
    type: START_LOADING,
    isLoading,
});
export const errorLoading = (isError: boolean): ErrorLoading => ({
    type: ERROR_LOADING,
    isError,
});
export const successLoading = (persons: Person[]): SuccessLoading => ({
    type: SUCCESS_LOADING,
    persons,
});

//thunks
type PersonsThunk = ThunkAction<void, State, unknown, Action<string>>

export const loadingPersons = (): PersonsThunk => {
    return (dispatch: Dispatch<AllPersonsActions>) => {
        dispatch(startLoading(true));

        return getPersons()
            .then(persons => dispatch(successLoading(persons)))
            .catch(() => dispatch(errorLoading(true)));
    };
};
export type AllPersonThunkAction = PersonsThunk;

export type InitialPersonsState = {
    isLoading: boolean;
    isError: boolean;
    persons: Person[];
};

const initialPersonsState: InitialPersonsState = {
    isLoading: false,
    isError: false,
    persons:[],
};

export type AllPersonsActions = StartLoading
| ErrorLoading
| SuccessLoading;

const personsReducer = (state= initialPersonsState, action: AllPersonsActions) => {
    switch (action.type) {
        case START_LOADING: return {
            ...state,
            isLoading: action.isLoading,
        };
        case ERROR_LOADING: return {
            ...state,
            isError: action.isError,
        };
        case SUCCESS_LOADING: return {
            ...state,
            isLoading: false,
            persons: action.persons
        };

        default: return state;
    }
};

export default personsReducer;
