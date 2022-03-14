import "./home.css";
import { useEffect, useState } from "react";

export const Home = () => {
  const [data, setData] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await fetch("https://airmeetback.herokuapp.com/user");
    let data = await res.json();

    setData(data);
    console.log("data", data.length);
    setIsChecked(new Array(data.length).fill(false));
  };

  const handleCheck = (position) => {
    const updatedCheckedState = isChecked.map((item, index) =>
      index === position ? !item : item
    );

    setIsChecked(updatedCheckedState);

    console.log("check", isChecked[position]);
  };

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

  return (
    <div id="table-container">
      <table>
        <tr>
          <th>CheckBox</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Delete</th>
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
              <button onClick={() => handleDelete(e._id)}>Delete</button>
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
