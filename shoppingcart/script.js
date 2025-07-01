let products = [];
let displayed = 0;
const limit = 5;

const productList = document.getElementById('product-list');
const loadMoreBtn = document.getElementById('load-more');
const searchInput = document.getElementById('search');
let productDetail = document.getElementById('product-detail');
let backBtn;


fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts();
  });

function renderProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = products.slice(0, displayed + limit).filter(p => p.title.toLowerCase().includes(searchTerm));

  productList.innerHTML = '';
  if (filtered.length === 0) {
    productList.innerHTML = '<p>No products found</p>';
    return;
  }

  filtered.forEach(product => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h4>${product.title}</h4>
      <p>$${product.price}</p>
    `;
    div.onclick = () => showProductDetail(product.id);
    productList.appendChild(div);
  });

  if (displayed + limit >= products.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

loadMoreBtn.addEventListener('click', () => {
  displayed += limit;
  renderProducts();
});

searchInput.addEventListener('input', () => {
  displayed = 0;
  renderProducts();
});

function showProductDetail(id) {
  document.querySelector('.container').style.display = 'none';
  productDetail.style.display = 'block';

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(product => {
      productDetail.innerHTML = `
        <button id="back-btn" style="margin-bottom:20px;">Back to Products</button>
        <h2>${product.title}</h2>
        <img src="${product.image}" alt="${product.title}" style="width:150px;height:150px;object-fit:contain;">
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p>${product.description}</p>
      `;
      document.getElementById('back-btn').onclick = () => {
        productDetail.style.display = 'none';
        document.querySelector('.container').style.display = 'block';
      };
    });
}