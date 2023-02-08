import React from "react";
import {Table} from "react-bootstrap";

const SeatsTable = () => {
    const handleClick = (event) => {
        console.log(event.currentTarget.textContent);
        event.currentTarget.style.backgroundColor = "yellow";
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
                backgroundColor: "#F7F7F7",
                fontSize: "15px",
                fontWeight: "bold"
            }}
                onClick={handleClick}
            >
                {i}
            </td>
        );
    }

    return (
        <Table striped bordered hover style={{borderCollapse: "collapse", margin: "auto"}}>
            <tbody>
            {Array.from({length: 10}, (_, rowIndex) => (
                <tr key={rowIndex}>
                    {cells.slice(rowIndex * 10, (rowIndex + 1) * 10)}
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default SeatsTable;