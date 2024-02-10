import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";

function Search() {
  // Constantes
  const [user, setUser] = useState('');
  const [data, setData] = useState([]);

  const handleInputChange = (event) => {
    setUser(event.target.value);
  };


  const searchUsers = async () => {
    let res = await axios.get(`https://api.github.com/search/users?q=${user}`);
    setData(res.data.items);
  };

  const getUserRepos = async (username) => {
    window.open(`https://github.com/${username}?tab=repositories`, '_blank');
  };

  const getUserBio = (username) => {
    return axios.get(`https://api.github.com/users/${username}`)
      .then(res => {
        if (res.data.bio) {
          Swal.fire({
            text: res.data.bio,
            confirmButtonText: 'Fechar',
          });
        } else {
          Swal.fire({
            text: 'Usuário não possui bio cadastrada',
            confirmButtonText: 'Fechar',
          });
        }
      });
  }

  // O site
  return (
    <div>

      <input className='Search' value={user} onChange={handleInputChange} />
      <br></br><br></br>
      <button className='Button' onClick={searchUsers}>Pesquisar<br></br></button>
      <br /><br />
      <div className='Lista'>
        {data.map((user) => (
          <li key={user.id}>
            <div className='Users'>
              <h2 className='UserName'>{user.login}</h2>
              <img src={user.avatar_url} />
              <br /><br />
              <button className='Button' onClick={() => getUserRepos(user.login)}>Repositórios de {user.login}</button>
              <br /><br />
              <button className='Button' onClick={() => getUserBio(user.login)}>Ver bio de {user.login}</button>
              <br /><br />
            </div>
            <br /><br /><br /><br /><br />
          </li>
        ))}
      </div>
    </div>
  );
}

export default Search;