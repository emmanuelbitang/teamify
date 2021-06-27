/* eslint-disable */
import React from 'react';
import './Members.css';

const Member = ({
  name,
  username,
  email,
  phone,
  website,
  street,
  suite,
  city,
  zipcode,
  company,
}) => {
  return (
    <div className="cards">
      <div className="card">
        <img
          src="https://qph.fs.quoracdn.net/main-qimg-2b21b9dd05c757fe30231fac65b504dd"
          alt="Avatar"
        />
        <div className="container">
          <ul className="details">
            <li>
              <h1 data-testid="name">{name}</h1>
            </li>
            <li>Username: {username}</li>
            <li>
              Website:{' '}
              <a href={'http://' + website} target="_blank" rel="noreferrer">
                {website}
              </a>
            </li>
            <li>
              Email:{' '}
              <a href={'mailto:' + email} data-testid="email-link">
                {email}
              </a>
            </li>
            <li>
              Phone Number:{' '}
              <a href={'tel:' + phone} data-testid="phone-link">
                {phone}
              </a>
            </li>
            <li>Address: {`${suite} ${street}, ${city}, ${zipcode}`}</li>
            <li>Company: {company}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Member;
