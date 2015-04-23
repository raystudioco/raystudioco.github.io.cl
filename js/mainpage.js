//Script for mainpage function
 
//Script to Activate the NerveSlider
//implement as function so that it could called later.
var initSlider = function(){
	$(".slider1").nerveSlider({
		slideTransitionSpeed: 1000,
		slideTransitionEasing: "easeOutExpo",
		sliderWidth: "100%",
		sliderHeightAdaptable: true,
		sliderResizable: true,
		showDots: false
	});
}

var hasCalled=false;
var beforeSlideTransition = function(){
	if(!hasCalled){
		slideLoaded();
		hasCalled = true;
	}
}


var slideLoaded = function(){
	$('#sliderCover').delay(200).animate({opacity:0},500,
		function(){ 
			
			//$('#sliderCover').removeClass("loadingcover");
			//$('.slider1').show(200, function(){ $('#slideSection').height('auto'); });
			$(this).removeClass("loadingcover");
			$('#slideSection').height('auto');
		}
	);					
}


//Script to retrieve Flickr image.
var _flickrId = '69414961@N00';
var _flickrSliderImgTag = 'websiteslider';

var initSliderTab = function(flickrId, flickrSliderImgTag){
	//$('.slider1').hide();
	$('.slider1').html('');
	var ssW = $('#slideSection').width();
	$('#slideSection').height(ssW/965*220+7);
	
	$('#sliderCover').addClass("loadingcover");
	
	//get websiteslider
	var flickr = new Tools.Flickr();
	flickr.setOptions({imageSize: 'original'});
	flickr.setSearchUserId(flickrId).addTags(flickrSliderImgTag).applySearch(
		function(data) {
			
			$('.slider1').html('');
			//removeVerticalPhoto(data);
			for(var k=0;k<8;k++){
				$('.slider1').append(
					$('<img/>', {src: data[k].image, alt:data[k].title }).attr("id","slideImg"+k)
				);
			}

			$('#slideImg0').one("load", function() {
				slideLoaded();
			}).each(function() {
				if(this.complete){$(this).load();};
			});

			initSlider();
			

		}
	);

}


var initRecentWorks = function(flickrId){

	//$('.loading').waitLoadingEvent("recentphoto",true);								
	var flickr2 = new Tools.Flickr();
	flickr2.setSearchUserId(flickrId).applySearch(
		function(data) {

			for(var k=0;k<6;k++){
				$('#portfoliorowItem'+k).html('');
				$('#portfoliorowItem'+k).append(
					$('<div/>').append(
						$('<a/>', {href: data[k].image, rel:'prettyphotolightbox'+'[0]', title:data[k].title}).append(
							$('<img/>', {src: data[k].image, alt:data[k].title }).addClass('img-responsive img-portfolio img-hover')
						).addClass('image full')
					).addClass('img-container')
				);
			}

			//$("a[rel^='prettyphotolightbox']", '#portfoliorow').prettyPhoto({deeplinking:false}); 

			//$('.loading').trigger("recentphoto");

		}
	);


}



$(document).ready(function() {

	initSliderTab(_flickrId,_flickrSliderImgTag);

	//swap portfolio
	
	initRecentWorks(_flickrId);
	

});

