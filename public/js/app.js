$(function() {


$('#signup-btn').on("click", function(e){
	location.href = "/signup";
});
// document.getElementById("signup-btn").onclick = function () {
//         location.href = "/signup";
//     };

// grab email and password within this jquery listener and send it to signup
$("#modalSignIn").on("click", function(e){
    // prevent form submission
    e.preventDefault();
    console.log("You clicked SignIn");
    // post to food#create
    // $.post("/foods", $(this).serialize())
    //   .done(function(res){
        // append new food to the page
      //   $("#new-food-form")[0].reset();
      //   renderFood(res);
      // });
  });



});