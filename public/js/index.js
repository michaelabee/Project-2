// Get references to page elements
var $cocktailText = $("#cocktail-text");
var $cocktailIngredient1 = $("#cocktail-ingredient1");
var $cocktailIngredient2 = $("#cocktail-ingredient2");
var $cocktailIngredient3 = $("#cocktail-ingredient3");
var $cocktailIngredient4 = $("#cocktail-ingredient4");
var $cocktailIngredient5 = $("#cocktail-ingredient5");
var $cocktailIngredient6 = $("#cocktail-ingredient6");
var $recipeSteps = $("#recipe-steps");
var $submitBtn = $("#submit");
var $cocktailList = $("#cocktail-list");

// The API object contains methods for each kind of request we'll make
var API = {
  searchtopic: function(topic) {
    return $.ajax({
      type: "GET",
      url: "/api/cocktails/" + name
    });
  },

  saveCocktail: function(cocktail) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/cocktails",
      data: JSON.stringify(cocktail)
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
    // console.log(data);
    // var ul = $("#example-list");
    // var a;

    // $("#example-list li").each(function(j) {
    //   if (data.length < j) {
    //     return;
    //   }
    //   console.log("this", data[j].name);
    //   // $(this).attr("<a></a>");
    //   a = $("<a href='/example'>" + data[j].name + "</a>");
    //   // li = $(".list-group-item").append(a);
    //   // $(this).attr("href", "/cocktails/" + cocktail.id);
    // });

    // ul.append(a);
    // $("#example-list").append(li);
    console.log(data);
    var $cocktails = data.map(function(cocktail) {
      console.log(cocktail.id);
      var $a = $("<a>")
        .text(cocktail.name)
        .attr("href", "/example/" + cocktail.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": cocktail.id
        })
        .append($a);

      // var $button = $("<button>")
      //   .addClass("checkbox")
      //   .text("ｘ");

      // var x = document.createElement("INPUT");
      // x.setAttribute("type", "checkbox");
      // x.setAttribute("class", "favorite-button");
      // x.setAttribute("value", "true")

      var button = $("<div>");
      button.css({
        width: "25px",
        height: "25px",
        display: "inline-block",
        float: "right",
        "background-color": "red"
      });
      if (cocktail.favorite) {
        button.addClass("unfavorite");
      }
      button.click(function() {
        if ($(this).hasClass("unfavorite")) {
          //remove fav
          var putData = {
            id: $(this)
              .parent()
              .data("id"),
            favorite: false
          };
          console.log(putData);
          //ajax PUT code here

          $.ajax({
            url: "/api/cocktails/favorite/",
            type: "PUT",
            data: putData,
            success: function(data) {
              button.removeClass("unfavorite");
              button.css("background-color", "red");
            }
          });
        } else {
          //add fav

          var putData = {
            id: $(this)
              .parent()
              .data("id"),
            favorite: true,
            method: "PUT"
          };
          console.log(putData);
          //ajax PUT code here
          $.ajax({
            url: "/api/cocktails/favorite/",
            type: "PUT",
            data: putData,
            success: function(data) {
              button.addClass("unfavorite");
              button.css("background-color", "yellow");
            }
          });
        }
      });

      $li.append(button);

      return $li;
    });
    $cocktailList.empty();
    $cocktailList.append($cocktails);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var cocktail = {
    name: $cocktailText.val(),
    ingredient1: $cocktailIngredient1.val(),
    ingredient2: $cocktailIngredient2.val(),
    ingredient3: $cocktailIngredient3.val(),
    ingredient4: $cocktailIngredient4.val(),
    ingredient5: $cocktailIngredient5.val(),
    ingredient6: $cocktailIngredient6.val(),
    description: $recipeSteps.val()
  };

  if (!(cocktail.name && cocktail.ingredient1)) {
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

var handlesearch = function() {
  console.log("search click");
  var name = $("#search-bar").val();
  console.log(name);
  API.searchtopic(name).then(function(data) {
    console.log("i am back: ", data);
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$cocktailList.on("click", ".delete", handleDeleteBtnClick);
refreshCocktails();

//<button class="favorite" data-id="databaseidofdrink" >
//<button class="unfavorite" data-id="databaseidofdrink" >

$(document).ready(function() {
  $("#show-add-recipe-form").hide();
});

$("#add-recipe").click(function() {
  $("#show-add-recipe-form").toggle();
});

$("#search").on("click", handlesearch);
