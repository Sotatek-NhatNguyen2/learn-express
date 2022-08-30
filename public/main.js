let currentpage = 1
let total = null

const content = document.querySelector(".body_table");
const pagination = document.querySelector(".pagination");

axios.get(`http://localhost:3000/api/v1/account`) 
    .then(data => data.data)
    .then(data => total = data.total)
    .then(() => {
        numPage = Math.ceil(total / 2)
        const arr = Array.from(Array(numPage).keys())
        const html = arr.map((item, index) => (
            `<li class="page-item">
                <span onclick=clickPage(item + 1)" class="page-link">${item + 1}</span>
            </li>`
        ));
        pagination.innerHTML = html.join('')
    })

const getData = async (asset, limit) => {
    const data = await axios.get(`http://localhost:3000/api/v1/account?asset=${asset}&limit=${limit}`);
    const html = data.data.map((item, index) => (
        `<tr>
            <th scope="row">${index}</th>
            <td>${item.username}</td>
            <td>${item.password}</td>
            <td>${item.role}</td>
        </tr>`
    ));

    content.innerHTML = html.join('')
};


const clickPage = (page) => {
    const limit = 2;
    const asset = (page - 1) * 2;

    console.log(asset, limit);
    
    getData(asset, limit);

    currentpage = page
}

const nextPage = () => {
    currentpage += 1;
    const limit = 2;
    const asset = (currentpage - 1) * 2;

    getData(asset, limit);
}

const prePage = () => {
    currentpage -= 1;
    const limit = 2;
    const asset = (currentpage - 1) * 2;

    getData(asset, limit);
}

// clickPage(1)