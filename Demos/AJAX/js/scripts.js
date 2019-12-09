$(document).ready(function() {

    var public_assist =""; // Create as global variable to access in all functions
    var tbl = document.getElementById("tbl"); // Create global variable to represent div where tables will be placed

    $("#load_data").click(function() {
        $.ajax({
            url:"https://data.cityofnewyork.us/api/views/kku6-nxdu/rows.csv?accessType=DOWNLOAD",
            dataType:"text",
            success:function(data) 
            {
                // DELETE ALL EXISTING TABLES
                tbl.innerHTML = "";

                var demo_data = data.split(/\r?\n|\r/); // creates an array with each index representing one row of data (splitting by line feed or carriage return)
                var zip_count = 0;
                var table = document.createElement("table");
                var table_body = document.createElement("tbody");

                for (var row_count = 0; row_count < demo_data.length; row_count++ ) // for each row of csv document
                {
                    var table_row = document.createElement("tr");
                    var cell_data = demo_data[row_count].split(","); // creates array with each index representing one cell value
                    if (cell_data[0] != "") // only execute if row contains data - to prevent erroneous blank rows being added
                    {
                        for (var cell_count = 0; cell_count < cell_data.length; cell_count++ ) // for each value of a given row
                        {
                            var cell_text = document.createTextNode(cell_data[cell_count]);
                            if (row_count === 0) // If first row of data, create headers
                            {
                                var table_header = document.createElement("th");
                                table_header.appendChild(cell_text);
                                table_row.appendChild(table_header);

                                if (cell_data[cell_count] == "COUNT RECEIVES PUBLIC ASSISTANCE" && public_assist ==="") // if statement to retrieve index of public assistance column, only executes once
                                {
                                    public_assist = cell_count; 
                                }
                            }
                            else // If not first row of data, create table data
                            {
                                var table_data = document.createElement("td");
                                table_data.appendChild(cell_text);
                                table_row.appendChild(table_data);
                            }
                        }
                        zip_count++;
                        table_body.appendChild(table_row);
                    }
                }
                // Create row for zip code count
                var zipRow = document.createElement("tr");
                var zipData = document.createElement("td");
                zipData.appendChild(document.createTextNode("Zip Codes: " + (zip_count-1))); // Remove 1 from zip_count to account for header row
                zipRow.appendChild(zipData);
                table_body.appendChild(zipRow);
                // Append all 
                table.appendChild(table_body);
                table.id = "table1";
                tbl.appendChild(table);
            }
        });
    });

    $("#load_desc").click(function() {
        if (public_assist === "") // Direct user if they try to sort before loading
        {
            window.alert("The data must be loaded before it can be sorted.");
        }
        else if (tbl.firstElementChild.id === "table3")// if statement to not execute if data is already sorted
        {
            window.alert("The data is already sorted!");
        }
        else
        {
            // CREATE TABLE WHERE PUBLIC ASSISTANCE COUNT IS > 20
            var table1 = document.getElementById("table1");
            table1.style.display = "none";
            var table2 = document.createElement("table");
            var table2_body = document.createElement("tbody");
            var increment = true;

            for (var i = 0; i < table1.rows.length-1; i++)
            {
                if (!increment) // subtract 1 from i to account for removed row
                {
                    i--;
                }
                increment = true; //reset increment to true
                var pub_ast_count = table1.rows[i].cells[public_assist].firstChild.nodeValue // find public assistance count in a given row
                if (i == 0 || pub_ast_count > 20)
                {
                    var table_row = table1.rows[i];
                    table2_body.appendChild(table_row);
                    if (pub_ast_count > 20)
                    {
                        increment = false;
                    }
                }
            }
            table2.appendChild(table2_body);
            table2.id = "table2";
            tbl.innerHTML = "";
            document.getElementById("tbl").appendChild(table2);

            /////////////////////////////////////////////////////////////////////////////////////

            // CREATE NEW TABLE WHERE PUBLIC ASSISTANCE COUNT IS > 20 AND SORTED DESCENDING
            var table3 = document.createElement("table");
            var table_body3 = document.createElement("tbody");
            table_body3.appendChild(table2.rows[0]); //This actually removes the node from table 2 and places it in table 3

            while (table2.rows.length > 0)
            {
                var highRow = 0;
                var highCount = table2.rows[0].cells[public_assist].firstChild.nodeValue; // Set bar equal to assistance count of first row
                if (table2.rows.length >= 2)
                {
                    for (var i = 0; i < table2.rows.length-1; i++)
                    {
                        var pub_ast_count = table2.rows[i+1].cells[public_assist].firstChild.nodeValue;
                        if (parseInt(pub_ast_count) > parseInt(highCount))
                        {
                            highCount = pub_ast_count;
                            highRow = i+1;
                        }
                    }
                }
                table_body3.appendChild(table2.rows[highRow]);
                //table2.deleteRow(highRow); // Do not have to delete rows, appending a row moves it from one table to another
            }

            table3.appendChild(table_body3);
            table3.id = "table3";
            // table2.style.display = "none";
            tbl.innerHTML = "";
            document.getElementById("tbl").appendChild(table3);
        }        
    });

    $("#reload_page").click(function() {
        location.reload();
    });

    $("#json").click(function() {
        if (public_assist === "") // Direct user if they try to export before loading
        {
            window.alert("The data must be loaded before it can be exported.");
        }
        else if (tbl.firstElementChild.id === "table3")
        {
            window.alert("Please reload full data set prior to exporting");
        }
        else
        {
            var data = [];
            var table1 = document.getElementById("table1");
            table1.deleteRow(table1.rows.length-1); //delete last row of table that contains zipcode prior to download
        
            // find headers
            var headers = [];
            for (var i=0; i<table1.rows[0].cells.length; i++) 
            {
                headers[i] = table1.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,''); // use toLowerCase method and regex to create "key" names
            }
        
            // go through cells
            for (var i=1; i<table1.rows.length; i++) // for each row do this
            { 
                var tableRow = table1.rows[i];
                var rowData = {};
        
                for (var j=0; j<tableRow.cells.length; j++)  // for each cell do this
                {
                    rowData[ headers[j] ] = tableRow.cells[j].innerHTML; //asign key/value pair to each cell
                }
            data.push(rowData); // add key/value pair to "data" array
            }
        data = JSON.stringify(data); //convert data from object to string
        JSONdownload("JSON", data);
        }  
    });

    
    function JSONdownload(filename, text) {
        var blob = new Blob([text], {type: "application/json"});
        if(window.navigator.msSaveOrOpenBlob) // if statement to address different browser behavior
        {
            window.navigator.msSaveBlob(blob, filename);
        }
        else
        {
            var elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;        
            document.body.appendChild(elem);
            elem.click();        
            document.body.removeChild(elem);
        }
    }

    $("#xml").click(function() {
        if (public_assist === "") // Direct user if they try to export before loading
        {
            window.alert("The data must be loaded before it can be exported.");
        }
        else if (tbl.firstElementChild.id === "table3")
        {
            window.alert("Please reload full data set prior to exporting");
        }
        else
        {
            var table1 = document.getElementById("table1");
            table1.deleteRow(table1.rows.length-1); //delete last row of table that contains zipcode prior to download
            console.log(table1);
        
            // create an array called "headers" that represents the header row
            var headers = [];
            for (var i=0; i<table1.rows[0].cells.length; i++) 
            {
                headers[i] = table1.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi,''); // use toLowerCase method and regex to create "key" names
            }

            // go through cells
            var xml_string = "<root>";
            for (var i=1; i<table1.rows.length; i++) // for each row do this
            { 
                xml_string += "<object>"; // each row represents one xml object
                var tableRow = table1.rows[i];
                for (var j=0; j<tableRow.cells.length; j++) // for each cell do this
                { 
                    xml_string += "<" + headers[j] + ">" + tableRow.cells[j].innerHTML + "</" + headers[j] + ">";
        
                }
                xml_string += "</object>";
            }
            xml_string += "</root>";
            download("XML.xml", xml_string)
        }
    });

    $("#DL").click(function() {
        if (public_assist === "") // Direct user if they try to export before loading
        {
            window.alert("The data must be loaded before it can be exported.");
        }
        else if (tbl.firstElementChild.id === "table3")
        {
            window.alert("Please reload full data set prior to exporting");
        }
        else
        {
            var table1 = document.getElementById("table1");
            table1.deleteRow(table1.rows.length-1); //delete last row of table that contains zipcode prior to download
            download("HTML.html", table1.outerHTML);
        }
    });
        
    function download(filename, text) {
        var blob = new Blob([text], {type: "text/plain"});
        if(window.navigator.msSaveOrOpenBlob) // if statement to address different browser behavior
        {
            window.navigator.msSaveBlob(blob, filename);
        }
        else
        {
            var elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;        
            document.body.appendChild(elem);
            elem.click();        
            document.body.removeChild(elem);
        }
    }

});