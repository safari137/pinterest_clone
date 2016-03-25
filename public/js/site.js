var $container = $('#masonry-grid');
 
  $container.imagesLoaded()
  .always(function() {
    
  })
  .done(function() {
    runMasonry();
  })
  .fail(function(info) {
    replaceBrokenImages(info.images);
  });


function replaceBrokenImages(images) {
  var broken = images.filter(function(value) {
    return (value.isLoaded === false);
  });
  
  broken.forEach(function(image, index, arr) {
    var src = image.img.currentSrc;
    $(image.img.offsetParent).children('img').attr('src', '/images/nophoto.png');
    if (index === arr.length -1)
      runMasonry();
  });
}


$(".delete").on('click', function() {
  deletePin(this);
});


function deletePin(element) {
   $.ajax({
    url: "/api/pin/" + $(this).attr("id"),
    type: 'DELETE',
  })
  .error(function(err) {
    console.log(err);
  })
  .done(function() {
    $(element).parents('.grid-item').fadeOut('slow');
  });
}

function runMasonry() {
  setTimeout(function(){ $container.masonry({
      columnWidth: 160,
      itemSelector: '.grid-item'
    });
    
  }, 500);
  
}