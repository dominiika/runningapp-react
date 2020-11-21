import React, { Component, useEffect, useState, useContext } from 'react';
import Training from './Training';
import Header from './Header';
import Divider from './Divider';
import { Context } from '../Store';

function TrainingsList(props) {
  const [globalState, setGlobalState] = useContext(Context);
  const [trainings, setTrainings] = useState([]);
  const [initialIsActive, setInitialIsActive] = useState(globalState.isActive);

  useEffect(() => {
    console.log('!!!!!!component did mount');
    console.log('token in cmount', props.cookies.get('token'));

    if (props.cookies.get('token')) {
      fetchTrainings();
    }
  }, []);

  useEffect(() => {
    if (globalState.refetch) {
      fetchTrainings();
    }
  });

  const fetchTrainings = () => {
    fetch(`http://127.0.0.1:5000/trainings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${props.cookies.get('token')}`,
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        setTrainings(res.trainings);
        setGlobalState({ refetch: false });
      })
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <Header title="Your trainings" />
      <Divider />
      <section>
        <div className="container">
          {trainings && trainings.length > 0 ? (
            <React.Fragment>
              {trainings.map((training) => {
                // return <p key={training.id}>{training.name}</p>;
                return (
                  <div key={training.id}>
                    <ul className="collection z-depth-2">
                      <li className="collection-item avatar">
                        <Training training={training} />
                      </li>
                    </ul>
                  </div>
                );
              })}
            </React.Fragment>
          ) : null}
        </div>
      </section>
      <Divider />
    </React.Fragment>
  );
}

// class TrainingsList extends Component {
//   state = {
//     trainings: [],
//     isLoading: true,
//     prevToken: this.props.cookies.get('token'),
//     fetched: false,
//     // isActive: globalState.isActive
//   };

//   componentDidMount() {
//     if (this.props.cookies.get('token')) {
//       this.fetchTrainings();
//       // } else {
//       // this.setState({ fetched: false });
//     }
//   }

//   componentDidUpdate() {
//     let currentToken = this.props.cookies.get('token');
//     if (this.state.prevToken !== currentToken && !this.state.fetched) {
//       this.fetchTrainings();
//       console.log('cur;=', currentToken);
//       console.log('prev', this.state.prevToken);
//     }
//   }

//   fetchTrainings = () => {
//     fetch(`http://127.0.0.1:5000/trainings`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${this.props.cookies.get('token')}`,
//       },
//     })
//       .then((resp) => resp.json())
//       .then((res) => {
//         this.setState({
//           trainings: res.trainings,
//           isLoading: false,
//           fetched: true,
//         });
//       })
//       .catch((error) => console.log(error));
//   };

//   render() {
//     console.log('prev in render', this.state.prevProps);
//     console.log('context', Context);
//     return (
//       <React.Fragment>
//         <Header title="Your trainings" />
//         <Divider />
//         <section>
//           <div className="container">
//             {this.state.trainings && this.state.trainings.length > 0 ? (
//               <React.Fragment>
//                 {this.state.trainings.map((training) => {
//                   // return <p key={training.id}>{training.name}</p>;
//                   return (
//                     <div key={training.id}>
//                       <ul className="collection z-depth-2">
//                         <li className="collection-item avatar">
//                           <Training training={training} />
//                         </li>
//                       </ul>
//                     </div>
//                   );
//                 })}
//               </React.Fragment>
//             ) : null}
//           </div>
//         </section>
//         <Divider />
//       </React.Fragment>
//     );
//   }
// }

export default TrainingsList;
