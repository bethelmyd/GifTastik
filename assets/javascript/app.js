"use strict";

$().ready(function(){
	var topics = ["miniature schnauzer", "boxer", "english bulldog", "petit basset griffon vendeen"];
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
		var whichImages = $(this).data("dog");
		alert(whichImages);
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