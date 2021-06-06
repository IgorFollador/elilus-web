document.addEventListener('DOMContentLoaded', () =>{
    getCatalogo();
})

async function getCatalogo() {    
    try {
        await fetch('http://localhost:3000/user/list').then(res => {
        return res.json()  
        }).then(json => {

            let productElements = '';

            let products = json;
            products.forEach((product)=>{
                let productElement =  ` <div class="col-md-4 col-sm-6">
                                            <div class="product-grid2">
                                                <div class="product-image2"><img class="pic-1" src=${product.path_image} alt="pic-1">
                                                    <ul class="like">
                                                        <li>
                                                            <form method="POST" id="formSetFav-${product.id}">
                                                                <input id="id_product" class="d-none" value="${product.id}" readonly>
                                                                <a class="btnSetFav" data-tip="Add aos favoritos" href="#">
                                                                    <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                                                                </a>
                                                            </form>
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
        let btnSetFav = document.querySelector(".btnSetFav");
        let id_product = document.querySelector("#id_product");
        btnSetFav.addEventListener('click', function() {
            let objFav = {
                "id_product": id_product.value
            };
            console.log(objFav);
            sendFav(objFav);
            document.querySelector("body").style.cursor = 'progress';
            
        });

        function sendFav(obj) {
            const options = {
                method: "POST",
                headers: new Headers({
                    "content-type": "application/json",
                    "authorization-token": getCookie("authorization-token"),
                }),
                body: JSON.stringify(obj)
            }
        
            fetch("http://localhost:3000/user/setFavorites", options).then(res =>{

                alert("Produto adicionado!")
                //location.reload();
            }).catch(error=>{
                console.log(error);
                alert("Não foi possível favoritar!");
            });
        }
        
    } catch (error) {
        console.log(error)
        alert('Não foi possível acessar nosso catálogo!')
    }
}

function sendfav(obj) {
    console.log(obj);
    const options = {
        method: "POST",
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(obj)
    }

    fetch("http://localhost:3000/user/setFavorites", options).then(res =>{
        var authorization = res.headers.get('authorization-token');
        setCookie("authorization-token",authorization);
        alert("Produto adicionado!")
        //location.reload();
    }).catch(error=>{
        console.log(error);
        alert("Não foi possível favoritar!");
    });
}
