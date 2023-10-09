import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LanguageIcon from '@mui/icons-material/Language';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DescriptionIcon from '@mui/icons-material/Description';
import { NavLink, useParams, useHistory } from 'react-router-dom';

const Details = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const { id } = useParams("");
    console.log(id);

    const history = useHistory();
    const getdata = async () => {

        const res = await fetch(`https://songarchiveapp-28539651d3ad.herokuapp.com/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

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
            history.push("/");
        }

    }

    return (
        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>Song Details:</h1>

            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="add_btn">
                        <NavLink to={`/edit/${getuserdata._id}`}><button className="btn btn-primary mx-2"><EditIcon /></button></NavLink>
                        <button className="btn btn-danger" onClick={() => deleteuser(getuserdata._id)}><DeleteOutlineIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-mg-6 col-12">
                            <h3 className="mt-3">Title : <span style={{ fontWeight: 400 }}>{getuserdata.title}</span></h3>
                            <h3 className="mt-3">Artist : <span style={{ fontWeight: 400 }}>{getuserdata.artist}</span></h3>
                            <p className="mt-3"><LanguageIcon />Language : <span>{getuserdata.language}</span></p>
                            <p className="mt-3"><MusicNoteIcon />Genre : <span>{getuserdata.genre}</span></p>
                        </div>
                        <div className="right_view col-lg-6 col-mg-6 col-12">
                            <p className="mt-5"><InsertEmoticonIcon />ComposedBy : <span>{getuserdata.composedby}</span></p>
                            <p className="mt-3"><AccessTimeFilledIcon />Duration : <span>{getuserdata.duration}</span></p>
                            <p className="mt-3"><DescriptionIcon />Description : <span>{getuserdata.description}</span></p>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default Details
