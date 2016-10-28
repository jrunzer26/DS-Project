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
});


