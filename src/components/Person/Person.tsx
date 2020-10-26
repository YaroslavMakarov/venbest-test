import React from "react";
import "./Person.scss";

type Props = {
    person: Person;
}

const Person: React.FC<Props> = ({ person }) => {
    const { name, lastname, age, sex } = person;

    return (
        <li className="person">
            <div className="person__name">
                {` ${name} ${lastname}`}
            </div>
            <div className="person__age">
                {`Возраст: ${age}`}
            </div>
            <div className="person__sex">
                {`Пол: ${sex === "m" ? "мужской" : "женский"}`}
            </div>
        </li>
    );
};

export default Person;
