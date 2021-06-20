var imported = document.createElement("script");
imported.src = "script.js";
document.head.appendChild(imported);

document.addEventListener("DOMContentLoaded", () => {
    getCatalogo();
})

async function getCatalogo() {
    try {
        const options = {
            headers: new Headers({ "authorization_token": getCookie("authorization_token") }),
        }
        await fetch("http://localhost:3000/user/getFavorites", options).then(res => {
            return res.json()
        }).then(json => {

            let productElements = '';
            let products = json;
            products.forEach((product) => {
                let productElement = ` <div class="col-md-4 col-sm-6">
                                            <div class="product-grid2">
                                                <div class="product-image2"><img class="pic-1" src=${product.product.path_image} alt="pic-1">
                                                    <ul class="like">
                                                        <li>  
                                                            <a data-tip="Remover favorito" onclick='setFavorite(${product.product.id})' href="#">
                                                                <i class="fa fa-thumbs-down" aria-hidden="true"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="product-content">
                                                    <h3 class="title">${product.product.description}</h3> <span class="price">ID ${product.product.id}</span>
                                                </div>
                                            </div>
                                        </div>`
                productElements += productElement;
            })

            if (Object.keys(json).length) {
                document.getElementById("products").innerHTML = productElements;                
            } else { 
                document.getElementById("products").innerHTML = `<div class="d-flex justify-content-center" style="witdh:100%; heigth: auto;">
                                                                    <img src="../img/not_found_favorites.png" style="min-width:250px; max-width:600px; heigth: auto;" />
                                                                </div>`;
            }
        })
    } catch (error) {
        console.log(error);
        if(!auth) {
            alert("Usuário não conectado!");
            return window.location.replace("http://localhost:3000");
        }
        alert("Não foi possível acessar seus favoritos!")
    }
}
