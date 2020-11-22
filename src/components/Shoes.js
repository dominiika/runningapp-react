import React from 'react';

function Shoes() {
  return (
    <section className="section-shoes">
      <div className="container">
        <h3 className="center">Check out brand new running equipment</h3>
        <p className="grey-text center bolder-text">
          <strong>{'Soon to be available for purchase'.toUpperCase()}</strong>
        </p>
        <div className="photos">
          <div className="row">
            {[...Array(4).keys()].map((key) => {
              return (
                <div className="col s12 m3" key={key}>
                  <img
                    className="materialboxed responsive-img"
                    src={`https://source.unsplash.com/1600x900/?trainers${key}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="divider"></div>
      </div>
    </section>
  );
}

export default Shoes;
