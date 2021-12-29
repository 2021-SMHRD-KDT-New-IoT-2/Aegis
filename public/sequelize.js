async function getUser(){
    try{
        const res = await axios.get('/users');
        const users = res.data;
        console.log(users);
        
        const tbody = document.querySelector('#user-list tbody');
        tbody.innerHTML = '';
        users.map(function (user){
            const row = document.createElement('tr');
            let td = document.createElement('td');
            td.textContent = user.id;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.userId;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.userPw;
            row.appendChild(td);
            tbody.appendChild(row);
        });
    }catch(err){
        console.error(err);
    }
}