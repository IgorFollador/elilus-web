var imported = document.createElement('script');
imported.src = 'script.js';
document.head.appendChild(imported);

document.addEventListener('DOMContentLoaded', () => {
    getCatalogo();
})

async function getCatalogo() {
    try {
        const options = {
            headers: new Headers({"authorization-token": getCookie("authorization-token")}),
        }
        await fetch('http://localhost:3000/user/list', options).then(res => {
            return res.json()
        }).then(json => {

            let productElements = '';
            let fav = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>`
            let products = json;
            
            products.forEach((product) => {
                console.log(products);
                if(products.fav) fav = `<i class="fa fa-thumbs-down" aria-hidden="true"></i>`
                let productElement = ` <div class="col-md-4 col-sm-6">
                                            <div class="product-grid2">
                                                <div class="product-image2"><img class="pic-1" src=${product.path_image} alt="pic-1">
                                                    <ul class="like">
                                                        <li>  
                                                            <a data-tip="Add aos favoritos"onclick='setFavorite(${product.id})' href="#">
                                                                ${fav}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="product-content">
                                                    <h3 class="title">${product.description}</h3> <span class="price">ID ${product.id}</span>
                                                </div>
                                            </div>
                                        </div>`
                productElements += productElement;
            })
            
            document.getElementById("products").innerHTML = productElements;
        });
    } catch (error) {
        console.log(error)
        alert('Não foi possível acessar nosso catálogo!')
    }
}