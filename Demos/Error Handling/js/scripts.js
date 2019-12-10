$(function() { //Identical to $(document).ready(function() {});

    $("#sub").on("click", function () {
        $("#area").html(AreaCalc);
    });
    
    function AreaCalc() {
        var height = $("#height").val();
        var width = $("#width").val();
        var area = height * width;
        try {
            if (!isNaN(area)) {
                return "Area: " + area + " units";
            }
            else {
                throw new Error("User entered invalid number format");
            }
        }
        catch (e) {
            console.error(e.name + ":", e.message);
            return e.message;
        }
    }

});