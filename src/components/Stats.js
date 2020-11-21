import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import CountUp from 'react-countup';
import Aos from 'aos';
import 'aos/dist/aos.css';
import VisibilitySensor from 'react-visibility-sensor';

function Stats() {
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    M.AutoInit();
    document.querySelectorAll('.count');
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <React.Fragment>
      <section className="section-stats">
        <div className="container">
          <div className="row" data-aos="fade">
            <div className="col s12 m4 center">
              <div className="stats-square card-panel z-depth-2">
                <i className="fas fa-users medium"></i>
                <CountUp
                  className="counter"
                  duration={5}
                  start={focus ? 0 : null}
                  redraw={true}
                  end={50}
                >
                  {({ countUpRef }) => (
                    <div>
                      <span className="count-up-number" ref={countUpRef} />
                      <VisibilitySensor
                        onChange={(isVisible) => {
                          if (isVisible) {
                            setFocus(true);
                          }
                        }}
                      >
                        <p>registered users</p>
                      </VisibilitySensor>
                    </div>
                  )}
                </CountUp>
                <div className="progress grey lighten-4">
                  <div
                    className="determinate cyan darken-2"
                    style={{ width: '50%' }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="col s12 m4 center">
              <div className="stats-square z-depth-2 card-panel">
                <i className="fas fa-shoe-prints medium"></i>
                <CountUp
                  className="counter"
                  start={focus ? 0 : null}
                  end={5000}
                  duration={3.5}
                  useEasing={true}
                  useGrouping={true}
                >
                  {({ countUpRef }) => (
                    <div>
                      <span className="count-up-number" ref={countUpRef} />
                      <VisibilitySensor
                        onChange={(isVisible) => {
                          if (isVisible) {
                            setFocus(true);
                          }
                        }}
                      >
                        <p>kilometers run</p>
                      </VisibilitySensor>
                    </div>
                  )}
                </CountUp>
                <div className="progress grey lighten-2">
                  <div
                    className="determinate cyan darken-2"
                    style={{ width: '90%' }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="col s12 m4 center">
              <div className="stats-square z-depth-2 card-panel">
                <i className="fas fa-fire-alt medium"></i>
                <CountUp
                  className="counter"
                  start={focus ? 0 : null}
                  end={3666}
                  duration={3.5}
                  useEasing={true}
                  useGrouping={true}
                >
                  {({ countUpRef }) => (
                    <div>
                      <span className="count-up-number" ref={countUpRef} />
                      <VisibilitySensor
                        onChange={(isVisible) => {
                          if (isVisible) {
                            setFocus(true);
                          }
                        }}
                      >
                        <p>calories burnt</p>
                      </VisibilitySensor>
                    </div>
                  )}
                </CountUp>
                <div className="progress grey lighten-4">
                  <div
                    className="determinate cyan darken-2"
                    style={{ width: '80%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );

  // return (
  //   <React.Fragment>
  //     <section className="section-stats">
  //       <div className="container">
  //         <div className="row" data-aos="fade">
  //           <div className="col s12 m4 center">
  //             <div className="stats-square card-panel z-depth-3 cyan accent-3">
  //               <i className="fas fa-users medium"></i>
  //               <CountUp
  //                 className="counter"
  //                 duration={5}
  //                 start={focus ? 0 : null}
  //                 redraw={true}
  //                 end={50}
  //               >
  //                 {({ countUpRef }) => (
  //                   <div>
  //                     <span className="count-up-number" ref={countUpRef} />
  //                     <VisibilitySensor
  //                       onChange={(isVisible) => {
  //                         if (isVisible) {
  //                           setFocus(true);
  //                         }
  //                       }}
  //                     >
  //                       <p>registered users</p>
  //                     </VisibilitySensor>
  //                   </div>
  //                 )}
  //               </CountUp>
  //               <div className="progress grey lighten-4">
  //                 <div
  //                   className="determinate grey darken-4"
  //                   style={{ width: '50%' }}
  //                 ></div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="col s12 m4 center">
  //             <div className="stats-square z-depth-3 card-panel grey darken-4 white-text">
  //               <i className="fas fa-shoe-prints medium cyan-text text-accent-3"></i>
  //               <CountUp
  //                 className="counter"
  //                 start={focus ? 0 : null}
  //                 end={5000}
  //                 duration={3.5}
  //                 useEasing={true}
  //                 useGrouping={true}
  //               >
  //                 {({ countUpRef }) => (
  //                   <div>
  //                     <span className="count-up-number" ref={countUpRef} />
  //                     <VisibilitySensor
  //                       onChange={(isVisible) => {
  //                         if (isVisible) {
  //                           setFocus(true);
  //                         }
  //                       }}
  //                     >
  //                       <p>kilometers run</p>
  //                     </VisibilitySensor>
  //                   </div>
  //                 )}
  //               </CountUp>
  //               <div className="progress grey lighten-2">
  //                 <div
  //                   className="determinate cyan darken-3"
  //                   style={{ width: '90%' }}
  //                 ></div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="col s12 m4 center">
  //             <div className="stats-square z-depth-3 card-panel cyan accent-3 text-grey text-darken-4">
  //               <i className="fas fa-fire-alt medium"></i>
  //               <CountUp
  //                 className="counter"
  //                 start={focus ? 0 : null}
  //                 end={3666}
  //                 duration={3.5}
  //                 useEasing={true}
  //                 useGrouping={true}
  //               >
  //                 {({ countUpRef }) => (
  //                   <div>
  //                     <span className="count-up-number" ref={countUpRef} />
  //                     <VisibilitySensor
  //                       onChange={(isVisible) => {
  //                         if (isVisible) {
  //                           setFocus(true);
  //                         }
  //                       }}
  //                     >
  //                       <p>calories burnt</p>
  //                     </VisibilitySensor>
  //                   </div>
  //                 )}
  //               </CountUp>
  //               <div className="progress grey lighten-4">
  //                 <div
  //                   className="determinate grey darken-4"
  //                   style={{ width: '80%' }}
  //                 ></div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   </React.Fragment>
  // );
}

export default Stats;
