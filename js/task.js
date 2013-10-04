$(document).ready(function(){

	$("#myButton").click(validateInput);

	
	//why is this construction necessary to handle generated html-events?	
	$(document).on('click', '.btn-info', function(e) {

		if($(this).html() ==="Show info"){
			//Show info
			$("#itemInfo_" + this.value).slideDown();
			$(this).html("Hide info");
		}
		else{
			//Hide info
			$("#itemInfo_" + this.value).slideUp();
			$(this).html("Show info");
		}
		
   	});





	function validateInput(){
		query = document.getElementById("searchterm").value;

		if (query.length>0){
			if(query[0]==="#"){
				query = query.substr(1,query.length);
			}
			
			callInstagram(query);
		}
		else{
			alert("Write something, please.")
		}
	}




	// INSTAGRAM VARIABLES
	// CLIENT_ID: 461931778e174f72a27ec39acc0088e7
	// CLIENT_SECRET: 3049bf38daf647e29abfd15e4fa13ad2

	//JSONP (just add &callback=?)
	function callInstagram(searchterm){
		$("#ajaxloader").fadeIn();
		var myUrl = "https://api.instagram.com/v1/tags/" + searchterm + "/media/recent?client_id=461931778e174f72a27ec39acc0088e7&callback=?";
		$.getJSON(myUrl, loopThrough);
		
	}


	function loopThrough(data){

		$(".row").remove(); //clean up if re-search
		
		if(data.data.length>0){
			buildHTML(data);
		}
		else{
			console.log("no entries in JSON object");
			$("#ajaxloader").fadeOut();
			alert("Nobody has tagged an image with such a freaky hashtag.");
		}



		
	}

	function buildHTML(data){
		var maxcount = 0;
		var buildRow = ""; // needed for building the html
		if (data.data.length >= 20){
		    		maxcount = 20;
		    	}
		else if(data.data.length > 0 && data.data.length < 20){
		    		maxcount = data.data.length;
		}

    	for(var i=0; i<maxcount;i++){
    			/*BUILDING THE HTML STRING*/	
    			buildRow += "<div class='row'>"; //opening row
    			buildRow += "<div class='col-lg-6 col-md-6 col-sm-12 col-xs-12'>";
    			buildRow += "<img class='img-rounded myPictures' src='" + data.data[i].images.standard_resolution.url + "'></img>";
    			buildRow += "</div>";
    			buildRow += "<div class='col-lg-6 col-md-6 col-sm-12 col-xs-12'>";
    			buildRow += "<h3>" + data.data[i].user.full_name + " (" + data.data[i].user.username + ")" + "</h3><img class='img-rounded mySmallPictures' src='" + data.data[i].user.profile_picture + "'><br/>";
    			buildRow += "<button type='button' value='" + i + "' class='btn btn-info' style='margin: 5px;'>Show info</button>";
    			buildRow += "<div class='infoField' id='itemInfo_" + i + "' style='display: none;'><ul class='list-group'>";
    			buildRow += "<li class='list-group-item'>Likes: " + data.data[i].likes.count + "</li><li class='list-group-item'>Comments: " + data.data[i].comments.data.length + "</li><li class='list-group-item'>Photo filter: " + data.data[i].filter + "</li><li class='list-group-item'>Caption: " + data.data[i].caption.text + "</li></ul></div>";
    			buildRow += "</div>";
    			buildRow += "</div>"; //closing row

    			//send to html
    			$("#instagramPics").append(buildRow);
    			$("#ajaxloader").fadeOut();

    			buildRow = "";
		}
    	maxcount = 0;

	}




	// JSONP     this puppy works fine
	function callInstagram2(searchterm){

		$(".row").remove();
		//var genUrl = "https://api.instagram.com/v1/tags/" + searchterm + "?client_id=461931778e174f72a27ec39acc0088e7";
		//var url2 = "https://api.instagram.com/v1/media/popular?client_id=461931778e174f72a27ec39acc0088e7";
		var myUrl = "https://api.instagram.com/v1/tags/" + searchterm + "/media/recent?client_id=461931778e174f72a27ec39acc0088e7"
		var buildRow = ""; // needed for building the html
		var maxcount = 0;
		
			$.ajax({
		    url: myUrl,
		    type:'GET',
		    dataType:'JSONP',
		    success: function(data){
		    	if (data.data.length >= 20){
		    		maxcount = 20;
		    	}
		    	else{
		    		maxcount = data.data.length;
		    	}
		    	for(var i=0; i<maxcount;i++){
		    			/*BUILDING THE HTML STRING*/	
		    			buildRow += "<div class='row'>"; //opening row
		    			buildRow += "<div class='col-lg-6 col-md-6 col-sm-12 col-xs-12'>";
		    			buildRow += "<img class='img-rounded myPictures' src='" + data.data[i].images.standard_resolution.url + "'></img>";
		    			buildRow += "</div>";
		    			buildRow += "<div class='col-lg-6 col-md-6 col-sm-12 col-xs-12'>";
		    			buildRow += "<h3>" + data.data[i].user.full_name + " (" + data.data[i].user.username + ")" + "</h3><img class='img-rounded mySmallPictures' src='" + data.data[i].user.profile_picture + "'><br/>";
		    			buildRow += "<ul><li>Likes: " + data.data[i].likes.count + "</li><li>Applied filter: " + data.data[i].filter + "</li><li>Caption: " + data.data[i].caption.text + "</li></ul>";
		    			buildRow += "</div>";
		    			buildRow += "</div>"; //closing row
		
		    			//send to html
		    			$("#instagramPics").append(buildRow);
		    			buildRow = "";
    			
		    	}
		    	maxcount = 0;
		    }
		});

		
		
	}




	//JQUERY SHIT


	$("#myForm").submit(function(event){
		event.preventDefault();
	})
	
	//delete specific elements
	$("h1").click(function(){
		$("body").hide();
	});

	//get search term from user
	$("#searchterm").attr("action");



});