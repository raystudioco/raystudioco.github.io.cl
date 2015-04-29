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

		
	$('.portfoliorow').addClass('preloader');//.find("img").css({opacity:0});							
	var flickr2 = new Tools.Flickr();
	flickr2.setSearchUserId(flickrId).applySearch(
		function(data) {

			for(var k=0;k<6;k++){
				$('#portfoliorowItem'+k).html('');
				$('#portfoliorowItem'+k).append(
					$('<div/>').append(
						$('<a/>', {href: data[k].image, title:data[k].title}).append(
							$('<img/>', {src: data[k].image, alt:data[k].title }).addClass('img-responsive img-portfolio img-hover')//.css({opacity:0})
						).addClass('image full')
					).addClass('img-container')
				);
			}


			$('.img-portfolio').one("load", function() {
				$(this).parent().parent().parent().removeClass('preloader');
				//$(this).css({opacity:1.0})
			}).each(function() {
				if(this.complete){$(this).load();};
			});
			
			baguetteBox.run('.portfolioPhoto', {
				// Custom options
			});
			
			//$('.loading').trigger("recentphoto");

		}
	);


}



window.onload = function() {
	initSliderTab(_flickrId,_flickrSliderImgTag);

	//swap portfolio
	
	initRecentWorks(_flickrId);
	

};

