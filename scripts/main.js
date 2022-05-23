let main = document.getElementById('main');

let fragment = new DocumentFragment();

let intro = document.createElement('section');
intro.classList.add('intro');

let introText = document.createElement('div');
introText.classList.add('intro-text');
let introImage = document.createElement('div');
introImage.classList.add('intro-image');
let introAdvantages = document.createElement('div');
introAdvantages.classList.add('intro-advantages');

let h1 = document.createElement('h1');
h1.innerHTML = 'Welcome to Our Bookshop';
introText.appendChild(h1);

let introParagraph = document.createElement('p');
introParagraph.classList.add('intro-paragraph');
introParagraph.innerHTML =
  'With our book store, you can shop online and save your precious time';
introText.appendChild(introParagraph);

let introBtnBlock = document.createElement('div');
introBtnBlock.classList.add('intro-btn-block');
introText.appendChild(introBtnBlock);

let introBtn = document.createElement('a');
introBtn.href = '#catalog';
introBtn.classList.add('intro-btn');
introBtn.innerHTML = 'Explore books &nbsp; &rarr;';
introBtnBlock.appendChild(introBtn);

let introImg = document.createElement('img');
introImg.classList.add('intro-img');
introImg.src = './images/bookshop.jpg';
introImg.alt = 'books image';
introImage.appendChild(introImg);

let introUl = document.createElement('ul');
introUl.classList.add('intro-ul');
introAdvantages.appendChild(introUl);

let advantages = [
  {
    title: 'Shipping',
    description: 'Free shipping to your home wherever you you are',
  },
  {
    title: 'Price',
    description: 'Affordable prices coupled with good quality',
  },
  {
    title: 'Authors',
    description: 'Eminent authors from around the world',
  },
];

for (let i = 0; i < advantages.length; i++) {
  let li = document.createElement('li');
  li.innerHTML = `<span class="num">${i + 1}</span> <div>
  <span class="advantage-title">${advantages[i].title}</span>
    <span class="advantage-description">${
      advantages[i].description
    }</span></div>`;
  introUl.appendChild(li);
}

intro.appendChild(introText);
intro.appendChild(introImage);
intro.appendChild(introAdvantages);

let catalog = document.createElement('section');
catalog.id = 'catalog';

let h2 = document.createElement('h2');
h2.innerHTML = 'Book Catalog';
catalog.appendChild(h2);

let cards = document.createElement('div');
cards.classList.add('cards');
catalog.appendChild(cards);

fetch('./books.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((el) => {
      let card = document.createElement('div');
      card.classList.add('card');
      cards.appendChild(card);

      let img = document.createElement('img');
      img.src = el.imageLink;
      img.alt = `${el.title} book cover`;
      img.classList.add('card-img');
      card.appendChild(img);

      let cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      card.appendChild(cardBody);

      let title = document.createElement('h3');
      title.innerHTML = el.title;
      title.classList.add('title');
      cardBody.appendChild(title);

      let modalTitle = document.createElement('h3');
      modalTitle.innerHTML = el.title;

      let author = document.createElement('h4');
      author.innerHTML = el.author;
      author.classList.add('author');
      cardBody.appendChild(author);

      let price = document.createElement('span');
      price.innerHTML = `$${el.price}`;
      price.classList.add('price');
      cardBody.appendChild(price);

      let showMore = document.createElement('button');
      showMore.innerHTML = 'Show More';
      showMore.classList.add('btn-show-more');
      cardBody.appendChild(showMore);

      let addTobag = document.createElement('button');
      addTobag.innerHTML = 'Add to Bag';
      addTobag.classList.add('btn-add');
      cardBody.appendChild(addTobag);

      let description = document.createElement('p');
      description.innerHTML = el.description;
      description.classList.add('description');

      let close = document.createElement('button');
      close.innerHTML = 'Close';
      close.classList.add('btn-close');

      let modal = document.createElement('div');
      modal.classList.add('book-modal');
      let modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');
      modalContent.appendChild(modalTitle);
      modalContent.appendChild(description);
      modalContent.appendChild(close);
      modal.appendChild(modalContent);
      main.appendChild(modal);

      showMore.onclick = function () {
        modal.style.display = 'block';
      };

      close.onclick = function () {
        modal.style.display = 'none';
      };
    });
  });

let bottomBag = document.createElement('div');
bottomBag.id = 'bottomBag';
bottomBag.className = 'bottomBag hide';

let bottomBagContent = document.createElement('div');
bottomBagContent.className = 'bottom-bag-content';
bottomBag.appendChild(bottomBagContent);

let span = document.createElement('span');
span.innerHTML = '&uarr;';
span.className = 'upward-arrow';
bottomBagContent.appendChild(span);

const myScrollFunc = function () {
  let y = window.scrollY;
  if (y >= intro.offsetHeight / 2) {
    bottomBag.className = 'bottomBag show';
  } else {
    bottomBag.className = 'bottomBag hide';
  }
};

window.addEventListener('scroll', myScrollFunc);

fragment.appendChild(intro);
fragment.appendChild(catalog);
fragment.appendChild(bottomBag);

main.appendChild(fragment);
