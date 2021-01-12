import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Divider from './Divider';
import Header from './Header';
import EditUserProfile from './EditUserProfile';
import DailyNeedsLoggedIn from './DailyNeedsLoggedIn';
import { Context } from '../Store';

function UserProfile(props) {
  const [globalState, setGlobalState] = useContext(Context);
  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (props.cookies.get('token')) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    if (globalState.refetch) {
      if (typeof props.cookies.get('user') !== 'undefined') {
        fetchUser();
      } else {
        setUser({});
        setUserProfile({});
        setMsg('');
        setGlobalState({ refetch: false });
        props.history.push(`/`);
      }
    }
  });

  const handleLoadUserProfile = (userProfile) => {
    setUserProfile(userProfile);
  };

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
        getBmiMsg(res.user_profile[0].bmi);
        setGlobalState({ refetch: false });
      })
      .catch((error) => console.log(error));
  };

  const getBmiMsg = (bmi) => {
    if (bmi < 18.5) {
      setMsg('(underweight)');
    } else if (18.5 <= bmi && bmi <= 24.9) {
      setMsg('(correct BMI)');
    } else if (25 <= bmi && bmi <= 29.9) {
      setMsg('(overweight)');
    } else {
      setMsg('(obese)');
    }
  };

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
            <p className="bolder-text">Age: {userProfile.age}</p>
            <p className="bolder-text">Gender: {userProfile.gender}</p>
            <p className="bolder-text">Height: {userProfile.height}</p>
            <p className="bolder-text">Weight: {userProfile.weight}</p>
            <p className="bolder-text">
              BMI: {userProfile.bmi} {msg}
            </p>

            <p className="bolder-text">
              Daily caloric needs: {userProfile.daily_cal}
            </p>

            <p className="bolder-text">
              Trainings number: {userProfile.trainings_number}
            </p>
            <p className="bolder-text">
              All kilometers run: {userProfile.kilometers_run}
            </p>
            <Link to={`/trainings`}>
              See your trainings
              <i
                style={{ paddingLeft: '5px' }}
                className="fas fa-angle-double-right"
              ></i>
            </Link>
          </div>
          <div className="col s12 m4">
            <br />
            <a
              href="#edit-user-profile"
              className="modal-trigger btn cyan accent-3 waves-effect waves-dark black-text"
            >
              Edit
            </a>
            <a
              href="#daily-needs-logged-in"
              className="modal-trigger btn cyan accent-3 waves-effect waves-dark black-text"
            >
              Caloric Needs
            </a>
            <br />
          </div>
        </div>
      </div>
      <br />

      <EditUserProfile
        cookies={props.cookies}
        user={user}
        userProfile={userProfile}
        onLoadUserProfile={handleLoadUserProfile}
      />
      <DailyNeedsLoggedIn
        cookies={props.cookies}
        userProfile={userProfile}
        onLoadUserProfile={handleLoadUserProfile}
      />
    </section>
  );
}

export default withRouter(UserProfile);
