import React, {useEffect, useMemo, useState} from "react";
import { useSelector } from "react-redux";
import {
    ageFilterSelector, femaleFilterSelector,
    lastNameFilterSelector,
    maleFilterSelector,
    nameFilterSelector,
    personsSelector
} from "../../store/rootStore";
import Person from "../Person/Person";
import "./Persons.scss";

const Persons = () => {
    const persons: Person[] = useSelector(personsSelector);
    const nameFilter: string = useSelector(nameFilterSelector);
    const lastNameFilter: string = useSelector(lastNameFilterSelector);
    const ageFilter: number | null = useSelector(ageFilterSelector);
    const maleFilter: boolean = useSelector(maleFilterSelector);
    const femaleFilter: boolean = useSelector(femaleFilterSelector);
    const [preparePersons, setPreparePersons] = useState<Person[]>([]);

    const filteringPersons = (
        personsArray: Person[],
        name: string,
        lastName: string,
        age: number | null,
        male: boolean,
        female: boolean
    ): Person[] => {
        if (
            !name && !lastName && !age
            && !male && !female
        ) {
            return [...personsArray]
        }
        return [...personsArray].filter(person => person.name.toLowerCase().includes(name))
            .filter(person => person.lastname.toLowerCase().includes(lastName))
            .filter(person => {
                if (age) {
                    return person.age === age;
                } else {
                    return person;
                }
            })
            .filter(person => {
                if ((male && female) || (!male && !female)) {

                    return person;
                }

                if (male && !female) {
                    return person.sex === "m"
                }

                return person.sex === "f"

            })
    };

    useMemo(() => {
        setPreparePersons(
            filteringPersons(
                persons,
                nameFilter,
                lastNameFilter,
                ageFilter,
                maleFilter,
                femaleFilter
            )
        )
    }, [
        nameFilter,
        lastNameFilter,
        ageFilter,
        maleFilter,
        femaleFilter
    ]);

    useEffect(() => {
        setPreparePersons([...persons]);
    }, [persons]);

    return (
        <ul className="persons">
            {preparePersons.map(person => (
                <Person
                    key={person.age}
                    person={person}
                />
            ))}
        </ul>
    );
};

export default Persons;
