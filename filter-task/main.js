const PRODUCTS = [
    {
        id: 1,
        name: "Laptop",
        price: 999.99,
        desc: 'lorem ipsum dot color',
        category: "Electronics"
    },
    {
        id: 2,
        name: "Smartphone",
        price: 699.99,
        desc: 'lorem ipsum dot color',
        category: "Electronics"
    },
    {
        id: 3,
        name: "Headphones",
        price: 99.99,
        desc: 'lorem ipsum dot color',
        category: "Electronics"
    },
    {
        id: 4,
        name: "T-shirt",
        price: 19.99,
        desc: 'lorem ipsum dot color',
        category: "Clothing"
    },
    {
        id: 5,
        name: "Jeans",
        price: 49.99,
        desc: 'lorem ipsum dot color',
        category: "Clothing"
    },
    {
        id: 6,
        name: "Backpack",
        price: 79.99,
        desc: 'lorem ipsum dot color',
        category: "Accessories"
    },
    {
        id: 7,
        name: "Watch",
        price: 149.99,
        desc: 'lorem ipsum dot color',
        category: "Accessories"
    },
    {
        id: 8,
        name: "Desk Lamp",
        price: 29.99,
        desc: 'lorem ipsum dot color',
        category: "Home & Office"
    },
    {
        id: 9,
        name: "Coffee Mug",
        price: 9.99,
        desc: 'lorem ipsum dot color',
        category: "Home & Office"
    },
    {
        id: 10,
        name: "Notebook",
        price: 4.99,
        desc: 'lorem ipsum dot color',
        category: "Home & Office"
    }
];


const whishList = document.querySelector('#whishList')

let whishListArr = []

const createCard = (data) => {
    let col4 = document.createElement('div');
    col4.className = 'col-4 mb-3';
    let card = document.createElement('div');
    card.className = 'card';
    let cardHeader = document.createElement('div');
    cardHeader.className = 'card-header d-flex justify-content-between align-items-center';

    let cardTitle = document.createElement('div');
    cardTitle.className = 'card-title';
    cardTitle.innerText = data.name;

    let HeartIcon = document.createElement('i');
    HeartIcon.className = 'fa-regular fa-heart';

    if (whishListArr.includes(data.name)) {
        HeartIcon.classList.add('fa-solid');
    }

    HeartIcon.addEventListener('click', () => {

        if (!whishListArr.includes(data.name)) {
            whishListArr.push(data.name);

        } else {
            whishListArr = whishListArr.filter(x => x != data.name)
        }

        HeartIcon.classList.toggle('fa-solid');
        whishList.innerHTML = '';
        whishListArr.forEach((x) => {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.className = 'dropdown-item'
            a.textContent = x
            li.appendChild(a)
            whishList.appendChild(li);

        })
    }

    )


    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let cardBodyPar = document.createElement('p');
    cardBodyPar.innerText = data.desc;

    let cardBodySpan = document.createElement('span');
    cardBodySpan.innerText = '$' + data.price.toFixed(2);

    let cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer d-flex gap-3';

    let addBtn = document.createElement('button');
    addBtn.className = 'btn btn-primary add-basket';
    addBtn.innerText = 'Add to Cart';

    addBtn.addEventListener('click', () => {
        let quantity = document.getElementById(`txtQuantity${data.id}`)
        if (quantity.value > 0) {
            console.log(data.name + " " + quantity.value);
        }
    })


    let decreaseBtn = document.createElement('button');
    decreaseBtn.className = 'btn btn-sm btn-outline-secondary';
    decreaseBtn.innerText = '-';


    decreaseBtn.addEventListener('click', () => {
        let quantity = document.getElementById(`txtQuantity${data.id}`)
        if (quantity.value > 0) {
            quantity.value--
        }
    })


    let productCountInput = document.createElement('input');
    productCountInput.className = 'form-control w-25';
    productCountInput.id = `txtQuantity${data.id}`
    productCountInput.type = 'number';

    productCountInput.value = 0;





    let incraseBtn = document.createElement('button');
    incraseBtn.className = 'btn btn-sm btn-outline-secondary';
    incraseBtn.innerText = '+';
    incraseBtn.addEventListener('click', () => {
        let quantity = document.getElementById(`txtQuantity${data.id}`)
        quantity.value++

    })








    col4.appendChild(card);
    card.appendChild(cardHeader);
    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(HeartIcon);
    card.appendChild(cardBody);
    cardBody.appendChild(cardBodyPar);
    cardBody.appendChild(cardBodySpan);
    card.appendChild(cardFooter);
    cardFooter.appendChild(addBtn);
    cardFooter.appendChild(decreaseBtn);
    cardFooter.appendChild(productCountInput);
    cardFooter.appendChild(incraseBtn);

    return col4;

};

// let bindShopingCards = (data, catagory) => {
//     if (catagory == 'All') {
//         data.forEach((x)=>{
            
//         })
//     }

// }


const createListItem = (text) => {
    let listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.textContent = text;
    return listItem;
};

const showFilteredProducts = (filteredProducts) => {
    let dvProducts = document.getElementById('dvProducts');
    dvProducts.innerHTML = '';
    filteredProducts.forEach(product => {
        let card = createCard(product);
        dvProducts.appendChild(card);
    });
};

const createfilter = () => {
    let categories = [];
    let categoryListElement = document.getElementById('categoryList');
    PRODUCTS.forEach(product => {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        }
    });

    categories.forEach(category => {
        let listItem = createListItem(category);
        listItem.addEventListener('click', () => {
            let previousActive = categoryListElement.querySelector('.active');
            if (previousActive) {
                previousActive.classList.remove('active');
            }
            listItem.classList.add('active');

            let filteredProducts = PRODUCTS.filter(product => product.category === category);

            showFilteredProducts(filteredProducts);
        });
        categoryListElement.appendChild(listItem);
    });



};









const txtSearch = document.getElementById('txtSearch')

const searchProducts = (e) => {
    let searchString = e.target.value.toLowerCase();
    let filteredProducts = PRODUCTS.filter((product) => {
        return product.name.toLowerCase().includes(searchString);
    });
    showFilteredProducts(filteredProducts);
};


document.addEventListener("DOMContentLoaded", () => {
    let dvProducts = document.getElementById('dvProducts');
    PRODUCTS.forEach((cardProductData) => {
        let card = createCard(cardProductData);
        dvProducts.appendChild(card);

    });
    createfilter();
});
txtSearch.addEventListener('keyup', (e) => {
    txtSearch.innerHTML = ''
    searchProducts(e)

})
