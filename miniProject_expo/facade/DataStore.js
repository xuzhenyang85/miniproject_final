import React from 'react';

    // change to active ngrok tunnel
    const URL = 'http://b661cc13.ngrok.io/';
    //const URL = 'http://localhost:3000/';
    class DataStore extends React.Component {
        constructor() { 
            super();
            this.login = this.login.bind(this);
        }
        login(username, password, callback) {
            var data = {
                username: username,
                password: password,
                longitude: 12.487678527832031,
                latitude: 55.77386963550729,
                distance: 1000
            }
            fetch(URL + 'api/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(function(data) {
                return data.json();
                console.log(data);
            }).then(function(data) {
                callback(data);
            })
        }

    }
    export default DataStore;