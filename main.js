var ProductNameInput = document.getElementById('ProductName');
var ProductPriceInput = document.getElementById('ProductPrice');
var ProductCategoryInput = document.getElementById('ProductCategory');
var ProductDescriptionInput = document.getElementById('ProductDescription');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var searchBar = document.getElementById('searchBar');
var nameMessage = document.getElementById('nameMessage');
var priceMessage = document.getElementById('priceMessage');

addBtn.addEventListener('click', function () { addProduct() });
updateBtn.addEventListener('click', function () { updateProduct() });
searchBar.addEventListener('input', function () { searchProducts(this.value) });


var productsContainer = [];
if (localStorage.getItem('products') != null) {
    productsContainer = JSON.parse(localStorage.getItem('products'));
    display(productsContainer);
}
function addProduct() {
    if (nameValidation() == true && priceValidation() == true) {
        product =
        {
            name: ProductNameInput.value,
            price: ProductPriceInput.value,
            category: ProductCategoryInput.value,
            description: ProductDescriptionInput.value,
            priceAfterTax: Number(ProductPriceInput.value*0.1) + Number(ProductPriceInput.value),
        }
        productsContainer.push(product);
        localStorage.setItem('products', JSON.stringify(productsContainer))
        display(productsContainer);
        clearForm();
        nameMessage.classList.replace('d-block', 'd-none');
        priceMessage.classList.replace('d-block', 'd-none');
        ProductNameInput.classList.remove('is-valid');
        ProductNameInput.classList.remove('is-invalid');
        ProductPriceInput.classList.remove('is-valid');
        ProductPriceInput.classList.remove('is-invalid');
    }

}


function display(list) {
    var box = ``;
    for (var i = 0; i < list.length; i++) {
        box +=
            `<tr>
            <td>${i + 1}</td>
            <td>${list[i].name}</td>
            <td>${list[i].price}</td>
            <th>${list[i].priceAfterTax}</th>
            <td>${list[i].category}</td>
            <td>${list[i].description}</td>
            <td><button onclick="setForUpdate(${i})" class="btn btn-sm btn-success">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-sm btn-danger">Delete</button></td>
        </tr>`
    }
    document.getElementById('tableBody').innerHTML = box;
}

function clearForm() {
    ProductNameInput.value = '';
    ProductPriceInput.value = '';
    ProductCategoryInput.value = '';
    ProductDescriptionInput.value = '';
}

function deleteProduct(index) {
    productsContainer.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(productsContainer))
    display(productsContainer);
}

function searchProducts(term) {
    var matchedProducts = [];
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            matchedProducts.push(productsContainer[i]);
        }
    }
    display(matchedProducts);
}

var globalIndex;
function setForUpdate(index) {
    addBtn.classList.replace('d-block', 'd-none');
    updateBtn.classList.replace('d-none', 'd-block');
    globalIndex = index;
    ProductNameInput.value = productsContainer[index].name;
    ProductPriceInput.value = productsContainer[index].price;
    ProductCategoryInput.value = productsContainer[index].category;
    ProductDescriptionInput.value = productsContainer[index].description;
}

function updateProduct() {
    if (nameValidation() == true && priceValidation() == true) {
        addBtn.classList.replace('d-none', 'd-block');
        updateBtn.classList.replace('d-block', 'd-none');
        productsContainer[globalIndex].name = ProductNameInput.value;
        productsContainer[globalIndex].price = ProductPriceInput.value;
        productsContainer[globalIndex].category = ProductCategoryInput.value;
        productsContainer[globalIndex].description = ProductDescriptionInput.value;
        productsContainer[globalIndex].priceAfterTax = Number(ProductPriceInput.value*0.1) + Number(ProductPriceInput.value)
        display(productsContainer);
        clearForm();
        localStorage.setItem('products', JSON.stringify(productsContainer));
        nameMessage.classList.replace('d-block', 'd-none');
        priceMessage.classList.replace('d-block', 'd-none');
        ProductNameInput.classList.remove('is-valid');
        ProductNameInput.classList.remove('is-invalid');
        ProductPriceInput.classList.remove('is-valid');
        ProductPriceInput.classList.remove('is-invalid');
    }
}

function nameValidation() {
    var regex = /^[A-Z][a-z]{1,10}$/;
    if (regex.test(ProductNameInput.value) == true && ProductNameInput.value != '') {
        ProductNameInput.classList.add('is-valid');
        ProductNameInput.classList.remove('is-invalid');
        nameMessage.classList.replace('d-block', 'd-none');
        return true;
    }
    else {
        ProductNameInput.classList.add('is-invalid');
        ProductNameInput.classList.remove('is-valid');
        nameMessage.classList.replace('d-none', 'd-block');
    }
}
function priceValidation() {
    var regex = /^\d{0,8}[.]?\d{1,4}$/;
    if (regex.test(ProductPriceInput.value) == true && ProductPriceInput!='') {
        ProductPriceInput.classList.add('is-valid');
        ProductPriceInput.classList.remove('is-invalid');
        priceMessage.classList.replace('d-block', 'd-none');
        return true;
    }
    else {
        ProductPriceInput.classList.add('is-invalid');
        ProductPriceInput.classList.remove('is-valid');
        priceMessage.classList.replace('d-none', 'd-block');
    }
}