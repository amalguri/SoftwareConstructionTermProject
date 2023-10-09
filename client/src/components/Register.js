import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { adddata } from './context/ContextProvider';

const Register = () => {
    const { udata, setUdata } = useContext(adddata);
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
        const {name, value} = e.target;
        setINP((preval)=>{
            return{
                ...preval,
                [name]:value
            }
        })
    }

    const addinpdata = async(e) => {
        e.preventDefault();
        const {title, artist,genre,language,composedby,duration, description} = inpval;

        const res = await fetch("https://songarchiveapp-28539651d3ad.herokuapp.com/register", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title, artist,genre,language,composedby,duration, description
            })
        });

        const data = await res.json();
        console.log(data);

        if(res.status === 422 || !data){
            alert("error");
            console.log("error");
        }
        else{
            history.push("/");
            setUdata(data)
            console.log("data added");
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
                        <textarea value={inpval.description} onChange={setData} name="description"  className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>
                    <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Register;