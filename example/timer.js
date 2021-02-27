      
$(function() {
    
   // PART #1 - Counter (start and stop)
   var timer = setInterval( incCounter, 1000) ;
   function incCounter() {
	   var val = $("#counter").text() ;
	   val++;
	   $("#counter").text(val);
   }
   
   $("#icon").click(function(){
		if ( timer != null) {
			clearInterval(timer);
			timer = null;
			$(this).attr("src", "img/play.png") ;
		} else {
			timer = setInterval( incCounter, 1000) ;
			$(this).attr("src", "img/pause.png") ;
		}
   }); 
   
   // PART #2 - Photo slider 
   var album = [] ;
   $(".album_photo").each(function(i){
      var car = {} ;
      car.img = $(this).find("img").attr("src"); 
      car.speed = $(".car_speed", this).text() ;
      car.price = $(".car_price", this).text() ;
      album.push(car);
   });
   
   var current = 0 ; 
   
   // Init photo album
   var el = "<img src='" + album[current].img + "' id='photo'>" ;
   el += "<div id='info'>";
   el += "<p><b>Image :</b> <span>" + album[current].img + "</span></p>" ;
   el += "<p><b>Top Speed :</b> <span>" + album[current].speed + "</span> km/h</p>" ;
   el += "<p><b>Price :</b> <span>" + album[current].price + "</span> $ </p>";
   el += "</div>" ;
   $("#album").html(el) ;
   
   setInterval(function() {
	   current++;
	   if ( current === album.length) current = 0 ;
//          $("#photo").attr("src", "" + album[current].img) ; // instantly shows the new car
	    // photo slide
            $("#photo").animate( {opacity:0.1},400, function(){ 
                                   $(this).attr("src", "" + album[current].img);
                              })
		      .animate({opacity:1.0},400) ;
	   
           // info slide
	   $("#info").animate({left: 200, opacity:0}, 400, function(){
			$("#album span:eq(0)").text(album[current].img);
			$("#album span:eq(1)").text(album[current].speed);
			$("#album span:eq(2)").text(album[current].price);
                      })
                     .animate({left: 0, opacity:1.0}, 400) ;   
	   
   }, 3000) ;
   
   // PART #3 - Harmonic Motion
   $("#start").click(function() {
	   // Animation
		var angle = 0 ;
		setInterval(function(){
			 angle += 2 ;
			 var halfWidth = ( $("#arena").width() - $("#ball").width()) / 2  ;
			 var toRadian = angle * Math.PI/180 ;
			 var posX = halfWidth * Math.sin( toRadian )  ;
                        // var posY = 50 * Math.cos(toRadian*3) ;
			 $("#ball").css({left : posX + "px"} ) ;
		 }, 16) ; // 60 fps (frame per second )
		 $(this).animate({opacity:0}, 300);  // make button invisible
		 $(this).off("click");  // do not let user click again.
   }) ;
   
});