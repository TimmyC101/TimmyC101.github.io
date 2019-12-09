$(function() { //Identical to $(document).ready(function() {});

    var vacations = {
        "Cozumel": {
            "Country": "Mexico",
            "Activity": "Scuba",
            "Cost": 1000
        },
        "London": {
            "Country": "UK",
            "Activity": "Tourism",
            "Cost": 3000
        },
        "Vale": {
            "Country": "USA",
            "Activity": "Snowboarding",
            "Cost": 2500
        }
    }

    console.group("Vacations");
        console.info(vacations.Cozumel);
        console.warn(vacations.London);
        console.error(vacations.Vale);
    console.groupEnd();
    console.table(vacations);
    
});