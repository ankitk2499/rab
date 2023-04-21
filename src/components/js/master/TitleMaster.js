import React, { useEffect, useState } from "react";
import MasterPage from "../../../ui/MasterPage";
import axios from "axios";

const baseurl = process.env.REACT_APP_BASE_URL;

export default function TitleMaster() {
  const [titles, setTitles] = useState([]);

  const getTitles = () => {
    axios({
      method: "get",
      url: baseurl + "/master/title",
    }).then((res) => {
      console.log(res.data);
      setTitles(res.data);
    });
  };
  
    const addTitleHandler = (title) => {
        axios({
            method: "post",
            url: baseurl + "/master/title",
            data: { title_name: title },
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const editTitleHandler = (masterID) => {
        axios({
            method: "put",
            url: baseurl + "/master/title/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
    const deleteTitleHandler = (masterID) => {
        axios({
            method: "delete",
            url: baseurl + "/master/title/" + masterID,
        })
            .then((response) => {
                console.log(response)
                window.location.reload();
            });
    }
  useEffect(() => {
    getTitles();
  }, []);

  return (
    <div>
      <MasterPage
        pageHead={"Master Title"}
        listTitle={"Master Title"}
        masterType={"Title"}
        inputName={"Title Name"}
        listItems={titles}
        addMasterFunction={addTitleHandler}
        editMasterFunction={editTitleHandler}
        deleteMasterFunction={deleteTitleHandler}
      />
    </div>
  );
}
