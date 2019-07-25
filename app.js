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
    console.log("================" + areaToAddTo);
    console.log("================" + arrayToUse);
    console.log("================" + classToAdd);

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
   // empty the div html element with an ID of animals
    $("#animals").empty();
    // remove class "active" from div html element with a class of animal-button. This will remove the active class from a button when a new one is selected
    $(".animal-button").removeClass("active");
    // adds a class of "active" to the button selected
    $(this).addClass("active");
    
    // create a variable and that stores the data-type of the selected button. For example, if Salamander is pressed, then the input of Salamander is stored in the type variable.
    var type = $(this).attr("data-type");
    // create a variable that store the following parameters: API URL, API KEY, and type variable that is captured above and contans the data type of the button selected. This will later pass information to the URL of what results to return.
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    //USing JQuery create a AJAX method. 
    $.ajax({
      // pass off the queryURL above to the API. This will contain the data-type of the selected button
      url: queryURL,
      // define a method as GET to request data from the GIPHY API
      method: "GET"
    })
    // .then tells us a promise method is created and the callback function passing in the arg response will return once the API call is complete
      .then(function(response) {
        // create a variable results that will store the data array recieved from the response of the API call
        var results = response.data;

        //create a for loop that will enable us to loop through the entire data array recieved from the API call
        for (var i = 0; i < results.length; i++) {
          // create a variable that stores the creation of an div HTML element with a class of animal-item
          var animalDiv = $("<div class=\"animal-item\">");

          //create a variable called rating that stores the rating of an image. This pulls the value from the image key-pair for each iteration returned by the for loop.
          var rating = results[i].rating;

          // create a variable that using JQuery dynamically creates a paragraph HTML element and displays static text "Rating" followed by the rating variable which will differ based on the rating of each image.
          var p = $("<p>").text("Rating: " + rating);

          // create a variable that stores the specifc fixed height URL for each array iteration returned in the for loop
          var animated = results[i].images.fixed_height.url;
          // create a variable that stores the still image URL for each array iteration returned in the for loop
          var still = results[i].images.fixed_height_still.url;

          // create a variable that will dynamically add a HTML IMG element
          var animalImage = $("<img>");
          // Use the attribute method to assign an image source using the still. This will display the still image in the IMG HTML element and be the default image displayed when loaded.
          animalImage.attr("src", still);
          // Use the attribution method to assign a data-still type with the still URL stored in the still variable
          animalImage.attr("data-still", still);
          // Use the attribution method to assign a data-animate type with the fixed height URL stored in the animated variable
          animalImage.attr("data-animate", animated);
          // Use the attribution method to assign a data-state of still upon image load
          animalImage.attr("data-state", "still");
          // Use the addClass method to add a class of animal-image to the image element
          animalImage.addClass("animal-image");

          // Using JQuery and dot notation append the rating text for each image that is stored in the p variable to the animalDiv variable
          animalDiv.append(p);
          // Using JQuery and dot notation append the animal image to the animalDiv variable with the image information stored in the variable. This image HTML element will contain three URLs: still and animate and the default being the still image. 
          animalDiv.append(animalImage);

          //Using JQuery append the information stored in animalDiv (rating text and image URLs) to any HTML elemenet with an ID of animals
          $("#animals").append(animalDiv);
        }
      });
  });

  // Create an event listener that is waiting for an onclick event of anything with the class of animal-image. If event occurs run the following function
  $(document).on("click", ".animal-image", function() {

    //create a variable that stores the image data-state using the attribution method. In this case the default data-state is always still based on line 87
    var state = $(this).attr("data-state");

    // create a conditional
    // if the data-state or state variable is equal to still run the code on 111 and 112
    if (state === "still") {
      // using JQuery and dot notation update the src URL to the animated image URL. This will update the still image to the animated image.
      $(this).attr("src", $(this).attr("data-animate"));
      // using JQuery and dot notation update the data-state from still to animate.
      $(this).attr("data-state", "animate");
    }
    // if the data-state or statevairable is not equal to still run the code on 118 and 119
    else {
      // using Jquery and dot notation update the src URL to the still image URL. This will change the animated image to the still image.
      $(this).attr("src", $(this).attr("data-still"));
      // using JQuery and dot notation update the data-state from animate to still.
      $(this).attr("data-state", "still");
    }
  });

  // Using JQuery create an event listener that listens for an onclick event on any HTML element with the ID of add-animal. In this case, it is the Submit button. When pressed run the following function and pass in the arg event
  $("#add-animal").on("click", function(event) {
    // When this method is called it prevents the default action from occuring. In this case, the submit button will not reload the page. ============= IS THIS CORRECT??? ============
    event.preventDefault();
    // Create a variable that stores the value of text entered in the input box
    var newAnimal = $("input").eq(0).val();

    // create a conditional that reads the string stored in the newAnimal variable
    // if the length of the newAnmial variable is greater than 2 fun the code on line 135
    if (newAnimal.length > 2) {
      //push the text input stored in the newAnimal variable to the animals array
      animals.push(newAnimal);
    }
    //run the populateButtons function after the an input is submitted and the function that begins on line 126 is completed. This will add the new animal button to the screen
    populateButtons(animals, "animal-button", "#animal-buttons");

  });

  populateButtons(animals, "animal-button", "#animal-buttons");
  // run this function upload page load. This will display the default animals reflected in the animal array defined as a global variable.
});
