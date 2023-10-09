import React, { useState, useEffect, useContext } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider';

const Home = () => {
    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const { udata, setUdata } = useContext(adddata);

    const { updata, setUPdata } = useContext(updatedata);

    const { dltdata, setDLTdata } = useContext(deldata);

    // fetch the data
    const getdata = async (e) => {

        const res = await fetch("https://songarchiveapp-28539651d3ad.herokuapp.com/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        //waiting for the response
        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error");
        }
        else {
            setUserdata(data)
            console.log("get data");
        }
    }

    // as soon as the page refreshes, load the data
    useEffect(() => {
        getdata();
    }, [])


    const deleteuser = async (id) => {

        const res2 = await fetch(`https://songarchiveapp-28539651d3ad.herokuapp.com/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            setDLTdata(deletedata)
            getdata();
        }

    }

    // filter the get result from the getuserdata
    const filteredUserData = getuserdata.filter((element) => {
        return element.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <>
            {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.title}</strong> Added Succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.title}</strong> Updated Succesfully!!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Song {dltdata.title}</strong> Deleted Succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/register" className="btn btn-primary">Add Data</NavLink>
                    </div>
                    <div className="mb-2">
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <table class="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">Id</th>
                                <th scope="col">Title</th>
                                <th scope="col">Artist</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Duration</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredUserData.map((element, id) => {
                                    return (
                                        <>

                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.title}</td>
                                                <td>{element.artist}</td>
                                                <td>{element.genre}</td>
                                                <td>{element.duration}</td>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`view/${element._id}`}><button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    <NavLink to={`edit/${element._id}`}><button className="btn btn-primary"><EditIcon /></button></NavLink>
                                                    <button className="btn btn-danger" onClick={() => deleteuser(element._id)}><DeleteOutlineIcon /></button>
                                                </td>
                                            </tr>

                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Home;