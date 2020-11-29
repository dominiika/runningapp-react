import React, { useEffect, useState } from 'react';
import Divider from './Divider';
import Header from './Header';

function UserProfile(props) {
  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    if (props.cookies.get('token')) {
      fetchUser();
    }
  }, []);

  const fetchUser = () => {
    console.log('fetched  detail');
    fetch(`http://127.0.0.1:5000/users/${props.cookies.get('user')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.cookies.get('token')}`,
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        setUser(res);
        setUserProfile(res.user_profile[0]);
        // setGlobalState({ didLogIn: false, didLogOut: false, refetch: false });
      })
      .catch((error) => console.log(error));
  };

  console.log('user', user);
  console.log('user profile', userProfile);
  return (
    <section className="section-user-profile">
      <Header />
      <Divider />
      <div className="container">
        <h2 className="center">Your profile</h2>
        <div className="divider"></div>
        <div className="row">
          <div className="col s12 m8">
            <p className="bolder-text">Username: {user.username}</p>
            <p className="bolder-text">Gender: {userProfile.gender}</p>
            <p className="bolder-text">Height: {userProfile.height}</p>
            <p className="bolder-text">Weight: {userProfile.weight}</p>
            {userProfile.bmi !== 0 && (
              <p className="bolder-text">BMI: {userProfile.bmi}</p>
            )}
            {userProfile.daily_cal !== 0 && (
              <p className="bolder-text">
                Daily caloric needs: {userProfile.daily_cal}
              </p>
            )}
            <p className="bolder-text">
              Trainings number: {userProfile.trainings_number}
            </p>
            <p className="bolder-text">
              All kilometers run: {userProfile.kilometers_run}
            </p>
          </div>
          <div className="col s12 m4">
            <br />

            <button className="btn cyan accent-3 waves-effect waves-dark black-text">
              Get daily caloric needs
            </button>
            <button className="btn cyan accent-3 waves-effect waves-dark black-text">
              Get BMI
            </button>
          </div>
        </div>
      </div>
      <br />
    </section>
  );
}

export default UserProfile;
