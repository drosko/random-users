import React from 'react';

function UserCard (props) {
    const {
        name,
        email,
        dob,
        phone,
        gender,
        picture
    } = props.user;

    return (
        <div className="column is-6">
            <div className="card">
                <div className="card-content is-centered">
                    <div className="media">
                        <div className="media-left is-hidden-touch">
                            <figure className="image is-128x128">
                                <img src={picture.large} className="is-rounded" alt="Large image" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">{`${name.first} ${name.last}`}</p>
                            <p className="is-6"><strong>Email: </strong>{email}</p>
                            <p className="is-6"><strong>Phone: </strong>{phone}</p>
                            <p className="is-6"><strong>Age: </strong>{dob.age}</p>
                            <p className="is-6"><strong>Gender: </strong>{gender}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;