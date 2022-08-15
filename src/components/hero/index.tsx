import React, { useEffect, useState } from "react";
import { get_banner_content } from "../../redux/action/dashboard";

function Hero() {
  const [content, setcontent] = useState([]);

  useEffect(() => {
    get_banner_content().then(({ data }: any) => {
      setcontent(data.data);
    });
  }, []);
  return (
    <div className="intro-slider-container mb-5">
      <div
        className="intro-slider owl-carousel owl-theme owl-nav-inside owl-light"
        data-toggle="owl"
        data-owl-options='{
                "dots": true,
                "nav": false, 
                "responsive": {
                    "1200": {
                        "nav": false,
                        "dots": false
                    }
                }
            }'
      >
        {content.map((x: any) => (
          <div
            className="intro-slide"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80)`,
            }}
          >
            <div className="container intro-content">
              <div className="row">
                <div className="intro">
                  <div className="title">
                    <h3>{x.title}</h3>
                  </div>
                  <div className="content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: x?.description,
                      }}
                    ></div>
                  </div>

                  <div className="action">
                    <a className="btn btn-primary">
                      <span>{x?.btn_text}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <span className="slider-loader" />
    </div>
  );
}

export default Hero;
