"use strict";

$().ready(function(){
	var topics = ["miniature schnauzer", "boxer (dog)", "english bulldog", "petit basset griffon vendeen"];
	var buttonArea = $("#buttonArea");  //so that I don't have to reference the DOM over and over
	var imageArea = $("#imageArea"); //ditto

	function createButton(value)
	{
		var button = $("<button>")
		.attr({"id": value, "data-dog": value, "class": "btn btn-success imageButton"})
		.css({"margin": "5px"})
		.text(value);
		buttonArea.append(button);
		$("#dataEntry").val("");
	}

	function initButtonArea()
	{
		for(var i = 0; i < topics.length; i++)
			createButton(topics[i]);

		$(".imageButton").on("click", getImages);
	}

	function getImages()
	{
		var imageArea = $('#imageArea');
		imageArea.empty();
		var whichImages = $(this).data("dog");

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + whichImages + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: 'GET'
		})
		.done(function(response) {
			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var gifDiv = $('<div class="imageBlock">')

				var rating = results[i].rating;

				if (rating == "r") continue;

				var p = $('<p>').text("Rating: " + rating).attr("class", "text-center lead");

				var dogImage = $('<img>');
				dogImage.attr('src', results[i].images.fixed_height_small_still.url)
				.attr("data-still", results[i].images.fixed_height_small_still.url)
				.attr("data-animate", results[i].images.fixed_height_small.url)
				.attr("data-state", "still")
				.attr("class", "gif");

				gifDiv.append(dogImage)
				gifDiv.append(p)

				imageArea.append(gifDiv);
			}
		$(".gif").on("click", toggleAnimation);			
		});

	}

	function addButton()
	{
		var input = $("#dataEntry");
		var value = input.val().toLowerCase();
		if(value == "")
		{
			input.val("Please enter a dog breed.");
			return;
		}
		if(topics.indexOf(value) > -1)
		{
			input.val("That button is already in the list.");
			return;			
		}
		topics.push(value);
		createButton(value);
		$(".imageButton").on("click", getImages);
	}

	function toggleAnimation()
	{
             var state = $(this).attr("data-state");
             if(state == "still")
            {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state","animate");
            }
            else
            {
                 $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state","still");
               
            }
	}

	function setUpHandlers()
	{
		$("#submitBtn").on("click", addButton);
		$("#dataEntry").on("focus", function(){
			$(this).val("");
		});
	}


	setUpHandlers();
	initButtonArea();
	
}); //end ready