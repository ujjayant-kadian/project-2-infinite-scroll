const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = 'oMoOLd-oroewbTTOewqCfsKH1LGxOD36WSw-lPHJiiM';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded

function imageLoaded() {
  // console.log('image loaded');
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
    imagesLoaded = 0;
    count = 30;
    // console.log('ready=', ready);
  }
}

//A function that will help to set attribute on DOM elements
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create elements for links and photos, add to DOM
function displayPhoto() {
  totalImages = photosArray.length;
  // console.log('total images', totalImages);
  //Run the function for each object in photosArray
  photosArray.forEach((photo) => {
    //Creating <a> to link to unsplash
    const item = document.createElement('a');
    setAttribute(item, {
      href: photo.links.html,
      target: '_blank',
    });
    //Create <img> for photo
    const img = document.createElement('img');
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //Event listener to check if we have finished loading
    img.addEventListener('load', imageLoaded);

    //Put <img> inside <a>, then put both inside image container div
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Getting photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhoto();
    // console.log(photosArray);
  } catch (error) {
    //Catch Error here
  }
}

//Check to see if scrolling near the bottom of the page, if yes, load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
//On load
getPhotos();
