$(document).ready(function() {
   $("#secondFrame").hide();
   $("#thirdframe").hide();
   $("#continuebutton").hide();
   $("#startbutton").click(function(){$("#start").hide(0); $("#secondFrame").show(0);});
   $(".citydiv").click(function(){$("#continuebutton").show();})
   $("#continuebutton").click(function(){$("#thirdframe").show(); $("#secondFrame").hide();})
   $("#congrats").hide();
   $("#solveMessage").hide();
    $("#tryAgain").hide();
    $("#shufflebutton").hide();
    $("#solutionMessage").hide();
    
    
    $("#shuffle").click(function(){
        var shuffleAmount=$('#shuffle option:selected').val();
        if(shuffleAmount==3||shuffleAmount==30)
        $("#shufflebutton").show();
    });
    
    var totalSlide= $(".slide ul li").length;
    var slideWidth=500;
    var orderValue=0;
    var totalWidth=slideWidth*totalSlide;
    $(".slide ul").css("width",totalWidth +"px");
    function slideShow(){
        var newWidth;
        if(orderValue<totalSlide-1)
        {
            orderValue++;
            newWidth= slideWidth*orderValue;
            $(".slide ul").animate({marginLeft:"-" +newWidth+ "px"},800);
        }
        else {
            orderValue=0;
            $(".slide ul").animate({marginLeft: "0"},0);
        }
        
        
    }
    setInterval(slideShow,1500);    
    
    var piece_width=200;//width of one piece
    var piece_height=200;//height of one piece
    var pieceSize=200;
    var imgname;
    $("#secondFrame #london").click(function(){imgname="url(img/london.jpg)";});
    $("#chicago").click(function(){imgname="url(img/chicago.jpg)";});
    $("#paris").click(function(){imgname="url(img/paris.jpg)";});

    var idCount=0;//ids of the pieces
    var positionx=[];//store initial positins of the pieces
    var positiony=[];//store initial positins of the pieces
    for(var i=0; i<3; i++){
        for(var j=0; j<3; j++){
            var top=piece_height*i;
            var left=piece_width*j;

            $("<div class='pieces'></div>").attr("id", idCount++).css({
                width: piece_width,
                height: piece_height,
                position: "absolute",
                top: top,
                left: left,
                backgroundPosition: ["-", piece_width * j, "px ", "-", piece_height * i, "px"].join(""),
                borderRadius: "10px",
                border: "1px solid white"                            
            }).appendTo($("#thirdframe #puzzlediv"));

            //store initial position of each piece 
            positionx.push(left);   
            positiony.push(top); 
        }

    }
    $("#chicago").click(function(){
        $(".pieces").css({"background-image": "url(img/chicago.jpg)"});
        $("#thirdframe #puzzlediv").find("#0").css({
            backgroundImage: "",
            backgroundColor: "white"                    
        });
        $("#chicago img").css('box-shadow','10px 10px 5px grey');
        $("#paris img").css('box-shadow','0px 0px');
        $("#london img").css('box-shadow','0 0');
    });      
    $("#paris").click(function(){
       $(".pieces").css({"background-image": "url(img/paris.jpg)"});
       $("#cityimg").attr("src","img/paris.jpg")
       $("#paris img").css('box-shadow','10px 10px 5px grey');
       $("#chicago img").css('box-shadow','0px 0px');
       $("#london img").css('box-shadow','0 0');
       //remove first piece
        $("#thirdframe #puzzlediv").find("#0").css({
            backgroundImage: "",
            backgroundColor: "white"
        });
   }); 
    $("#london").click(function(){
       $(".pieces").css({"background-image": "url(img/london.jpg)"});
       $("#london img").css('box-shadow','10px 10px 5px grey');
       $("#chicago img").css('box-shadow','0px 0px');
        $("#paris img").css('box-shadow','0 0');
       //remove first piece
        $("#thirdframe #puzzlediv").find("#0").css({
            backgroundImage: "",
            backgroundColor: "white"
        });
    });
    //remove original picture
     $("#thirdframe #puzzlediv  img").remove();

    //remove first piece in positions array
    positionx.shift();
    positiony.shift();
    
    $('#thirdframe #puzzlediv').children('div').click(function() {
         movePiece(this);
    });
    
    $("#shufflebutton").click(function(){
        shuffle(id);
        $("#shufflebutton").hide();
        $("#shuffle").hide();
        $("#solveMessage").fadeIn(2000).show();
        $("#solutionMessage").fadeIn(2000).show();
    });
                 
                 
    function movePiece(clickedPiece){

        var movable = false;         
        var whiteLeft = $("#thirdframe #puzzlediv").find("#0").css('left');
        var whiteTop =$("#thirdframe #puzzlediv").find("#0").css('top');
        var pieceLeft = $(clickedPiece).css('left');
        var pieceTop = $(clickedPiece).css('top');
        
        if (whiteLeft == pieceLeft &&  pieceTop == (parseInt(whiteTop) - pieceSize) + 'px')
            movable = true;
       
        if (whiteLeft == pieceLeft &&  pieceTop == (parseInt(whiteTop) + pieceSize) + 'px')
            movable = true;
       
        if ((parseInt(whiteLeft) - pieceSize) + 'px' ==pieceLeft &&  pieceTop == whiteTop)
            movable = true;
       
        if ((parseInt(whiteLeft) + pieceSize) + 'px' == pieceLeft &&  pieceTop == whiteTop)
            movable = true;
        if (movable) {
           // $(clickedPiece).animate(2000).css({ left: whiteLeft, top: whiteTop });
            $(clickedPiece).animate({ left: whiteLeft, top: whiteTop }, 800);
            $("#thirdframe #puzzlediv").find("#0").css('left', pieceLeft);
            $("#thirdframe #puzzlediv").find("#0").css('top',  pieceTop);
            $(clickedPiece).css({ left: whiteLeft, top: whiteTop });
            var check=0;
            for(var i=0;i<8;i++)
            {
                if(parseInt($("#"+(i+1)).css('top'))==positiony[i] && parseInt($("#"+(i+1)).css('left'))==positionx[i])
                {
                    check++;
                }
            }
        if(check==8)
        {
            $("#congrats").delay(800).show().css({position: 'relative', top:-150, opacity : 0})
                              .animate({top:255, opacity : 1}, 2000);
            $("#thirdframe").delay(800).animate({'opacity':'0.3'});}
        }
        opacity();
    }
        
        
        
    function opacity()
    { 
        var whiteLeft = $("#thirdframe #puzzlediv").find("#0").css('left');
        var whiteTop =$("#thirdframe #puzzlediv").find("#0").css('top');
        for(var i=1 ;i<=8;i++)
        {
        var movable = false;
        var pieceLeft = $("#"+i).css('left');
        var pieceTop = $("#"+i).css('top');

        if (whiteLeft == pieceLeft &&  pieceTop == (parseInt(whiteTop) - pieceSize) + 'px')
            movable = true;

        if (whiteLeft == pieceLeft &&  pieceTop == (parseInt(whiteTop) + pieceSize) + 'px')
            movable = true;

        if ((parseInt(whiteLeft) - pieceSize) + 'px' ==pieceLeft &&  pieceTop == whiteTop)
            movable = true;

        if ((parseInt(whiteLeft) +pieceSize) + 'px' == pieceLeft &&  pieceTop == whiteTop)
            movable = true;

        if(!movable){
            $("#"+i).css('opacity','0.5');
        }
        else if(movable)
        { 
            $("#"+i).css('opacity','1');}
        }                    
    }
    $("#puzzlediv").mouseenter(function(){
        opacity();
    });
    $("#puzzlediv").mouseleave(function(){
        for(var i=1;i<=8;i++)
        {
            $("#"+i).css('opacity','1');
        }
    });
                
                
    function check(){
        var movarr=[];
        var random;
        for(var i=1;i<=8;i++){
            var movable = false;
         
            var whiteLeft = parseInt($("#thirdframe #puzzlediv").find("#0").css('left'));
            var whiteTop =parseInt($("#thirdframe #puzzlediv").find("#0").css('top'));
            var pieceLeft = parseInt($("#"+i).css('left'));
            var pieceTop = parseInt($("#"+i).css('top'));
        
        
            if (whiteLeft == pieceLeft &&  pieceTop == (whiteTop - pieceSize) )
                movable = true;

            if (whiteLeft == pieceLeft &&  pieceTop == (whiteTop + pieceSize))
                movable = true;

            if ((whiteLeft - pieceSize)  ==pieceLeft &&  pieceTop == whiteTop)
                movable = true;

            if ((whiteLeft + pieceSize) == pieceLeft &&  pieceTop == whiteTop)
                movable = true;
            if(movable){
                movarr.push(i);
            }
        
        
        
        }
        var lenght=movarr.length-1;
        random=Math.floor(Math.random() * (lenght + 1));
       
        return movarr[random];
    }
            
    var checkAmount=0;
    var id=check();
    function shuffle(id)
    {
        var shuffleAmount=$('#shuffle option:selected').val();
        
        
        if(checkAmount<shuffleAmount){
            checkAmount++;
            
            var prevId=id;
            var newId;
            var whiteLeft = $("#thirdframe #puzzlediv").find("#0").css('left');
            var whiteTop =$("#thirdframe #puzzlediv").find("#0").css('top');
            var pieceLeft = $("#"+id).css('left');
            var pieceTop = $("#"+id).css('top');
            $("#"+id).animate({ left: whiteLeft, top: whiteTop },500,function(){
                $("#"+id).css({ left: whiteLeft, top: whiteTop });
                $("#thirdframe #puzzlediv").find("#0").css('left', pieceLeft);
                $("#thirdframe #puzzlediv").find("#0").css('top',  pieceTop);
                do{
                    newId=check();
                    console.log(newId);
                } while(newId===prevId);
                
                shuffle(newId);
            });    
            
        }
        
    }
    
    $("body").keydown(function(e){
         if(e.which==27)
         {
            solution();
         }
     });
     
     function solution()
     {
          var id=check();
            
          for(var i=1;i<=8;i++){
                $("#"+i).animate({ left: positionx[i-1]+"px", top: positiony[i-1]+"px" }, 800);
        }
        $("#tryAgain").show().delay(1000).css({position: 'relative', top:-150, opacity : 0})
                              .animate({top:255, opacity : 1}, 2000);
        $("#thirdframe").delay(1000).animate({opacity:0.3});
        
     }
    
                
               
                
                
                
                
});