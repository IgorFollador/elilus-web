document.addEventListener('DOMContentLoaded', () =>{
    getCatalogo();
})

async function getCatalogo() {    
    try {
        await fetch('http://localhost:3000/user/favorites').then(res => {
        return res.json()  
        }).then(json => {

            let productElements = '';

            let fav = json;
            fav.forEach((product)=>{
                let productElement =  ` <div class="col-md-4 col-sm-6">
                                            <div class="product-grid2">
                                                <div class="product-image2"><img class="pic-1" src=${fav.product.path_image} alt="pic-1">
                                                    <ul class="like">
                                                        <li><a href="#" data-tip="Add aos favoritos"><i class="fa fa-thumbs-up" aria-hidden="true"></i></a></li>
                                                    </ul>
                                                </div>
                                                <div class="product-content">
                                                    <h3 class="title">${fav.product.description}</h3> <span class="price">ID ${fav.product.id}</span>
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
