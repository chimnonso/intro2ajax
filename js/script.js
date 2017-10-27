
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var $street = $('#street').val();
    var $city = $('#city').val();
    var address = $street + ', ' + $city;// + '$key=AIzaSyAtz0DINsi40Db3MRM_ItyAW4AJR_c6zIU';
    var addressUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '&key=AIzaSyAtz0DINsi40Db3MRM_ItyAW4AJR_c6zIU'; 
    var output = `
        <img src="${addressUrl}" class="bgimg">
    `;
    
    $greeting.text('So you want to live at ' + address);
    // $body.append('<img src="'+ addressUrl +'" class="bgimg">');
    $body.append("<img src='img.jpg' class='bgimg'>");

    var nyTimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';//?q=' + $city + '&api-key=bf7fa3dd3f6b4c1bba5b13bb7165a41c&sort=newest' ;

    axios.get(nyTimesUrl, {
        params: {
            q: $city,
            'api-key': 'bf7fa3dd3f6b4c1bba5b13bb7165a41c',
            sort: 'newest'
        }
    })
    .then(function(response) {
        console.log(response)
        let articles = response.data.response.docs;
        let output = '';
        console.log(articles);
        $nytHeaderElem.text('New York Times Articles About ' + $city);
        
        $.each(articles, (key, article) => {
            console.log(article);
            output += `
                <li class="article">
                    <a href="${article.web_url}">${article.headline.main}</a>
                    <p>${article.snippet}</p>
                </li>
                
            `;
        })
        $nytElem.html(output);
    })
    .catch(function (err) {
        console.log(err)
    });

    return false;
};

$('#form-container').submit(loadData);
