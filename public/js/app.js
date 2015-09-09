$(function() {


$('#signup-btn').on("click", function(e){
	location.href = "/signup";
});

// grab email and password within this jquery listener and send it to signup
	$("#modalSignIn").on("click", function(e){
    
    // prevent form submission
    e.preventDefault();
    console.log("You clicked SignIn");

    $.post("/signup", $(this).serialize())
      .done(function(res) {
        $("#signup-form")[0].reset();
        res.redirect('/profile');
      });
    // post to food#create
    // $.post("/foods", $(this).serialize())
    //   .done(function(res){
        // append new food to the page
      //   $("#new-food-form")[0].reset();
      //   renderFood(res);
      // });
  });

// renderQuotes();
});

// function pageLoad() {
//   getQuotes();
//   $("#new-quote-form").on("submit", function(e) {
//     e.preventDefault();
//     $.post("/quotes", $(this).serialize())
//       .done(function(res) {
//         getQuotes();
//         $("#new-quote-form")[0].reset();
//       });
//   });
// }

// function getQuotes() {
//   $.get("/quotes", function(res) {
//     renderQuote(res);
//   });
// }

// function renderQuotes(quotes) {
//   template = _.template($("#quotes-template").html());
//   quoteItems = quotes.map(function(quote) {
//     return template(quote);
//   });
//   $("#quote-ul").html("");
//   $("#quote-ul").append(quoteItems);
// }

// function deleteQuote(context) {
//   var quoteId = $(context).data()._id;
//   $.ajax({
//     url: '/quotes/' + quoteId,
//     type: 'DELETE',
//     success: function(res) {
//       getQuotes();
//     }
//   });
// }