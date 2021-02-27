$( function() {
            // Select a random box.
             var rnd = Math.floor( Math.random() * 5 ) ;
             // Mark the selected box as gold
             $(".box:eq(" + rnd + ")").addClass("gold") ; 
             
             // When you click on any box.
             $(".box").click( function() {
                 
                    // Open all boxes.
                    $(".box").css("background-color", "white") ;
                    
                    // Box with gold shows an animation
                    $(".gold").html( "<img src='gold.png'>")
                              .children()
                              .css({position: 'relative', top:-150, opacity : 0})
                              .animate({top:5, opacity : 1}, 300);
                      
                    // check the clicked box if it is the cell with gold
                    if ( $(this).hasClass('gold')) {
                        $("#result").html("You Won").css("color", "green") ;
                    } else {
                        $("#result").html("You Lost").css("color", "red") ;
                    }
                    $("#result").after("<p>Press F5 to restart</p>");
                    // remove click events from boxes.
                    $(".box").off("click") ;
           }) ; // .box click
        });