const API_URL_PERSONS = 'https://venbest-test.herokuapp.com/';

export const getPersons = async () => {
    const responsePersonsAPI = await fetch(API_URL_PERSONS);
    const personsFromServer = await responsePersonsAPI.json();

    return personsFromServer;
};
