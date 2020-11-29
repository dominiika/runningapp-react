import React, { useEffect } from 'react';
import Divider from './Divider';
import Header from './Header';

function UserProfile(props) {
  return (
    <section className="section-user-profile">
      <Header />
      <Divider />
      <h2 className="center">Your profile</h2>
      <div className="divider"></div>
      <br />
    </section>
  );
}

export default UserProfile;
