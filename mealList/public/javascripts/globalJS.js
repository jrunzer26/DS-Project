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
					$('#meals').append(
						'<div class="mealItem">' +
							'<div class="mealLabel">' +
								'<h3>' + res.hits[i].recipe.label + '</h3>' +
							'</div>' +
							'<div class="foodImage">' + 
								'<img src="' + res.hits[i].recipe.image + '">' +
							'</div>' + 
						'</div>');
				}
			},
			error: function(res) {
				console.log(res);
				$('#hello').text("error");
			}
		});
	});
});


