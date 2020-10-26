import { combineReducers,
         createStore,
         applyMiddleware,
       } from 'redux';
import thunk from "redux-thunk";
import personsReducer, { InitialPersonsState } from "./persons";
import filtersReducer, {InitialFiltersState} from "./filters";

const rootReducer = combineReducers({
    loadingPersons: personsReducer,
    filters: filtersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type State = {
    loadingPersons: InitialPersonsState;
    filters: InitialFiltersState;
};

//persons selectors
export const personsSelector = (state: State) => (state.loadingPersons.persons);

//filters selectors
export const maleFilterSelector = (state: State): boolean => (state.filters.male);
export const femaleFilterSelector = (state: State): boolean => (state.filters.female);
export const ageFilterSelector = (state: State): number | null => (state.filters.age);
export const nameFilterSelector = (state: State): string => (state.filters.name.toLowerCase());
export const lastNameFilterSelector = (state: State): string => (state.filters.lastName.toLowerCase());


export default store;
