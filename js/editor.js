$(document).ready(function() {
	document.execCommand('defaultParagraphSeparator', false, 'p');

	$('#editorPanel').on('dblclick', function(e){
		var selectedText=window.getSelection();
		if(selectedText!=''){
			var x=event.pageX-64;
			var y=event.pageY+10;
			if(x<0){
				x=0;
			}
			marker();
			$('#toolbar').css({top: y+'px', left: x+'px'}).fadeIn().delay(2000).fadeOut();
		}
	});
	$('#toolbar').mouseover(function(){
		$('#toolbar').clearQueue();
		$('#toolbar').stop();
	});
	$('#toolbar').mouseleave(function(){
		$('#toolbar').fadeOut();
	});
	$('.tool').mouseover(function(){
		$(this).css({background: 'rgb(55,150,198)', color:'white'});
	});
	$('.tool').mouseleave(function(){
		marker();
	});
	
});

$( document ).ajaxStart(function() {
  $( "#loader" ).show();
});

$( document ).ajaxStop(function() {
  $( "#loader" ).hide();
});

function done(){
	$('#linkHolder').html('<h4>Embeded Links:</h4>');
	var text=$('#editorPanel').text();
	var arr=text.split('<a>');
	var color='red';
	var found=false;
	$.each(arr, function( i, val ) {
		if(val.indexOf('</a>') > -1){
			found=true;
			$('#linkHolder').append('<a href="#" style="color:'+color+'">'+val.split('</a>')[0]+'</a><br>').show();
			if(color=='red'){
				color='blue';
			}else{
				color='red';
			}
		}
	});
	if(found==false){
		$('#linkHolder').append('No Link Found<br>').show();
	}
}

function replace(){
	var found=false;
	var i=0;
	$('#log').html('<h4>Replacement Log:</h4>');
	str=$('#editorPanel').html().replace(/<p>/g, ' <p>');	
	$('#editorPanel').html(str);	
	var regExp=/\b\w{4}\b/g;
	var words=$('#editorPanel').text().match(regExp);
	$.each(words,function(i,val){
		i++;
		if(val!='nbsp'){
			found=true;
			$.ajax({
				type: "GET",
				url: "http://randomword.setgetgo.com/get.php",
				success: function(value){
					var str=$('#editorPanel').html();
					str=str.replace(val, value);
					
					$('#editorPanel').html(str);
					$('#log').append("Replaced '"+val+"' with '"+value+"'<br>").show();
				}
			});
		}
	});
	if(found==false){
		$('#log').append('No Words Found<br>').show();
	}
}


function Bold(){
	document.execCommand('bold',false,null);
	marker();
}

function Underline(){
	document.execCommand('underline',false,null);
	marker();
}

function Italic(){
	document.execCommand('italic',false,null);
	marker();
}

function toRed(){
	document.execCommand('styleWithCSS', false, true);
	if(document.queryCommandValue("ForeColor")=='rgb(255, 0, 0)'){
		document.execCommand('foreColor', false, 'black');
	}else{
	    document.execCommand('foreColor', false, 'red');
	}
	marker();
}

function marker(){	
	if(document.queryCommandState("Bold")){
		$('#tool1').css({background:'rgb(55,150,198)',color:'white'});
	}else{
		$('#tool1').css({background:'white',color:'rgb(55,150,198)'});
	}
	if(document.queryCommandState("Underline")){
		$('#tool2').css({background:'rgb(55,150,198)',color:'white'});
	}else{
		$('#tool2').css({background:'white',color:'rgb(55,150,198)'});
	}
	if(document.queryCommandValue("ForeColor")=='rgb(255, 0, 0)'){
		$('#tool3').css({background:'rgb(55,150,198)',color:'white'});
	}else{
		$('#tool3').css({background:'white',color:'rgb(55,150,198)'});
	}
}