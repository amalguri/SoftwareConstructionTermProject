import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { updatedata } from './context/ContextProvider';
const Edit = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);
    const {updata, setUPdata} = useContext(updatedata)
    const history = useHistory("");
    const [inpval, setINP] = useState({
        title: "",
        artist: "",
        genre: "",
        language: "",
        composedby: "",
        duration: "",
        description: ""
    });

    const setData = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);


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
            setINP(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])


    const updateuser = async(e)=>{
        e.preventDefault();

        const {title, artist,genre,language,composedby,duration, description} = inpval;

        const res2 = await fetch(`https://songarchiveapp-28539651d3ad.herokuapp.com/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                title, artist,genre,language,composedby,duration,description
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            history.push("/");
            setUPdata(data2);
        }

    }

    return (
        <div className="container">
            <NavLink to="/">back to home page</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Title</label>
                        <input type="text" value={inpval.title} onChange={setData} name="title" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Artist</label>
                        <input type="text" value={inpval.artist} onChange={setData} name="artist" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Genre</label>
                        <input type="text" value={inpval.genre} onChange={setData} name="genre" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Language</label>
                        <input type="text" value={inpval.language} onChange={setData} name="language" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Composed by</label>
                        <input type="text" value={inpval.composedby} onChange={setData} name="composedby" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Duration</label>
                        <input type="text" value={inpval.duration} onChange={setData} name="duration" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">Description</label>
                        <textarea value={inpval.description} onChange={setData} name="description" className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>
                    <button type="submit" onClick={updateuser} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Edit;