import "./home.css";
import { useEffect, useState } from "react";

export const Home = () => {
  const [data, setData] = useState([]);

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      fetch("http://localhost:5000/user")
        .then((d) => d.json())
        .then((res) => {
          setData(res);
          console.log("res", res);
        })
        .then(() => {
          setIsChecked(new Array(data.length).fill(false));
        });
    } catch (err) {
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

  const handleDelete = () => {
    try {
    } catch (err) {}
  };

  const handleFavourite = () => {
    console.log("favourites");
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
            <td>{e.company}</td>
            <td>{e.description}</td>
            <td>
              <button onClick={handleDelete}>Delete</button>
            </td>
            <td>
              <button onClick={handleFavourite}>Add to favorites</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
