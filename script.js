function showNext(li){
	var $itms=$('div#timeline_container li');
	$('html,body').stop().animate({ scrollTop: $(li).offset().top-$(li).height() / 3}, 500,function(){
		$('html,body').stop();
	});
}

function movieToElement(movie) {
    element = `<li class="event active" onmouseover="showNext(this)">
                <div class="event_icn icon-space"></div>
                <div class="event_content">
                    <h2>${movie.title} (${movie.days_until} days)</h2>
                    <img src="${movie.poster_url}" alt="${movie.title} poster">
                    <p>
                        ${movie.overview}    
                    </p>
                </div>
                <div class="event_date">
                    ${movie.release_date}
                </div>
            </li>`;
    return element;
}

async function addAllMovies() {
    let date = '';
    do {
        let endpoint = `https://www.whenisthenextmcufilm.com/api${date ? `?date=${date}` : ''}`
        await $.get(endpoint, function(movie) {
            date = movie.release_date;
            if(!date)
                return;
            element = movieToElement(movie)
            $('div#timeline_container > ul').append(element)
        });
    } while(date);
}

$(document).ready(function(){
	addAllMovies();
  });