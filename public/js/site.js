var $container = $('#masonry-grid');
 
  $container.imagesLoaded()
  .always(function() {
    $container.masonry({
      columnWidth: 160,
      itemSelector: '.grid-item'
    });
  })
  .fail(function(info) {
    replaceBrokenImages(info.images);
  });


function replaceBrokenImages(images) {
  var broken = images.filter(function(value) {
    return (value.isLoaded === false);
  });
  
  broken.forEach(function(image) {
    var src = image.img.currentSrc;
    $(image.img.offsetParent).children('img').attr('src', '/images/nophoto.png');
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