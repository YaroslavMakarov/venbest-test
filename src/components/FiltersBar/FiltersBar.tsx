import React, { useCallback, Dispatch, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from 'lodash.debounce';
import "./FiltersBar.scss";
import {AllFilersActions, setAge, setFemale, setLastName, setMale, setName} from "../../store/filters";
import { femaleFilterSelector, maleFilterSelector } from "../../store/rootStore";

const FiltersBar = () => {
    const [nameValue, setNameValue ] = useState<string>("");
    const [lastNameValue, setLastNameValue ] = useState<string>("");
    const [ageValue, setAgeValue ] = useState<string>("");
    const [NaNAlert, changeNaNAlert] = useState<boolean>(false);
    const maleIsChecked = useSelector(maleFilterSelector);
    const femaleIsChecked = useSelector(femaleFilterSelector);

    const filterDispatch = useDispatch<Dispatch<AllFilersActions>>();
    const filterTextInputDispatch = (name: string, value: string) => {
        if (name === "name") {
            filterDispatch(setName(value));
        } else if (name === "lastName") {
            filterDispatch(setLastName(value))
        } else if (name === "age") {
            if (!isNaN(Number(value)) && value !== "") {
                filterDispatch(setAge(Number(value)));
            } else if (value === "") {
                filterDispatch(setAge(null));
            }
        } else if (name === "male") {
            filterDispatch(setMale())
        }
    };

    const debounceFilterParams = useCallback(
        debounce(filterTextInputDispatch, 500),
        [],
    );

    const changeTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "name") {
            setNameValue(value);
        } else if (name === "lastName") {
            setLastNameValue(value);
        } else if (name === "age") {
            setAgeValue(value);
        }

        debounceFilterParams(name, value);
    };
    const isNumberAgeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (isNaN(Number(value)) && value !== "") {
            changeNaNAlert(true);
        } else {
            changeNaNAlert(false);
        }
    };

    return (
        <div className="filters">
            <div className="filters__wrapper">
                <div>
                    Имя
                </div>
                <input
                    type="text"
                    name="name"
                    value={nameValue}
                    className="filters__text-input"
                    placeholder="Введите имя"
                    onChange={(event) => {
                        changeTextInput(event);
                    }}
                />
            </div>
            <div className="filters__wrapper">
                <div>
                    Фамилия
                </div>
                <input
                    type="text"
                    name="lastName"
                    value={lastNameValue}
                    className="filters__text-input"
                    placeholder="Введите фамилию"
                    onChange={(event) => {
                        changeTextInput(event);
                    }}
                />
            </div>
            <div className="filters__wrapper">
                <div>
                    Возраст
                </div>
                <div className="filters__text-input-age-wrapper">
                    <input
                        type="text"
                        name="age"
                        value={ageValue}
                        className="filters__text-input filters__text-input-age"
                        placeholder="Введите возраст(число)"
                        onChange={(event) => {
                            changeTextInput(event);
                            isNumberAgeInput(event);
                        }}
                    />
                    {NaNAlert && <div className="filters__isNumber-alert">
                        Знание должно быть числом
                    </div>}
                </div>

            </div>
            <div className="filters__wrapper">
                <div>
                    Пол
                </div>
                <div className="filters__checkbox-wrapper">
                    <label className="filters__checkbox-label">
                        <span>
                            М
                        </span>
                        <input
                            type="checkbox"
                            name="male"
                            checked={maleIsChecked}
                            onChange={() => filterDispatch(setMale())}
                        />
                    </label>
                    <label className="filters__checkbox-label">
                        <span>
                            Ж
                        </span>
                        <input
                            type="checkbox"
                            name="female"
                            checked={femaleIsChecked}
                            onChange={() => filterDispatch(setFemale())}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default FiltersBar;
