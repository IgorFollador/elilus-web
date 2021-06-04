document.addEventListener('DOMContentLoaded', () =>{
    getCatalogo();
})

async function getCatalogo() {    
    try {
        await fetch('http://localhost:3000/user/list').then(res => {
        return res.json()  
        }).then(json => {
            console.log(json);

            let productElements = '';

            let products = json;
            products.forEach((product)=>{
                let productElement =  ` <div class="col-md-4 col-sm-6">
                                            <div class="product-grid2">
                                                <div class="product-image2"><img class="pic-1" src=${product.path_image} alt="pic-1">
                                                    <ul class="like">
                                                        <li><a href="#" data-tip="Add aos favoritos"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a></li>
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
        })
    } catch (error) {
        console.log(error)
        alert('Não foi possível acessar nosso catálogo!')
    }
}
