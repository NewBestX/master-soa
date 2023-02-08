import React, {useContext, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {getLogger} from "../core";
import {ItemContext} from "./SeatsProvider";
import "./style.css"


const log = getLogger('SeatsTable');


const SeatsTable = ({user}) => {
    const [selected, setSelected] = useState(null);
    const {items} = useContext(ItemContext);

    const reserved = (id) => {
        if (!items)
            return null;
        const index = items.findIndex(it => it.id === id);
        if (index === -1)
            return null;
        return items[index];
    }

    const handleClick = (id) => {
        log("click " + id);
        setSelected(id);
    };

    const cells = [];
    for (let i = 1; i <= 100; i++) {
        cells.push(
            <td key={i} style={{
                width: "50px",
                height: "50px",
                textAlign: "center",
                verticalAlign: "middle",
                border: "1px solid black",
                backgroundColor: !!reserved(i) ? "green" : i === selected ? "yellow" : "#F7F7F7",
                fontSize: "15px",
                fontWeight: "bold"
            }}
                onClick={() => handleClick(i)}
            >
                {i}
            </td>
        );
    }

    const getButtons = () => {
        if (!selected)
            return "";

        const item = reserved(selected);
        if (!item)
            return (<div>Selected: {selected}
                    <div><Button>Book seat</Button></div>
                </div>
            );

        if (item.reservedUser === user)
            return (
                <div>Selected: {selected} <span> -- booked by you</span>
                    <div><Button>Cancel Reservation</Button></div>
                </div>
            )
        return (<div>Selected: {selected} <span> -- booked by {item.reservedUser}</span></div>)
    }

    return (
        <div style={{textAlign: "center"}}>
            <Table striped bordered hover style={{borderCollapse: "collapse", margin: "0px auto 20px"}}>
                <thead>
                <tr>
                    <th colSpan={10} style={{
                        textAlign: "center",
                        backgroundColor: "#934040",
                        fontWeight: "bold",
                        border: "2px solid black"
                    }}>
                        SCREEN
                    </th>
                </tr>
                </thead>
                <tbody>
                {Array.from({length: 10}, (_, rowIndex) => (
                    <tr key={rowIndex}>
                        {cells.slice(rowIndex * 10, (rowIndex + 1) * 10)}
                    </tr>
                ))}
                </tbody>
            </Table>
            {getButtons()}
        </div>
    );
};

export default SeatsTable;
