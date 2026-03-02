let products = [
    { id: "P01", name: "Laptop MacBook Pro M3", price: 2000, category: "Laptop", inStock: true },
    { id: "P02", name: "Chuot không day Logitech", price: 45, category: "Phụ kiện", inStock: true },
    { id: "P03", name: "Ban phím cơ Keychron", price: 95, category: "Phụ kiện", inStock: false },
    { id: "P04", name: "Man hinh Dell UltraSharp", price: 450, category: "Man hinh", inStock: true },
    { id: "P05", name: "Tai nghe Sony WH-1000XM5", price: 350, category: "Phụ kiện", inStock: true }
];


const filterProducts = (listProducts) => {
    let newListProducts = listProducts.filter((product) => {
        return product.inStock == true;
    });

    let sortByPrice = (a,b) => {
        return b.price - a.price;
    } 
    newListProducts.sort(sortByPrice);
    console.log(newListProducts);
}

filterProducts(products);

const filterByCatgory = (listProducts) => {
    let newListProducts = listProducts.filter((product) => {
        return product.category == "Phụ kiện"
    });
    let newArray = [];
    newListProducts.forEach((product) => {
        newArray.push(product.name);
    })
    console.log(newArray);
}

filterByCatgory(products);

const totalPriceProduct = (listProducts) => {
    let newListProducts = listProducts.filter((product) => {
        return product.inStock == true;
    });
    let result = newListProducts.reduce((acc, product) => {
        return (acc + product.price);
    }, 0);
    console.log(`Tổng giá trị bằng tiền của các mặt hàng còn trong kho ${result}`);
};

totalPriceProduct(products);