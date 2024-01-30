(() => {
    // set constants or variables

    // character box
    const characterBox = document.querySelector("#character-box");

    // movie box
    const movieBox = document.querySelector(".movie-box-information");

    const closeMovie = document.querySelector("#close");

    const preLoadText = document.querySelector("#pre-load-text");

    const loadingbox = document.querySelector("#loading-box");

    const loadingbox2 = document.querySelector("#loading-box-2");

    const reviewTemplate = document.querySelector("#review-template");

    const reviewCon = document.querySelector("#review-con");

    const baseUrl = `https://swapi.dev/api/`

    let getSpinner = `<img src="images/spinner.svg" alt="spinner image" class="spinner-img">`

    //////////////////////////////////////////

    //////////////////////////////////////////


    // initiate first call

    function getMovies(){
        loadingSpinner()
        fetch(`${baseUrl}/people`) // baseurl + "people" (star wars characters)
        .then(response => response.json())
        .then(function(response)
        
        {
            const characters = response.results;

            const ul = document.createElement("ul");

            characters.forEach((character) =>
            
            {
                loadingbox.classList.add("hidden");

                const li = document.createElement("li");

                const a = document.createElement("a");

                a.textContent = character["name"];

                const listOfFilms = character["films"];

                if ((listOfFilms.length) > 3)
                
                {
                    a.dataset.listOfFilms = listOfFilms[3];
                } else{
                    a.dataset.listOfFilms = listOfFilms[listOfFilms.length - 1];
                }

                li.appendChild(a);
                ul.appendChild(li);
            })


            characterBox.appendChild(ul);
        })


        .then(function (){
            const links = document.querySelectorAll("#character-box li a");
            links.forEach(link =>{
                link.addEventListener("click", getReview);
            })

        });
    }


    function getReview(e){
        loadingSpinnerMovies()
        const reviewID = e.currentTarget.dataset.listOfFilms;
        fetch(`${reviewID}`)
        .then(response => response.json())
        .then(function(response){
            loadingbox2.classList.add("hidden");

            movieBox.style.display = 'block';

            preLoadText.style.display = "none";
            
            reviewCon.innerHTML="";

            const template = document.importNode(reviewTemplate.content, true);

            const reviewAuthor = template.querySelector(".movie-title");

            const reviewBody = template.querySelector(".movie-description");

            const image = template.querySelector(".photo-movie");

            const idMovie = response.episode_id;

            reviewAuthor.innerHTML = response.title;

            reviewBody.innerHTML = response.opening_crawl;

            //poster- prefix for the images
            image.src = `images/poster-${idMovie}.jpg`;
            reviewCon.appendChild(template);
        })
        .catch()
    }

    function loadingSpinner(){
        loadingbox.innerHTML = getSpinner;
      }

      function loadingSpinnerMovies(){
        loadingbox2.classList.remove("hidden");
        loadingbox2.classList.add("block");
        loadingbox2.innerHTML = getSpinner;
      }

    getMovies();
      function hideMovie() {

        movieBox.style.display = "none";

        preLoadText.style.display = "block";
      }

    closeMovie.addEventListener("click", hideMovie);
})();
