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
    data.forEach((el, index) => {
      let card = document.createElement('div');
      card.classList.add('card');
      card.id = `cardId${index}`;
      cards.appendChild(card);

      let img = document.createElement('img');
      img.src = el.imageLink;
      img.alt = `${el.title} book cover`;
      img.id = `imgId${index}`;
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
      addTobag.addEventListener('click', () => {
        card.classList.add('in-bag');
      });
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
      catalog.appendChild(modal);

      showMore.onclick = function () {
        modal.style.display = 'block';
      };

      close.onclick = function () {
        modal.style.display = 'none';
      };
    });
  })
  .then(() => {
    addBtns = Array.from(document.getElementsByClassName('btn-add'));
    addBtns.forEach((button) => {
      button.addEventListener('click', () => {
        addToCartAndUpdate(button);
      });
    });

    let imgs = Array.from(document.querySelectorAll('.card-img'));
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].draggable = 'true';
      imgs[i].addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', imgs[i].id)
      })

      imgs[i].addEventListener('dragend', e => {
        bottomBag.classList.remove('drop-over')
      })
    }
  });

function updateTotalSum() {
  let total = Array.from(cardsInBagBlock.querySelectorAll('.in-bag')).reduce(
    (acc, num) => {
      acc += Number(num.children[1].children[2].textContent.replace('$', ''));
      return acc;
    },
    0
  );
  totalSum.innerHTML = `Total sum is $${total}`;
}

function updateNumberOfBooks() {
  let num = Array.from(cardsInBagBlock.querySelectorAll('.in-bag')).length;
  let numSpan = document.createElement('span');
  numSpan.classList.add('num-span');
  numSpan.textContent = num;
  cart.children[1].remove();
  cart.appendChild(numSpan);
}

function addToCartAndUpdate(btn) {
  if (btn.parentElement.parentElement.classList.contains('in-bag')) {
    if (
      cardsInBagBlock.querySelector(`#${btn.parentElement.parentElement.id}`) ==
        null ||
      btn.parentElement.parentElement.isEqualNode(
        cardsInBagBlock
          .querySelector(`#${btn.parentElement.parentElement.id}`)
          .classList.remove('has-btn')
      )
    ) {
      cardsInBagBlock.appendChild(
        btn.parentElement.parentElement.cloneNode({ deep: true })
      );
      updateTotalSum();
      updateNumberOfBooks();
    }
  }

  let closeBtn = document.createElement('span');
  closeBtn.classList.add('close-btn');
  closeBtn.innerHTML = '&times;';

  let cards = Array.from(document.getElementsByClassName('card'));
  cards.forEach((el) => {
    if (el.classList.contains('in-bag') && cardsInBagBlock.contains(el)) {
      if (!el.classList.contains('has-btn')) {
        el.children[1].appendChild(closeBtn.cloneNode({ deep: true }));
        el.classList.add('has-btn');
      }
    }
  });

  let closeBtns = Array.from(cardsInBagBlock.querySelectorAll('.close-btn'));
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.parentElement.parentElement.remove();
      updateTotalSum();
      updateNumberOfBooks();
    });
  });
}

let bottomBag = document.createElement('div');
bottomBag.id = 'bottomBag';
bottomBag.className = 'bottomBag hide';

bottomBag.addEventListener('dragover', e => {
  e.preventDefault();
  bottomBag.classList.add('drop-over')
})

bottomBag.addEventListener('drop', e => {
  e.preventDefault()
  const imageId = e.dataTransfer.getData('text/plain')
  const card = document.getElementById(imageId).parentElement;
  card.children[1].children[4].click()
  bottomBag.classList.remove('drop-over')
})

let bottomBagContent = document.createElement('div');
bottomBagContent.className = 'bottom-bag-content';

let cardsInBagBlock = document.createElement('div');
cardsInBagBlock.id = 'cards-in-bag-block';
cardsInBagBlock.classList.add('cards-in-bag-block');
bottomBagContent.appendChild(cardsInBagBlock);

let totalSum = document.createElement('h3');
totalSum.classList.add('total-sum');
totalSum.innerHTML = `Total sum is $0`;
bottomBagContent.appendChild(totalSum);

let confirm = document.createElement('a');
confirm.classList.add('confirm');
confirm.innerHTML = 'Confirm Order';
confirm.href = './order-form.html';
confirm.target = '_blank'
bottomBagContent.appendChild(confirm);

let chevronUp = document.createElement('div');
chevronUp.innerHTML =
  '<svg style="height: 35px; width: 35px; color: rgb(0, 0, 255);" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>ionicons-v5-a</title><polyline points="112 328 256 184 400 328" style="fill:none;stroke:#000;stroke-linecap:square;stroke-miterlimit:10;stroke-width:48px"></polyline></svg>';
chevronUp.className = 'upward-arrow';
bottomBag.appendChild(chevronUp);
chevronUp.addEventListener('click', () => {
  bottomBag.classList.toggle('full');
});

const myScrollFunc = function () {
  let y = window.scrollY;
  if (y >= intro.offsetHeight / 2) {
    bottomBag.classList.add('show');
    bottomBag.classList.remove('hide');
  } else {
    bottomBag.classList.add('hide');
    bottomBag.classList.remove('show');
    bottomBag.classList.remove('full');
  }
};

let orderBooks = document.createElement('h2');
orderBooks.innerHTML = 'Order Books ';

let cart = document.createElement('div');
cart.classList.add('cart');
cart.id = 'cart';
cart.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> ';
let initialNum = document.createElement('span');
initialNum.textContent = '0';
cart.appendChild(initialNum);
orderBooks.appendChild(cart);

bottomBag.appendChild(orderBooks);
bottomBag.appendChild(bottomBagContent);

window.addEventListener('scroll', myScrollFunc);

fragment.appendChild(intro);
fragment.appendChild(catalog);
fragment.appendChild(bottomBag);

main.appendChild(fragment);
