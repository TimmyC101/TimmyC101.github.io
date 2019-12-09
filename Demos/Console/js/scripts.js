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

    // console.log(Object.keys(vacations));
    // console.log(Object.keys(vacations).length);

    var $table = $("<table></table>");
    var trhead = "<tr><th>City</th><th>Country</th><th>Activity</th><th>Cost</th></tr>";
    $table.append(trhead);
    $(".column.content").append($table);

    $.each(vacations, function(vacations) {
        var $tr = $("<tr></tr>");
        var td = "";
        td += "<td>" + vacations + "</td>";
        td += "<td>" + this.Country + "</td>";
        td += "<td>" + this.Activity + "</td>";
        td += "<td>" + this.Cost + "</td>";
        $tr.append(td);
        $table.append($tr);
    });
    
});