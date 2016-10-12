module.exports = {
    getFlights: function () {
        // get flight data from database
        return (
            [
                { "flight": "AHA1111", "from": "Dublin", "to": "Paris", "departure": "2016.11.27", "arrival": "2016.11.27" },
                { "flight": "AHA01", "from": "Dublin", "to": "Budapest", "departure": "2016.11.27", "arrival": "2016.11.27" },
                { "flight": "AHA01", "from": "Nantes", "to": "Dublin", "departure": "2016.11.27", "arrival": "2016.11.27" },
                { "flight": "AHA01", "from": "Budapest", "to": "Nantes", "departure": "2016.11.27", "arrival": "2016.11.27" },
            ]
        );
    },
};