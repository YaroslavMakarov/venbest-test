import React, { useEffect, Dispatch } from 'react';
import { useDispatch } from "react-redux";
import './App.scss';
import { AllPersonThunkAction, loadingPersons} from "./store/persons";
import Persons from "./components/Persons/Persons";
import FiltersBar from "./components/FiltersBar/FiltersBar";

function App() {
    const personThunkDispatch = useDispatch<Dispatch<AllPersonThunkAction>>();

    useEffect(() => {
        personThunkDispatch(loadingPersons());
    }, []);

  return (
    <div className="app">
      <FiltersBar />
      <Persons />
    </div>
  );
}

export default App;
