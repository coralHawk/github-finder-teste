import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";
// import { invoke } from '@tauri-apps/api';

 
function Search() {
  const [user, setUser] = useState('');
  const [data, setData] = useState([]);

  const handleInputChange = (event) => {
    setUser(event.target.value);
  };


  const searchUsers = async () => {
    const res = await axios.get(`https://api.github.com/search/users?q=${user}`);
    setData(res.data.items);
  };

  const getUserRepos = async (username) => {
    const url = `https://github.com/${username}?tab=repositories`
    // Código para webApp, ainda não funciona no app em si
    // if (window.__TAURI__) {
    //    await invoke('shell::open', url);
    //  } else {
      // Rodar no browser
      window.open(url, '_blank');
    // }
  };

  const getUserBio = (username) => {
    return axios.get(`https://api.github.com/users/${username}`)
      .then(res => {
        if (res.data.bio) {
          Swal.fire({
            text: res.data.bio,
            textColor: 'lavender',
            background: '#1E1E2E',
            confirmButtonText: 'Fechar',
            customClass: { 
              text: 'texto',
            } 
          });
        } else {
          Swal.fire({
            text: 'Usuário não possui bio cadastrada',
            background: '#1E1E2E',
            confirmButtonText: 'Fechar',
            customClass: { 
              text: 'texto',
            } 
          
          });
        }
      });
  }

  return (
    <div>
      <input
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
              <img src={user.avatar_url} />
              <br /><br />
              <button className='UserButton' onClick={() => getUserRepos(user.login)}>Repositórios de {user.login}</button>
              <button className='UserButton' onClick={() => getUserBio(user.login)}>Ver bio de {user.login}</button>
            </div>
            <br /><br /><br />
          </li>
        ))}
      </div>
    </div>
  );
}

export default Search;