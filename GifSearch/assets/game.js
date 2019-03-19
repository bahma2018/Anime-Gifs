var topics = ["Cowboy Bebop", "Hunter X Hunter", "Deathnote", "Samurai Champloo"]

function renderBtn(topics) {

    $("#anime-buttons").empty();

    for (i in topics) {

        var animeButton = $("<button>");

        animeButton.val(topics[i]);

        animeButton.text(topics[i]);

        animeButton.addClass("btn btn-info")

        animeButton.attr("id", "aniButton")

        animeButton.attr("style", "margin:5px")

        $("#anime-buttons").append(animeButton);
    }
};

renderBtn(topics)

$("body").on("click", "button", function () {

    $("#gifs-appear-here").empty();

    var animeTitle = $(this).val()

    console.log(animeTitle)
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wessOPU2BOmpv4llw5KC4a34UPbCfdOf&q=" + animeTitle + "&limit=10&"


    $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function (response) {

            console.log(response)

            var results = response.data;

            for (i in response.data) {


                var animeDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);


                var animeImage = $("<img>").attr("id", "gif");

                var animatedGif = results[i].images.fixed_height.url

                var stillGif = results[i].images.fixed_height_still.url

                animeImage.attr("src", stillGif);

                animeImage.attr("data-state", "still")

                animeImage.attr("data-still", stillGif)

                animeImage.attr("data-animated", animatedGif)

                animeDiv.append(p);

                animeDiv.append(animeImage);

                $("#gifs-appear-here").prepend(animeDiv);
            }

        });


});


$("body").on("click", "#gif", function () {



    var state = $(this).data("state");

    if (state === "still") {
        $(this).attr("src", $(this).data("animated"));
        $(this).data("state", "animated");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).data("state", "still");
    }
});



$("#submit").on("click", function (event) {

    event.preventDefault();

    var newAnime = $("#search-input").val().trim();

    topics.push(newAnime);

    renderBtn(topics);

    $("#search-input").val("");

    return false

});