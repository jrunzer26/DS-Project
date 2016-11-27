var message = function(message, type) {
	var successAlert = document.createElement('div');
	if (type == "danger")
		successAlert.setAttribute('class', 'alert alert-danger');
	else
		successAlert.setAttribute('class', 'alert alert-success');
	var x = document.createElement('a');
	x.setAttribute('href', "#");
	x.setAttribute('class', 'close');
	x.setAttribute('data-dismiss', 'alert-danger');
	successAlert.append(x);
	x.innerHTML = '&times';
	x.addEventListener("click", function () {
		$(".alert").remove();
	});
	var strong = document.createElement('strong');
	strong.innerHTML = message;
	successAlert.append(strong);
	$('body').append(successAlert);
}

$(document).ready(function() {
	$('#SearchSubmit').click(function() {
		var searchValue = $('#SearchValue').val();
		$.ajax({
			type: 'POST',
			url: '/food',
			data: JSON.stringify({search: searchValue}),
			dataType: 'JSON',
			contentType: "application/json; charset=utf-8",
			success: function(res) {
				var aRecipe = res.hits[0].recipe;
				for (var i = 0; i < res.hits.length; i++) {
					var content = '' +
					'<div class="row row-centered">' +
						'<div class="mealItem col-centered">' +
							'<div class="mealBorder">' +
								'<div class="mealLabel">' +
									'<a href="' + res.hits[i].recipe.url + '" target="_blank">' +
										'<h3>' + res.hits[i].recipe.label + '</h3>' +
									'</a>' +
								'</div>' +
								'<div class="mealContents">' + 
									'<div class="someImage">' +
										'<a target="_blank" class="foodImage" href="' + res.hits[i].recipe.url + '">' +
											'<img src="' + res.hits[i].recipe.image + '" target="_blank">' +
										'</a>' +
									'</div>' +
									'<div class="someLabel">' +
										'<label class="description">' +
											'<ul id="ul' + i + '">';
											for (var j = 0; j < res.hits[i].recipe.ingredients.length; j++) {
												content += '<li>' + res.hits[i].recipe.ingredients[j].text + '</li>';
											}
								content += '</ul>' +
											'<br>' +
											'<input type="checkbox" value="add" id="' + 'checkbox' + i +'"">' +
											'<label> Add All Ingredients </label>'
										'</label>' +
									'</div>' +
								'</div>' + 
							'</div>' +
						'</div>' +
					'</div>';
					$('#meals .container-fluid').append(content);
				}
			},
			error: function(res) {
				console.log(res);
				message(res.responseJSON.err, "danger");
			}
		});
	});

	$('#add').click(function() {
		var email = $('#email').val();
		var passwordValue = $('#password').val();
		var listNameValue = $('#ListName').val();
		console.log(email);
		var list = $('#meals .row').children();
		var mealsToAdd = [];
		for (var i = 0; i < list.length; i++) {
			if($('#checkbox' + i).is(':checked')) {
				mealsToAdd.push(i);
			}
		}
		var ingredients = [];
		for(var i = 0; i < mealsToAdd.length; i++) {
			var list = $('#ul' + mealsToAdd[i]).children();
			for(var j = 0; j < list.length; j++) {
				ingredients.push({name: list.eq(j).text()});
			}			
		}
		
		//send ajax post with ingredients and shopping list name
		/* POST todoist. - makes a list with the items
		  {
		    "username": "username@email.com",
		    "password": "password",
		    "listname": "Shopping List",
		    "items": [{
		      "name": "carrots"
		    }, {
		      "name": "peas"
		    }]
		  } 
		*/
		var listData = {
						username: email,
						password: passwordValue,
						listname: listNameValue,
						items: ingredients
						};

		$.ajax({
			type: 'POST',
			url: '/todoist',
			data: JSON.stringify(listData),
			dataType: 'JSON',
			contentType: "application/json; charset=utf-8",
			success: function(res) {
				message("List Saved!", "success");			
			},
			error: function(res) {
				message(res.responseJSON.err, "danger");
			}
		});
	});
});


