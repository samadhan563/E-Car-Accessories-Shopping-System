import axios from 'axios';
const PRODUCT_BASE_API_URL = 'http://localhost:8080/product'
class ProductServices {
    getProduct() {
        return axios.get(PRODUCT_BASE_API_URL + '/show');

    }
    
    createProductByCategory(product, catName) {
        return axios.post(PRODUCT_BASE_API_URL + "/add-by-cat-name/" + catName, product);
    }
    createProduct(product, catId) {
        return axios.post(PRODUCT_BASE_API_URL + "/add/" + catId, product);
    }
    getProductById(productId) {
        return axios.get(PRODUCT_BASE_API_URL + "/show/" + productId);
    }
    deleteProduct(productId) {
        return axios.delete(PRODUCT_BASE_API_URL + "/delete/" + productId);
    }
    updateProduct(product, productId) {
        return axios.put(PRODUCT_BASE_API_URL + "/update/" + productId, product);
    }
    fetchProductsByCategoryId(categoryId) {
        return axios.get(PRODUCT_BASE_API_URL + '/list/' + categoryId);
    }

    addProductFile(productName, productImage) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post('http://localhost:8080/customers/image/upload/' + productName, productImage, config);
    }
    getProductFile(productName) {
        const config = {
            headers: {
                'content-type': 'image/jpeg'
            }
        }
        return axios.get('http://localhost:8080/customers/image/download1/' + productName ,config);
    }
}
export default new ProductServices();

