import React, { useState } from 'react';
import axios from "axios";


function UserSearch() {
  const [user, setUser] = useState('');
  const [data, setData] = useState([]);

  const handleInputChange = (event) => {
    setUser(event.target.value);

  };

  const searchUsers = async () => {
    try {
      axios.get(`https://api.github.com/search/users?q=${user}`)
      .then((res) => setData(res.data.items));
    } catch (error) {
      console.error('Erro ao procurar usuários:', error);
    }
  };
  const getUserRepos = (username) => {
    window.open(`https://github.com/${username}?tab=repositories`, '_blank');
  };
  

  return (
    <div>

      <input
        type="text"
        placeholder="Pesquise por Usuários"
        value={user}
        onChange={handleInputChange}
      />
      <br></br><br></br>
      <button onClick={searchUsers}>Pesquisar<br></br></button>
      <br /><br />
      <div className='Lista'>
        {data.map((user) => (
          <li key={user.id}>
            <div className='Users'>
            <h2 className='UserName'>{user.login}</h2>
            <img src={user.avatar_url}/>
            <br /><br />
            <button className='UserButton' onClick={() => getUserRepos(user.login)}>Repositórios de {user.login}</button>
            </div>
            <br /><br /><br />
          </li>
        ))}
      </div>
    </div>
  );
}

export default UserSearch;