$("#activate").click(function () {
    $.ajax({
        url: "https://api.scryfall.com/cards/search?q=usd%3C0.06",
        type: "GET",
        dataType: "json",
        success: function(data) {
            $("#output").html("")
            var currData = data[0];
            $("#output").append("<p> For " + currData.value + " points.");
            $("#output").append("<p> In the catagory: " + currData.category.title);
            $("#output").append("<p>" + currData.question);
            $("#output").append("<p> What is " + currData.answer);
            console.log(JSON.stringify(data, null, 2));
        },
        error: function (jqXHR, textStatus, errorThrown) { 
            $("#output").html("")
            $("#output").append("An execption has occurred.")
            console.log("Error:", textStatus, errorThrown);
        }
    })
})
