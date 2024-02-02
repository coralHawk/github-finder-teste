import React, { useState } from 'react';
import axios from "axios";


function UserSearch() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const searchUsers = async () => {
    try {
      axios.get(`https://api.github.com/search/users?q=${query}`)
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
        value={query}
        onChange={handleInputChange}
      />
      <br></br><br></br>
      <button onClick={searchUsers}>Pesquisar<br></br></button>
      <br /><br />
      <div className='Lista'>
        {data.map((user) => (
          <li key={user.id}>
            <div className='Users'>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" >
                <img src={user.avatar_url}/>
                <br />
            </a>
            <button className='UserButton' onClick={() => getUserRepos(user.login)}>Repositórios de {user.login}</button>
            </div>
            <br />
          </li>
        ))}
      </div>
    </div>
  );
}

export default UserSearch;