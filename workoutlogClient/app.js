$(document).ready(function(){
	$("#testAPI").on("click", function(){
		var test = $.ajax({
			type: "GET",
			url: "http://localhost:3000/api/test"
		})

		test.done(function(data){
			console.log(data);
		})

		test.fail(function(){
			console.log("Oh no!");
		});
	});

	// $(testUser).click(function(){
	// 	let user = {
	// 		user: {
	// 			username: 'jay',
	// 			password: 'pass'
	// 		}
	// 	}
	// 	$.ajax({
	// 		type: "POST",
	// 		url: "http://localhost:3000/api/user",
	// 		data: JSON.stringify(user)
	// 	}).done(function(data){
	// 		console.log(data)
	// 	})
	// })
});