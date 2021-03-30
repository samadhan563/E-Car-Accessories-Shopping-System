import axios from 'axios';
const CATEGORY_BASE_API_URL = 'http://localhost:8080/category'
class CategoryServices {
    getCategory() {
        return axios.get(CATEGORY_BASE_API_URL+'/show');
    }
    createCategory(category) {
        return axios.post(CATEGORY_BASE_API_URL+"/add", category);
    }
    getCategoryById(categoryId) {
        return axios.get(CATEGORY_BASE_API_URL + "/show/" + categoryId);
    }
    updateCategory(category, categoryId) {
        return axios.put(CATEGORY_BASE_API_URL +"/"+ categoryId, category);
    }
    removeCategory (categoryId) {
        return axios.delete(CATEGORY_BASE_API_URL +"/delete/"+ categoryId);
    }
}
export default new CategoryServices();

