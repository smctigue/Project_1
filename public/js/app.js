$(function() {
// getQuotes();

	$('#signup-btn').on("click", function(e){
		location.href = "/signup";
	});

});

// function getQuotes() {
//   $.get("/users", function(res) {
//     renderQuote(res);
//   });
// }

// function renderQuote(quotes) {
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
//     url: '/users/' + quoteId,
//     type: 'DELETE',
//     success: function(res) {
//       getQuotes();
//     }
//   });
// }

// function sendQuote(context)
// {
//     // We take the id of the button which is equivalent to the mongoDB _id of the book it is related to.
//     var id = context.id;
//     // We take the comment and username/person from the form that the button resides in.
//     var data = $("#" + id + "form").serialize();
//     // We append that id to the comment and username alongside an "&_id=" so that when it is received in the POST route ,the id gets added as an attribute just like the comment and the username/person.
//     data += "&_id=" + id;
//     //console.log(data);
//     // We append a "#" to make the id variable easier to use with jQuery as an element selector.
//     id = "#" + context.id;
//     // We send that data in a POST request to the backend.
//     $.post("/books", data)
//     .done(
//         function(response)
//         {
//             // We reset the comment and username fields after you submit the POST.  Note: This is actually unnecessary since we get rid of everything on the page and then re-render everything with a call to renderBooks(). This does create a problem if someone has multiple comments in multiple book comment fields but hasn't posted them since those comments will be lost when the page is re-rendered.  That's a very odd edge case though ┐('～`；)┌ .
//             $(id + "form")[0].reset(); 
//             // We re-render the book info after the POST request is done.
//             renderBooks();
//         }
//     );
//     return false;
// }