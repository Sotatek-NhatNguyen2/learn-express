let currentpage = 1
let total = null

const content = document.querySelector(".body_table");
const pagination = document.querySelector(".pagination");

const getData = async (asset, limit) => {
    const res = await axios.get(`http://localhost:3000/api/v1/account?asset=${asset}&limit=${limit}`);
    const html = res.data.data.map((item, index) => (
        `<tr>
            <th scope="row">${index + 1}</th>
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