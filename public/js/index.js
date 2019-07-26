// Get references to page elements
var $cocktailText = $("#cocktail-text");
var $cocktailIngredient1 = $("#cocktail-ingredient1");
var $cocktailIngredient2 = $("#cocktail-ingredient2");
var $cocktailIngredient3 = $("#cocktail-ingredient3");
var $cocktailIngredient4 = $("#cocktail-ingredient4");
var $cocktailIngredient5 = $("#cocktail-ingredient5");
var $cocktailIngredient6 = $("#cocktail-ingredient6")
var $submitBtn = $("#submit");
var $cocktailList = $("#cocktail-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveCocktail: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/cocktails",
      data: JSON.stringify(example)
    });
  },
  getCocktails: function() {
    return $.ajax({
      url: "api/cocktails",
      type: "GET"
    });
  }
  //I COMMENTED OUT THE FUNCTION BELOW BECAUSE I DON'T THINK WE NEED TO LET USERS DELETE COCKTAILS
  // deleteExample: function(id) {
  //   return $.ajax({
  //     url: "api/cocktails/" + id,
  //     type: "DELETE"
  //   });
  // }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshCocktails = function() {
  API.getCocktails().then(function(data) {
    var $cocktail = data.map(function(cocktail) {
      var $a = $("<a>")
        .text(cocktail.text)
        .attr("href", "/cocktail/" + cocktail.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": cocktail.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $cocktailList.empty();
    $cocktailList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var cocktail = {
    text: $cocktailText.val(),
    ingredient1: $cocktailIngredient1.val(),
    ingredient2: $cocktailIngredient2.val(),
    ingredient3: $cocktailIngredient3.val(),
    ingredient4: $cocktailIngredient4.val(),
    ingredient5: $cocktailIngredient5.val(),
    ingredient6: $cocktailIngredient6.val()
  };

  if (!(cocktail.text && cocktail.ingredient1)) {
    alert("You must enter an name and ingredients!");
    return;
  }

  API.saveCocktail(cocktail).then(function() {
    refreshCocktails();
  });

  $cocktailText.val("");
  $cocktailIngredient1.val();
  $cocktailIngredient2.val();
  $cocktailIngredient3.val();
  $cocktailIngredient4.val();
  $cocktailIngredient5.val();
  $cocktailIngredient6.val();
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteCocktail(idToDelete).then(function() {
    refreshCocktails();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$cocktailList.on("click", ".delete", handleDeleteBtnClick);
