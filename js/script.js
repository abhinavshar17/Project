const searchBtn = document.getElementById('search-btn');
const bookDisplay = document.getElementById('book-display');
const bookSearch = document.getElementById('book-search');
const loginBtn = document.getElementById('login-btn');
const loginFormContainer = document.getElementById('login-form-container');
const closeLoginBtn = document.getElementById('close-login-btn');
const submitReviewBtn = document.getElementById('submit-review');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const reviewInput = document.getElementById('review');
const favorites = [];
let isLoginFormVisible = false;

searchBtn.addEventListener('click', () => {
  const bookName = bookSearch.value;
  if (bookName.trim() !== '') {
    fetchBook(bookName);
  } else {
    alert('Please enter a book name.');
  }
});

closeLoginBtn.addEventListener('click', () => {
  loginFormContainer.style.display = 'none';
});

submitReviewBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const review = reviewInput.value.trim();
  
  if (name === '' || email === '' || review === '') {
    alert('Please fill all fields.');
  } else {
    alert('Review submitted successfully!');
    nameInput.value = '';
    emailInput.value = '';
    reviewInput.value = '';
    loginFormContainer.style.display = 'none';
    isLoginFormVisible = false;
  }
});

async function fetchBook(bookName) {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}&maxResults=50`);
    const data = await response.json();

    if (data.totalItems > 0) {
      const books = data.items;
      let bookContent = '';
      books.forEach(book => {
        const volumeInfo = book.volumeInfo;
        const image = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'no-image.jpg';
        const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown';
        const categories = volumeInfo.categories ? volumeInfo.categories.join(', ') : 'Unknown';
        const pageCount = volumeInfo.pageCount ? volumeInfo.pageCount : 'Unknown';
        const publishedDate = volumeInfo.publishedDate ? volumeInfo.publishedDate : 'Unknown';
        const description = volumeInfo.description ? volumeInfo.description : 'Description not available';

        bookContent += `
          <div class="book-item">
            <img src="${image}" alt="Book Cover">
            <div class="book-details">
              <h3>${volumeInfo.title}</h3>
              <p><strong>Author(s):</strong> ${authors}</p>
              <p><strong>Categories:</strong> ${categories}</p>
              <p><strong>Page Count:</strong> ${pageCount}</p>
              <p><strong>Published Date:</strong> ${publishedDate}</p>
              <p class="description"><strong>Description:</strong> ${description}</p>
            </div>
            <div class="icons">
              <div class="search-icon fas fa-search" onclick="showBookDetails('${volumeInfo.title}', '${authors}', '${categories}', '${pageCount}', '${publishedDate}', '${description}', '${image}')"></div>
              <a href="#" class="heart-icon fas fa-heart" onclick="addToFavorites('${volumeInfo.title}')"></a>
              <a href="#" class="cart-icon fas fa-shopping-cart" onclick="addToCart('${volumeInfo.title}')"></a>
              <div class="user-icon fas fa-user" onclick="toggleLoginForm()"></div>
            </div>
          </div>
        `;
      });
      bookDisplay.innerHTML = bookContent;
    } else {
      bookDisplay.innerHTML = '<p>No books found.</p>';
    }
  } catch (error) {
    console.error('Error:', error);
    bookDisplay.innerHTML = '<p>Failed to fetch book data.</p>';
  }
}

function showBookDetails(title, authors, categories, pageCount, publishedDate, description, image) {
  const authorDetails = document.getElementById('author-details');
  authorDetails.innerHTML = `
    <h2>${title}</h2>
    <p><strong>Author(s):</strong> ${authors}</p>
    <p><strong>Categories:</strong> ${categories}</p>
    <p><strong>Page Count:</strong> ${pageCount}</p>
    <p><strong>Published Date:</strong> ${publishedDate}</p>
    <p><strong>Description:</strong> ${description}</p>
    <img src="${image}" alt="Book Cover">
  `;
  authorDetails.style.display = 'block';
}

function addToFavorites(title) {
  if (!favorites.includes(title)) {
    favorites.push(title);
    alert(`${title} has been added to favorites!`);
  } else {
    alert(`${title} is already in favorites!`);
  }
}

function addToCart(title) {
  alert(`${title} has been added to cart!`);
}

function toggleLoginForm() {
  if (!isLoginFormVisible) {
    loginFormContainer.style.display = 'flex';
    isLoginFormVisible = true;
  } else {
    loginFormContainer.style.display = 'none';
    isLoginFormVisible = false;
  }
}

searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
}

let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () =>{
  loginForm.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () =>{
  loginForm.classList.remove('active');
}

window.onscroll = () =>{

  searchForm.classList.remove('active');

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

  fadeOut();

}

function loader(){
  document.querySelector('.loader-container').classList.add('active');
}

function fadeOut(){
  setTimeout(loader, 4000);
}

var swiper = new Swiper(".books-slider", {
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".reviews-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".blogs-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});