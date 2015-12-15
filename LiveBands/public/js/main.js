var noteTemplate = function (data) {
	template = '<div class="band">';
	template += new Date(data.created_at);
	template += '<h3>'+ data.name +'</h3>';
	template += '<div>'+ data.genre +'</div>';
	template += '<div>'+ data.size +'</div>';
	template += '</div>';

	return template;
};

// A function to accept an object and POST it to the server as JSON
function saveRecord (theData) {
	console.log("Trying to Post");
	$.ajax({
		url: "/save",
		contentType: "application/json",
		type: "POST",
		data: JSON.stringify(theData),
		error: function (resp) {
			console.log(resp);
			// Add an error message before the new note form.
			$("#new-note").prepend("<p><strong>Something broke.</strong></p>");
		},
		success: function (resp) {
			console.log(resp);
			// Render the note
			var htmlString = noteTemplate(theData);
			$("#bands").append(htmlString);

			// Empty the form.
			$("#band-name").val("");
			$("#band-genre").val("");
			$("#band-size").val("");
			// Deselect the submit button.
			$("#note-submit").blur();
		}
	});
}

// Loads all records from the Cloudant database. 
// Loops through them and appends each note onto the page.
function loadNotes() {
	$.ajax({
		url: "/api/bands",
		type: "GET",
		data: JSON,
		error: function(resp){
			console.log(resp);
		},
		success: function (resp) {
			console.log(resp);
			//$("#bands").empty();

			if (resp.noData){
				return;
			}

			// Use Underscore's sort method to sort our records by date.
			var sorted = _.sortBy(resp, function (row) { return row.doc.created_at;});

			// Now that the notes are sorted, add them to the page
			sorted.forEach(function (row) {
				var htmlString = noteTemplate(row.doc);
				$('#bands').append(htmlString);
			});
		}
	});
}

$(document).ready(function(){
	console.log("Loaded!");
	loadNotes();

	$("#new-band").submit(function () {
		// Get the information we want from the form including creating a new date.
		var bandData = {
			kind: "band",
			name: $("#band-name").val(),
			genre: $("#band-genre").val(),
			size: $("#band-size").val(),
			created_at: new Date(),
		};

		//Send the data to our saveRecord function
		saveRecord(bandData);

		//Return false to prevent the form from submitting itself
		return false;
	});
});
