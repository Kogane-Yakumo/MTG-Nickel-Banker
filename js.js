function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }  

$("#activate").click(function () {
    $("#output").html("Rotated Cards:")
    var deckList = $("#decklist").val();
    var deckList = deckList.split("\n")
    var deckCards = deckList.flatMap((x) => x.slice(2));
    var rotations = 0;
    for (let i = 0; i < deckCards.length; i++) {
        $.ajax({
            url: "https://api.scryfall.com/cards/search?q=usd<0.06+(st%3Dcore+or+st%3Dexpansion)" + deckCards[i].replaceAll(" ","-"),
            type: "GET",
            dataType: "json",
            success: function(data) {
                console.log(JSON.stringify(data, null, 2));
                
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                $("#output").append("<p>" + deckCards[i]);
                rotations += 1;
                console.log("Error:", textStatus, errorThrown);
                // It kinda sucks that we're litterally using 404 errors to determine rotations but this is the simplest way to do this.
            }
        })
        sleep(70);
        // This is here so that we don't get yelled at by Scryfall for flooding their API with requests
    }
})
