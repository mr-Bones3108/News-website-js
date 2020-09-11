console.log('This is my index js file');
// e08d46af64bd4ea6b6f9b2ea04059d0f



let apiKey = 'e08d46af64bd4ea6b6f9b2ea04059d0f';

// grab the news container
let newsAccordion = document.getElementById('newsAccordion');


//creat a get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `http://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`, true);
// xhr.getResponseHeader('Content-type', 'application/json');
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = "";
        articles.forEach(function(element, index) {
            // console.log(element, index)
            let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                <button class="btn btn-link collapsed" id="read" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                    aria-expanded="false" aria-controls="collapse${index}">
                                   <b>Breaking News ${index+1}:</b>
                                   ${element["title"]}
                                </button>
                                </h2>
                            </div>

                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                <div class="card-body">
                               ${element["content"]}.<a href="${element['url']}" target="_blank" >Read more here</a> 
                                </div>
                            </div>
                        </div>`;
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured")
    }
}

xhr.send()

// and make search working

let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){
 
    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let newsCard = document.getElementsByClassName('card');
    Array.from(newsCard).forEach(function(element){

        let cardTxt = element.getElementsByClassName("card-body")[0].innerText;
        console.log(cardTxt);
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }


    })

})

// var aTags = document.getElementsByTagName("p");
// var searchText = "SearchingText";
// var found;

// for (var i = 0; i < aTags.length; i++) {
//   if (aTags[i].textContent == searchText) {
//     found = aTags[i];
//     break;
//   }
// }