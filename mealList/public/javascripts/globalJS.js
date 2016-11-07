$(document).ready(function() {
	$('#hello').click(function() {
		$.ajax({
			type: 'GET',
			url: '/ajaxTest',
			dataType: 'JSON'
		}).done(function(res) {
			$('#hello').text(res.ajax);
		});
	});

	$('#SearchSubmit').click(function() {
		alert('search clicked');
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
						'<div class="mealItem col-md-6">' +
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
											'<label> Add All ingredients </label>'
										'</label>' +
									'</div>' +
								'</div>' + 
							'</div>' +
						'</div>';
					$('#meals .row').append(content);
				}
			},
			error: function(res) {
				console.log(res);
				$('#hello').text("error");
			}
		});
	});

	$('#add').click(function() {
		var email = $('#email').val();
		var passwordValue = $('#password').val();
		var listNameValue = $('#ListName').val();
		alert(email + " " + password + " " + listNameValue);
		var list = $('#meals .row').children();
		alert(list.length);
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
		
		for (var i = 0; i < ingredients.length; i++) {
			alert(ingredients[i].name);
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
						passwrd: passwordValue,
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
				alert('success');
				
			},
			error: function(res) {
				console.log(res);
				alert("error posting list");
			}
		});
	});

});


