document.addEventListener('DOMContentLoaded', () =>{
    getCatalogo();
})

function getCookie(name) {
    var cookies = document.cookie;
    var prefix = name + "=";
    var begin = cookies.indexOf("; " + prefix);
 
    if (begin == -1) {
        begin = cookies.indexOf(prefix);
        if (begin != 0) return null;
    } else begin += 2;
 
    var end = cookies.indexOf(";", begin);
     
    if (end == -1) end = cookies.length;
 
    return unescape(cookies.substring(begin + prefix.length, end));
}

async function getCatalogo() {    
    try {
        const options = {
            headers: new Headers({"authorization-token": getCookie("authorization-token")}),
        }
        await fetch('http://localhost:3000/user/getFavorites', options).then(res => {
        return res.json()  
        }).then(json => {

            let productElements = '';

            let products = json;
            products.forEach((product)=>{
                let productElement =  ` <div class="col-md-4 col-sm-6">
                                            <div class="product-grid2">
                                                <div class="product-image2"><img class="pic-1" src=${product.product.path_image} alt="pic-1">
                                                    <ul class="like">
                                                        <li><a id=favid-${product.id} href="#" data-tip="Add aos favoritos"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a></li>
                                                    </ul>
                                                </div>
                                                <div class="product-content">
                                                    <h3 class="title">${product.product.description}</h3> <span class="price">ID ${product.product.id}</span>
                                                </div>
                                            </div>
                                        </div>`
                productElements += productElement;
            })

            document.getElementById("products").innerHTML = productElements;
        })
    } catch (error) {
        console.log(error)
        alert('Não foi possível acessar nosso catálogo!')
    }
}
