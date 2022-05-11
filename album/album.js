let queryParams = window.location.search;
let urlParams = new URLSearchParams(queryParams);
let albumId = urlParams.get(`album-id`)

let picturesDiv = document.createElement('div')
document.querySelector('body').append(picturesDiv)
            picturesDiv.id = `gallery--getting-started`
            picturesDiv.classList.add(`pswp-gallery`, `pswp-gallery--single-column`)
// to get album id for url

fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
    .then(r => r.json())
        .then(album => {
            console.log(album)
            let albumTitle = document.createElement('h2');
            // let picturesDiv = document.createElement('div')
            albumTitle.innerText = upCase(album.title)
            document.querySelector('body').append(albumTitle)
            // document.querySelector('body').append(picturesDiv)
            // picturesDiv.id = `gallery--getting-started`
            // picturesDiv.classList.add(`pswp-gallery`, `pswp-gallery--single-column`)
        


// to get album author

            fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
                .then(r => r.json())
                    .then(albumAuthor => {
                        let authorName = document.createElement(`h4`)
                        authorName.textContent = `Created by ${albumAuthor.name}`
                        albumTitle.after(authorName)
                        authorName.addEventListener(`click`, (e) => {
                            window
                              .open(
                                `/JS/0504_projektas/user/user.html?userId=${album.userId}`,
                                "_blank"
                              )
                              .focus();
                        })
                
// fetch for photos 

                    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_limit=11`)
                    .then(r => r.json())
                        .then(photos => {
                           photos.map(photo => {
                               console.log(photo.url)
                               const image = document.createElement('a');
                               image.setAttribute(`href`, `${photo.url}`)
                               image.setAttribute(`id`, `gallery--getting-started`)
                               image.setAttribute(`data-pswp-width`, `1875`)
                               image.setAttribute(`data-pswp-height`, `2500`)
                               image.setAttribute(`data-cropped`, `true`)
                               let img = document.createElement(`img`)
                               img.setAttribute(`src`, `${photo.url}`)
                               
                            picturesDiv.append(image)
                            // document.querySelector(`#gallery--getting-started`).append(image)
                            image.append(img)
                            })
                            
                        })    
                    })
    })
    
function upCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// const lightbox = new PhotoSwipeLightbox({
//     gallery: '#my-gallery',
//     children: 'a',
//   });
//   lightbox.init();
          