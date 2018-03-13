$(function() {
    $("button, #close-modal").on("click", function() {
        $("#container").toggleClass("menu-open");
    });

    var wp = new Waypoint({
        element: $(".section.b"),
        handler: function(direction) {
            console.log("Scrolled to waypoint!");
        },
        offset: "20%"
    });




});