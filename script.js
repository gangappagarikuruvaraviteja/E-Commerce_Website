function loadcategories() {
    fetch("https://fakestoreapi.com/products/categories")
        .then(function(response) {
            return response.json();
        })
        .then(function(categories) {
            categories.unshift("All");
            for (var x of categories) {
                var option = document.createElement('option');
                option.text = x;
                document.getElementById('1sCategories').appendChild(option);
            }
        })
}

function loadproducts(url) {
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(products) {
            document.querySelector('main').innerHTML = "";
            for (var product of products) {
                var div = document.createElement("div");
                div.className = 'card p-2 m-2'
                div.style.width = "200px"
                div.innerHTML = `
                        <img src=${product.image} height="160">
                        <div class="card-header style="height:140px"><p>${product.title}</p></div>
                        <div class="card-body">
                        <dl>
                            <dt>Price</dt>
                            <dd>${product.price}</dd>
                            <dt> Rating</dt>
                            <dd> <span class="bi bi-star-fill text-success"></span>${product.rating.rate}</dd>
                        </dl> 
                        </div>
                        <div class="card-footer">
                            
                            <button onclick="addclick(${product.id})" class="btn btn-danger w-100">Add Cart <span class="bi bi-cart4"> </span></button>
                            
                            </div>
                        
                        
                        `;
                document.querySelector('main').appendChild(div);
            }
        })
}

function bodyload() {
    loadcategories();
    loadproducts("https://fakestoreapi.com/products");
}

function categorychange() {
    var categoryname = document.getElementById("1sCategories").value;
    if (categoryname === "All") {
        loadproducts("https://fakestoreapi.com/products")


    } else {
        loadproducts(`https://fakestoreapi.com/products/category/${categoryname}`);
    }
}

function navClicked(categoryname) {

    if (categoryname === "All") {
        loadproducts("https://fakestoreapi.com/products")


    } else {
        loadproducts(`https://fakestoreapi.com/products/category/${categoryname}`);
    }
}
var cartitems = [];

function getcartitemscount() {
    document.getElementById("lblcount").innerHTML = cartitems.length;

}

function addclick(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(function(response) {
            return response.json()
        })

    .then(function(product) {
        cartitems.push(product);
        alert(`${product.title}\nadded to cart`)
        getcartitemscount();
    })
}

function showcartclick() {
    var tbody = document.querySelector('tbody')
    tbody.innerHTML = "";
    for (var item of cartitems) {

        var tr = document.createElement('tr');
        var tdname = document.createElement("td");
        var tdprice = document.createElement("td");
        var tdpreview = document.createElement('td');
        tdname.innerHTML = item.title;
        tr.appendChild(tdname);
        tdprice.innerHTML = item.price;
        tr.appendChild(tdprice)
        tdpreview.innerHTML = `<img src=${item.image} width="40" height="39">`;
        tr.appendChild(tdpreview);
        document.querySelector('tbody').appendChild(tr);
    }
}

function paynow() {
    var total = 0;
    for (var item of cartitems) {
        total += item.price;

    }
    var options = {
        "key": "rzp_test_1DP5mmOlF5G5ag", // Test Key
        "amount": total * 100, // Amount in paise
        "currency": "INR",
        "name": "coding brains Store",
        "description": "Test Transaction",
        "handler": function(response) {
            alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
            cartItems = [];
            GetCartItemsCount();
            document.querySelector("tbody").innerHTML = "";


            document.querySelector("tbody").innerHTML = "";
        },
        "prefill": {
            "name": "Test User",
            "email": "test@example.com",
            "contact": "9999999999"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}