import { useEffect, useState } from "react";
import "./favorites.css";

export const Favorites = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let user = JSON.parse(localStorage.getItem("user_data"));
    console.log("user:", user);
    setData(user);
  };
  return (
    <div>
      {data.length > 0 ? (
        <div id="user_data_div">
          {data.map((e, i) => (
            <div className="fav_user_detail">
              <p className="user_name">
                <b>First Name: </b> {e.first_name}
              </p>
              <p className="user_last_name">
                <b>Last Name: </b> {e.last_name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div id="empty_fav">
          <img src="https://cdn.dribbble.com/users/1554526/screenshots/3399669/media/51c98501bc68499ed0220e1ba286eeaf.png?compress=1&resize=400x300"></img>
        </div>
      )}
    </div>
  );
};
