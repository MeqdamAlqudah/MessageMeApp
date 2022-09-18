import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classes from './style.module.css';

const Account = () => {
  const [profileInfo, setProfileInfo] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (!profileInfo.length) {
      fetch(`/v1/users/${id}`).then((response) => response.json()).then((json) => {
        setProfileInfo((prev) => [...prev, ...Object.entries(json.userInfo)]);
      });
    }
  }, []);
  if (!profileInfo.length) {
    return (
      <>
        <h1>User Profile</h1>
        <p>Loading....</p>
      </>
    );
  }
  return (
    <div className={classes.profileContainer}>
      <h1>User Profile</h1>
      <ul>
        { profileInfo.map((element) => (
          <li key={uuidv4()}>
            {element[0]}
            {' '}
            {element[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Account;
