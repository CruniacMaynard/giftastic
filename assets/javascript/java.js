var bandArray = ["Erra", "Veil of Maya", "Stone Sour", "Thousand Foot Krutch", "Celldweller"];

$(document).ready(function() {
    for (var i = 0; i < bandArray.length; i++) {
        $("#band-buttons").append("<button type='button' onclick='searchGif(\"" + bandArray[i] + "\")' class='btn btn-primary' value=' " + bandArray[i] + "'> " + bandArray[i] + " </button>");
    }
});

function bandButtonClicked() {
    var userInput = $('#band-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#band-input').val();

    if (userInput) {
        $('#band-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=dc6zaTOxFJmzC',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#band').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#band').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}