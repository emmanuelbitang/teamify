/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Member from '../Members';
import LoadSpinner from '../LoadSpinner';

import './Home.css';

function Home() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        setMembers(res.data);
        setIsLoaded(false);
      })
      .catch((error) => alert(error));
    return () => ac.abort();
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredMembers = members.filter((member) => {
    return Object.keys(member).some(
      (key) =>
        (typeof member[key] === 'string' &&
          member[key].toLowerCase().includes(search.toLowerCase())) ||
        !search
    );
  });

  return (
    <div>
      <div className="topnav">
        <a href=".">Teamify</a>
        <div className="search-container">
          <form>
            <input
              type="text"
              placeholder="Search via name or email..."
              name="search"
              onChange={handleChange}
              title="search"
              data-testid="search-textbox"
            />
          </form>
        </div>
      </div>

      <h1 className="title">Team Members</h1>

      {isLoaded ? (
        <LoadSpinner />
      ) : filteredMembers.length > 0 ? (
        <div className="cards">
          {filteredMembers.map((team) => {
            return (
              <Member
                key={team.id}
                name={team.name}
                username={team.username}
                email={team.email}
                phone={team.phone}
                website={team.website}
                street={team.address.street}
                suite={team.address.suite}
                city={team.address.city}
                zipcode={team.address.zipcode}
                company={team.company.name}
              />
            );
          })}
        </div>
      ) : (
        <div className="no-result" data-testid="no-result">
          No results found for
          <b>{search}</b>
        </div>
      )}
    </div>
  );
}

export default Home;
