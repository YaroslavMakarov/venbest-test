import { Action } from "redux";

const SET_NAME= "SET_NAME";
const SET_LASTNAME = "SET_LASTNAME";
const SET_AGE = "SET_AGE";
const SET_MALE = "SET_MALE";
const SET_FEMALE = "SET_FEMALE";

type SetName = Action<typeof SET_NAME> & {
    name: string;
}
type SetLastName = Action<typeof SET_LASTNAME> & {
    lastName: string;
}
type SetAge = Action<typeof SET_AGE> & {
    age: number | null;
}
type SetMale = Action<typeof SET_MALE>;
type SetFemale = Action<typeof SET_FEMALE>;

export const setName = (name: string): SetName => ({
    type: SET_NAME,
    name,
});
export const setLastName = (lastName: string): SetLastName => ({
    type: SET_LASTNAME,
    lastName,
});
export const setAge = (age: number | null): SetAge => ({
    type: SET_AGE,
    age,
});
export const setMale = (): SetMale => ({
    type: SET_MALE,
});
export const setFemale = (): SetFemale => ({
    type: SET_FEMALE,
});

export type AllFilersActions = SetName
    | SetLastName
    | SetAge
    | SetMale
    | SetFemale;

export type InitialFiltersState = {
    name: string;
    lastName: string;
    age: number | null;
    male: boolean;
    female: boolean;
};

const initialFiltersState: InitialFiltersState = {
    name: "",
    lastName: "",
    age: null,
    male: false,
    female: false,
};

const filtersReducer = (state = initialFiltersState, action: AllFilersActions) => {
    switch (action.type) {
        case SET_NAME:
            console.log(action.name, 'Action');
            return {
            ...state,
            name: action.name,
        };
        case SET_LASTNAME: return {
            ...state,
            lastName: action.lastName,
        };
        case SET_AGE: return {
            ...state,
            age: action.age,
        };
        case SET_MALE: return {
            ...state,
            male: !state.male,
        };
        case SET_FEMALE: return {
            ...state,
            female: !state.female,
        };

        default: return state;
    }
};

export default filtersReducer;
