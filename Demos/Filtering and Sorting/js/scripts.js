$(function() { //Identical to $(document).ready(function() {});

    // Create retrogames array
    var retroGames = [
        {
            name: "Street Fighter 2",
            console: "Super Nintendo",
            price: 30
        },
        {
            name: "Super Mario World",
            console: "Super Nintendo",
            price: 40
        },
        {
            name: "Super Metroid",
            console: "Super Nintendo",
            price: 25
        },
        {
            name: "Donkey Kong Country",
            console: "Super Nintendo",
            price: 50
        },
        {
            name: "Contra 3",
            console: "Super Nintendo",
            price: 30
        },
        {
            name: "Super Mario 64",
            console: "Nintendo 64",
            price: 10
        },
        {
            name: "Zelda: Ocarina of Time",
            console: "Nintendo 64",
            price: 60
        },
        {
            name: "Pilotwings",
            console: "Nintendo 64",
            price: 15
        },
        {
            name: "Goldeneye",
            console: "Nintendo 64",
            price: 30
        },
        {
            name: "Gauntlet Legends",
            console: "Nintendo 64",
            price: 30
        },
        {
            name: "Bubble Bobble",
            console: "Nintendo",
            price: 50
        },
        {
            name: "Ghosts N' Ghouls",
            console: "Nintendo",
            price: 20
        },
        {
            name: "Super Mario Bros",
            console: "Nintendo",
            price: 10
        },
        {
            name: "Super Mario Bros 3",
            console: "Nintendo",
            price: 50
        },
        {
            name: "Excitebike",
            console: "Nintendo",
            price: 5
        },
        {
            name: "Final Fantasy 7",
            console: "Playstation",
            price: 25
        },
        {
            name: "Metal Gear Solid",
            console: "Playstation",
            price: 25
        },
        {
            name: "Final Fantasy Tactics",
            console: "Playstation",
            price: 50
        },
        {
            name: "Resident Evil",
            console: "Playstation",
            price: 20
        }
    ];

    // Create table headers using Object.keys to be flexible if object properties change
    var keys = Object.keys(retroGames[0]);
    var col1 = keys[0].charAt(0).toUpperCase() + keys[0].substring(1); //uppercase first letter
    var col2 = keys[1].charAt(0).toUpperCase() + keys[1].substring(1);
    var col3 = keys[2].charAt(0).toUpperCase() + keys[2].substring(1);
    var $table = $("<table></table");
    var $tr = $("<tr></tr>");
    $tr.append($("<th id='name'></th>").text(col1));
    $tr.append($("<th id='console'></th>").text(col2));
    $tr.append($("<th id='price'></th>").text(col3));
    $table.append($tr);
    var $th = $table.find("th");

    var rows = [];
    var rowsort = [];
    
    // Create table body using forEach method of array object to loop through each game and add to table
    retroGames.forEach(function(game) {
        var $tr = $("<tr></tr>");
        $tr.append($("<td></td>").text(game.name));
        $tr.append($("<td></td>").text(game.console));
        $tr.append($("<td></td>").text(game.price));
        $table.append($tr);
        // Create array of retroGame objects corresponding to DOM table rows
        rows.push({
            game: game, // rows array will contain the game object and the DOM row object
            $ele: $tr
        });
        rowsort.push($tr); // create an array of just the rows for sorting
    });

    $("#games").append($table); // Add table to DOM
    
    
    // Table column sorting
    $th.on("click", function () {
        var $header = $(this);
        var index = $th.index(this);
        if ($header.hasClass("asc") || $header.hasClass("desc")) {
            $header.toggleClass("asc desc");
            $table.append(rowsort.reverse());
        }
        else {
            $header.siblings().removeClass("asc desc");
            $header.addClass("asc");
            if (this.id == "name" || this.id == "console") {
                rowsort.sort(function(a,b) {
                    a = $(a).find("td").eq(index).text(); // Indentical to: a[0].cells[0].innerHTML
                    b = $(b).find("td").eq(index).text();
                    if (a < b) {
                        return -1;
                    }
                    else {
                        return a > b ? 1 : 0;
                    }
                });
            }
            else if (this.id == "price") {
                rowsort.sort(function(a,b) {
                    a = $(a).find("td").eq(index).text();
                    b = $(b).find("td").eq(index).text();
                    return a - b;
                });
            }
            $table.append(rowsort);
        }
    });

    
    // Filter by console
    $("#search").on("click", function () {
        rows.forEach(function(row) {
            if (row.game.console == $("#console option:selected").text()) {
                row.$ele.show();
            }
            else {
                row.$ele.hide();
            }
        });
    });


    // Show full table
    $("#reset").on("click", function () {
        rows.forEach(function(row) {
            row.$ele.show();
        });
    });

});