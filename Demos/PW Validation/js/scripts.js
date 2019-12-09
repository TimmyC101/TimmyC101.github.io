$(function() { //Identical to $(document).ready(function() {});

    $("#pw_label").width($("#un_label").width()); //set pw label width equal to username label width to align input boxes

    var $pw = $("#pw");
    $pw.focus();
    var $val = $("#validation");
    $val.show();

    $pw.on("blur", function () {
        $val.hide();
    });

    $pw.on("focus keyup", function () {
        var pw = $pw.val();
        $val.show();

        if (pw.length >= 6) // validate length of password
        {
            $("#chars").addClass("valid").removeClass("invalid");
        }
        else
        {
            $("#chars").addClass("invalid").removeClass("valid");
        }

        if (pw.match(/[A-Z]/) && pw.match(/[a-z]/)) // validate that pw contains uppercase and lowercase letters
        {
            $("#letters").addClass("valid").removeClass("invalid");
        }
        else
        {
            $("#letters").addClass("invalid").removeClass("valid");
        }

        if (pw.match(/[0-9]/)) // validate that pw contains a number
        {
            $("#numbers").addClass("valid").removeClass("invalid");
        }
        else
        {
            $("#numbers").addClass("invalid").removeClass("valid");
        }

        if (pw.match(/[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) // validate that pw contains a special character
        {
            $("#special").addClass("valid").removeClass("invalid");
        }
        else
        {
            $("#special").addClass("invalid").removeClass("valid");
        }

    })

});