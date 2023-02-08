import React from "react";
import {SeatsProvider} from "./seats/SeatsProvider";
import SeatsTable from "./seats/SeatsTable";

const SeatsElement = ({token, room, user}) => {
    return (
        <SeatsProvider token={token} room={room}>
            <SeatsTable user={user} />
        </SeatsProvider>
    )
}

export default SeatsElement;
