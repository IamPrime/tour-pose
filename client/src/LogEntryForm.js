import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import {createLogEntry} from './API';

const LogEntryForm = ({location, onClose}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        try {
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            await createLogEntry(data);
            onClose();
        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
            {error ? <h3 className="error">{error}</h3> : null}
            <label htmlFor="logKey">LOG KEY</label>
            <input type="password" name="logKey" required ref={register}/>

            <label htmlFor="title">Title</label>
            <input name="title" required ref={register}/>

            <label htmlFor="author">Author</label>
            <input name="author" required ref={register}/>

            <label htmlFor="comments">Comments</label>
            <textarea name="comments" rows={2} ref={register}></textarea>

            <label htmlFor="rating">Rating</label>
            <input name="rating" ref={register}/>

            <label htmlFor="image">Image</label>
            <input name="image" ref={register}/>

            <label htmlFor="location">Location</label>
            <input name="location" rows={2} required ref={register}/>

            <label htmlFor="visitDate">Visit Date</label>
            <input name="visitDate" type="date" required ref={register}/>

            <button disabled={loading} >{loading ? 'Loading...' : 'Create Entry'}</button>
        </form>
    );
}

export default LogEntryForm;
