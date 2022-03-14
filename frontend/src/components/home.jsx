import "./home.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataError, getDataLoading, getDataSuccess } from "../store/action";

export const Home = () => {
  const [data, setData] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  const { loading, users, error } = useSelector((state) => ({
    loading: state.loading,
    users: state.users,
    error: state.error,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  // getting all data

  const getData = async () => {
    try {
      dispatch(getDataLoading());
      let res = await fetch("https://airmeetback.herokuapp.com/user");
      let data = await res.json();

      setData(data);
      dispatch(getDataSuccess(data));
      console.log("users", users);
      setIsChecked(new Array(data.length).fill(false));
    } catch (err) {
      dispatch(getDataError(err));
      console.log(err);
    }
  };

  const handleCheck = (position) => {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );

    setIsChecked(updatedCheckedState);

    console.log("check", isChecked[position]);
  };

  // function to delete data of a selected user

  const handleDelete = (id) => {
    try {
      fetch(`https://airmeetback.herokuapp.com/user/${id}`, {
        method: "DELETE",
      }).then((response) => {
        console.log(response);
        getData();
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (localStorage.getItem("user_data") === null) {
    localStorage.setItem("user_data", JSON.stringify([]));
  }

  const handleFavourite = (user) => {
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    console.log("user", user);
    if (user_data.filter((e) => e.first_name === user.first_name).length > 0) {
      alert("user is already present in fav");
    } else {
      user_data.push(user);
      localStorage.setItem("user_data", JSON.stringify(user_data));
      alert("user is successfully added to fav");
    }
  };

  return loading ? (
    <div className="loading_or_error">loading....</div>
  ) : error ? (
    <div className="loading_or_error">something went wrong</div>
  ) : (
    <div id="table-container">
      <table>
        <tr>
          <th>CheckBox</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Select to Delete</th>
          <th>Favorites</th>
        </tr>
        {data.map((e, i) => (
          <tr key={i} className={isChecked[i] ? "red" : "white"}>
            <td>
              <input
                type="checkbox"
                name="change"
                value={e.company}
                checked={isChecked[i]}
                onChange={() => handleCheck(i)}
              ></input>
            </td>
            <td>{e.first_name}</td>
            <td>{e.last_name}</td>
            <td>
              {isChecked[i] ? (
                <button onClick={() => handleDelete(e._id)}>Delete</button>
              ) : (
                <div></div>
              )}
            </td>
            <td>
              <button onClick={() => handleFavourite(e)}>
                Add to favorites
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
