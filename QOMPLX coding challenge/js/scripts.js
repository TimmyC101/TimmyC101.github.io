// Input validation
var bill = document.getElementById("bill");
var validation = document.getElementById("validation");
var inputValid = false;
var partyValid = false;
bill.onfocus = ShowValidBox;
bill.onblur = HideValidBox;
bill.onkeyup = CheckInput;

function ShowValidBox() {
    if (!validation.classList.contains("show"))
    validation.className += " show";
}

function HideValidBox() {
    // Prevent users from leaving text box if invalid
    if (!inputValid) {
        bill.focus();
    }
    else {
        validation.setAttribute("class", "validator validated");
    }
}

// onkeyup function that turns green for valid input
function CheckInput() {
    // Use regex to remove non numerals from string
    var num = bill.value.replace(/\D/g,''); 
    if (isNaN(num) || num.length == 0) {
        validation.setAttribute("class", "validator show");
        validation.textContent = "Please enter a valid number.";
        inputValid = false;
    }
    else {
        validation.setAttribute("class", "validator validated show");
        validation.textContent = "Number is valid";
        inputValid = true;
    }
}



// Percentage dropdown
var percents = document.getElementById("percent");
var percentText;
percents.onfocus = Percentages;
function Percentages () {
    for (var i=0; i <=25; i++) {
        percentText += "<option>Tip: " + i + "%</option>";
    }
    percents.innerHTML = percentText;
}



// Tip calculation
var calc = document.getElementById("calculate");
calc.onclick = Tipcalc;

function Tipcalc() {
    var split = document.getElementById("party").value;
    // Tip will not calculate if input is invalid
    // and will instead simply display the validation box
    if (!inputValid) {
        validation.setAttribute("class", "validator show");
    }
    // If tip percent is not selected, prompt user
    else if (percents.value === "Percent of Tip") {
        document.getElementById("percent").focus();
        window.alert("Please select a tip percentage.");
    }
    // If split is falsy (i.e. null/undefined) prompt user
    else if (!split || split == 0) {
        document.getElementById("party").focus();
        window.alert("Please select a party size.");
    }
    else {      
        // Retrieve tip variables
            // Use regex to remove non numerals from string
        var totalBill = document.getElementById("bill").value.replace(/\D/g,''); ;
        var tipString = document.getElementById("percent").value
        // Convert tip string to integer
        if (tipString.length == 7) {
            tipPercent = tipString.charAt(5);
        }
        if (tipString.length == 8) {
            tipPercent = tipString.substring(5,7);
        }
        var splitBill = totalBill / split;
    
        // calculate tip
        var tipNum = splitBill * (tipPercent/100);
        var tipString = tipNum.toFixed(2);
        document.getElementById("tipamount").textContent = "$" + tipString;
    
        // calculate personal total
        var finalBillNum = (tipNum + splitBill);
        var finalBillString = finalBillNum.toFixed(2);
        document.getElementById("personalamount").textContent = "$" + finalBillString;
    }
    if (tipNum == 0) {
        window.alert("No tip? smh...");
    }
}



// Cleave formatting
new Cleave('.numeral', {
    numeral: true,
    prefix: '$',
});



// Recoloring based on tip percentage
percents.onchange = Temperature;
var calculator = document.getElementById("calculator");

function Temperature() {
    var tipString = percents.value
    // reset classList
    calculator.setAttribute("class", "bg-gray border center fontcolor");
    // Convert tip string to integer
    if (tipString.length == 7) {
        tipPercent = tipString.charAt(5);
    }
    if (tipString.length == 8) {
        tipPercent = tipString.substring(5,7);
    }

    if (tipPercent <= 5) {
        calculator.className += " coldest";
    }
    else if (tipPercent <= 10) {
        calculator.className += " colder";
    }
    else if (tipPercent <= 15) {
        calculator.className += " cold";
    }
    else if (tipPercent <= 20) {
        calculator.className += " warm";
    }
    else {
        calculator.className += " warmest";
    }
}
