$(function() { //Identical to $(document).ready(function() {});

    doc = $(document);
    var X1, Y1, X2, Y2, height, width;
    var moving = false;
    var color = "";
    var counter = 0;
    $("#rectangles").css("height",$(window).height());

    doc.on("mousedown", function(e) {
        console.log(e.target);
        if (e.target.id == "clickArea" || e.target.classList.contains("rect")) {
            X1 = e.pageX;
            Y1 = e.pageY;
            moving = true;
        }
    });

    doc.on("mousemove", function(e) {
        if (moving && (e.target.id == "clickArea" || e.target.classList.contains("rect"))) { // do not execute once mouse has been released or if clicking over the dropdown box
            color = $("#color option:selected").text();
            X2 = e.pageX;
            Y2 = e.pageY;
            width = Math.abs(X1 - X2);
            height = Math.abs(Y1 - Y2);
            $(".rectangle").css({ // the top left of the box is always created from the smaller of the two X and Y values
                "background-color": color,
                "left": Math.min(X1, X2),
                "top": Math.min(Y1, Y2),
                "height": height,
                "width": width,
                "z-index": "1"
            });
        }
    });

    doc.on("mouseup", function(e) {
        if (e.target.id == "clickArea" || e.target.classList.contains("rect")) {
            moving = false;
            counter +=1;
            $("#rectangles").append("<div class='rect rectangle" + counter + "'</div>");
            $(".rectangle"+counter).css({
                "background-color": color,
                "position": "absolute",
                "left": Math.min(X1, X2),
                "top": Math.min(Y1, Y2),
                "height": height,
                "width": width
            });
        }
    });

    $("#clear").on("click", function (e) {
        $(".rectangle").removeAttr("style");
        for (var i = 1; i <= counter; i++)
        {
            $(".rectangle"+i).remove();
        }
    });

});