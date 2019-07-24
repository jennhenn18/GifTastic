// Wait to execute code until DOM has safely loaded 
$(document).ready(function() {

  // array variable that stores animal names. These animal names display upon page load as default animal buttons
  var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];

  // create function that runs that populates buttons dynamically
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    //areatoAddTo loads empty
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      //create variable to store a buttom html element
      var a = $("<button>");
      //dot notation adds class to the button html element
      a.addClass(classToAdd);
      //dot notation adds a data type of the array iteration to the button
      // ======== not sure what arrayToUse is =======
      a.attr("data-type", arrayToUse[i]);
      //dot notation adds the array iteration text to the button
      a.text(arrayToUse[i]);
      //use jquery to append the button 
      // ======== finish this piece =========
      $(areaToAddTo).append(a);
    }

  }
  //listen for an onlick event for the button with class animal-buton. When clicked run the following function
  $(document).on("click", ".animal-button", function() {
   // empty the div html element
    $("#animals").empty();
    // remove class from div html element 
    $(".animal-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div class=\"animal-item\">");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;

          var animalImage = $("<img>");
          animalImage.attr("src", still);
          animalImage.attr("data-still", still);
          animalImage.attr("data-animate", animated);
          animalImage.attr("data-state", "still");
          animalImage.addClass("animal-image");

          animalDiv.append(p);
          animalDiv.append(animalImage);

          $("#animals").append(animalDiv);
        }
      });
  });

  $(document).on("click", ".animal-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("input").eq(0).val();

    if (newAnimal.length > 2) {
      animals.push(newAnimal);
    }

    populateButtons(animals, "animal-button", "#animal-buttons");

  });

  populateButtons(animals, "animal-button", "#animal-buttons");
});
