var imported = document.createElement('script');
imported.src = 'script.js';
document.head.appendChild(imported);

document.addEventListener('DOMContentLoaded', () => {
    getCategories();
    getProducts();  
})

async function getProducts() {
    try {
        const options = {
            headers: new Headers({"authorization-token": getCookie("authorization-token")}),
        }
        await fetch('http://localhost:3000/user/listProducts', options).then(res => {
            return res.json()
        }).then(json => {
            let favs;
            let color;
            let tag;
            let products = json;
            products.forEach((product) => {
                if(product.fav) {
                    favs = `<i class="fa fa-thumbs-down" aria-hidden="true"></i>`
                    color = `rgb(179, 54, 54)`
                    tag =  `"Remover favorito"`
                }else {
                    favs = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>`
                    color = ``;
                    tag = `"Add aos favoritos"`
                }
                let productElement = ` <div class="col-md-4 col-sm-6">
                                            <div class="product-grid2">
                                                <div class="product-image"><img class="pic-1" src=${product.path_image} alt="pic-1">
                                                    <ul class="like">
                                                        <li>  
                                                            <a data-tip=${tag} onclick='setFavorite(${product.id})' onmouseover="this.style.backgroundColor='${color}'";>
                                                                ${favs}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="product-content">
                                                    <h3 class="title">${product.description}</h3> <span class="price">ID ${product.id}</span>
                                                </div>
                                            </div>
                                        </div>`          
                document.getElementById(`products-${product.category.description}`).innerHTML += productElement;
            })
        });
    } catch (error) {
        console.log(error)
        alert('Não foi possível acessar nosso catálogo!')
    }
}

async function getCategories() {
    try {
        const options = {
            headers: new Headers({"authorization-token": getCookie("authorization-token")}),
        }
        await fetch('http://localhost:3000/user/listCategories', options).then(res => {
            return res.json()
        }).then(json => {
            let categoriesElements = '';
            let categories = json;
            
            categories.forEach(category => {
                let categoriesElement = `<a class="dropdown-item" href="#${category.description}">${category.description}</a>`
                categoriesElements += categoriesElement;
            });
            document.getElementById("filters").innerHTML = categoriesElements;

            categoriesElements = '';
            categories.forEach((category) => {
                let categoriesElement = `<div id="${category.description}" class="card text-center border-secondary mb-4">
                                            <div class="card-header text-white bg-secondary mb-3" ">
                                                <h4>${category.description}</h4>
                                            </div>
                                            <div class="row" id="products-${category.description}">

                                            </div>
                                        </div>`
                categoriesElements += categoriesElement;
            })
            
            document.getElementById("catalogo").innerHTML = categoriesElements;
        });
    } catch (error) {
        console.log(error)
    }
}