
	// for collection portfolio set page.
	var _collectionData={};
	var loadSetPage = function(event){

		$("#collectionContainer").hide();
		//.hide("slow", function(){
			//do something;
		//});
		$('.setPortfolio-parent').show();
		$('#setFooter').hide();

		$("#setPhoto").addClass('setPortfolio-div');
		var setNo=event.data;

		location.hash='#portfolio'+setNo;

		var data=_collectionData.data[setNo].gallery;

    	var setGallery=[];
    	for(var k=0;k<data.length;k++){
   			setGallery.push(
	    		{ 
	    			"src": data[k].image, 
	    			"thumb": data[k].thumb,
	    			"sizes": { 
	    				"medium" : data[k].image, 
	    				"large" : data[k].big, 
	    				"full" : data[k].big 
	    			}, 
	    			"caption": data[k].title,
	    			"width": "",
	    			"height": "" 
	    		}

    		);

    	}


		JQPM("#setPhoto").photoMosaic({ gallery: setGallery, padding: 5, columns: 2, width: 'auto', height: 'auto', center: true, prevent_crop: false, links: true, external_links: false, show_loading: true, loading_transition: "fade", responsive_transition: true, modal_name: "pmlightbox"+setNo, modal_group: true, sizes: { thumbnail: 150, medium: 300, large: 1024 }, modal_ready_callback : function($photomosaic){ 
				//jQuery("a[rel^='pmlightbox']", $photomosaic).prettyPhoto({deeplinking:false});
				baguetteBox.run('#setPhoto', {
					// Custom options
				});				
				$('#setFooter').show();
			}, order: "masonry" });
		/*
		$('#setPrimaryPhoto').append(
			$('<div/>').addClass('img-circle-div').css({ background : 'url('+_collectionData.data[setNo].primary.url_m+') no-repeat center center'})
		);*/
		
		$('#setDescription').append(
			$('<h3/>').html(_collectionData.data[setNo].title),
			$('<p/>').html(_collectionData.data[setNo].description)
		);
		
		$('#setFooter').append(
			$('<div/>').append(
			$('<span/>').addClass("btn btn-lg btn-default btn-block").html('Close').click(
				function(){
					//hide the div and clean the divs
					
					$('.setPortfolio-parent').hide();
					
					$('#setPrimaryPhoto').html('');
					$('#setDescription').html('');
					$("#setPhoto").html('');
					console.log(JQPM("#setPhoto").get(0));
					console.log(JQPM.data(JQPM("#setPhoto").get(0), "photoMosaic"));
					JQPM.removeData(JQPM("#setPhoto").get(0), "photoMosaic");
					
					$('#setFooter').html('');
					
					//opacity
					if($("#collectionContainer").css('opacity')==0){
						$("#collectionContainer").css({opacity:100,visibility:'visible'});
					}
					$("#collectionContainer").show("slow", function(){
						//do something;
					});
					location.hash='';
				}
			)
			).addClass("col-md-4")
		);
		
	}



	var _flickrId = '69414961@N00';
	var _collectionId = '1126003-72157641779573683';


	var initPortfolioCollection= function(flickrId, collectionId){


		$('.setPortfolio-parent').hide();
		var flickrToolInstance3 = new Tools.Flickr();
		$("#collectionContainer").hide();
		flickrToolInstance3.collection(flickrId,collectionId,function(collectionData){
			
			console.log(collectionData);
			$('#portfoliorow').html('');
			
			_collectionData = collectionData;

			for(var j=0;j<collectionData.data.length;j++){
				$('#portfoliorow').append(
					$('<div/>').append(
						$('<div/>',{id: 'portfolio_'+j }).addClass('img-container img-portfolio-div img-hover').css({ background : 'url('+collectionData.data[j].primary.url_m+') no-repeat center center'}).click(j,loadSetPage).append(
							$('<div/>').addClass('portfolio-title').append(
								$('<h3/>').html(collectionData.data[j].title)
							)
						)
						//,$('<p/>').html(collectionData.data[j].description)
					).addClass("col-md-4 col-sm-6 portfoliorow")
				);	

				
			}
			
			//console.log('location.hash=='+location.hash);
			if(location.hash.match(/#portfolio\d+/)){
				//console.log('match!!!');
				//do something.
				var portNoStr=location.hash.match(/\d+/g)[0];
				var portNo=parseInt(portNoStr);
				$("#collectionContainer").hide();
				loadSetPage({data:portNo});
				//$("#collectionContainer").trigger('collectionDataLoaded');
			}else{
				$("#collectionContainer").show("slow", function(){
						//do something;
				});;
			}


			
		});


	}

	
    $(document).ready(function() {


		initPortfolioCollection(_flickrId,_collectionId);



    });	