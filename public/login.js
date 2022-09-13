
const btnLogin = document.querySelector(".btn.btn-primary");
const loginFunc = async (e) => {
    e.preventDefault();
    const username = document.querySelector(".username").value;
    const password = document.querySelector(".password").value;
    const data = {
        username,
        password
    }

    try {
        const res = await axios.post(`http://localhost:3000/api/v1/login`, data)
        // Cookies.set('token', res.data.token)
    } catch (error) {
        console.log(error);
    }
};

btnLogin.onclick = loginFunc;
