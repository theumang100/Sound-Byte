import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


function CreateRoom() {
    const [roomName, setroomName] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/createroom', { roomName })
            // .then(res => console.log(res))
            .then(res => {
                const { roomId } = res.data;
                navigate(`/show_barcode/${roomId}`);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Create Room</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="roomName">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name For Room"
                            autoComplete="off"
                            name="roomName"
                            className="form-control rounded-0"
                            onChange={(e) => setroomName(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateRoom;
