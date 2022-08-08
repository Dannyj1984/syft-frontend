import React from 'react';

const Footer = () => {

    return (
        <div className="bg-white shadow-sm mb-2 footer-css">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <ul>
                  Copyright SYFTGOLF {new Date().getFullYear()} v1.1.7
                </ul>
              </div>
            </div>
          </div>
        </div>
    );
    };

export default Footer;

