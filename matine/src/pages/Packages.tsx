import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_packages } from "../redux/action/packages";

function Packages() {
  const dispatch = useDispatch();
  const type = ["", "basic", "standard", "ultimite"];
  useEffect(() => {
    get_packages(dispatch);
  }, []);
  const { packages, isFetching } = useSelector((state: any) => state.package);
  return (
    <div id="price">
      <hr className="mt-2" />
      {!isFetching &&
        packages.map((x: any, i: number) => (
          <div key={i} className={"plan" + " " + type[i]}>
            <div className="plan-inner">
              <div className="entry-title">
                <h3>{x.title}</h3>
                <div className="price">
                  Rs.{x.price}
                  <span> / {x.valid_time} Year</span>
                </div>
              </div>
              <div className="entry-content">
                <ul>
                  <li>
                    <strong>{x.commission}</strong> Commission
                  </li>
                  <li>
                    <strong>{x.discount_percentage}</strong> Discount %
                  </li>
                  {/* <li
                    dangerouslySetInnerHTML={{
                      __html: x?.description,
                    }}
                  ></li> */}
                </ul>
              </div>
              <div className="btn">
                <a href="#">Select</a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Packages;
