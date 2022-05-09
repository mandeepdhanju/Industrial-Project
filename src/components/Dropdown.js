import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dropdown() {
    const dropdowns = [{ option: "Community", path: 'community' },
    { option: "Number Of Employees", path: 'employeeCount' },
    { option: "Category / SubCategory", path: 'category' }]

    const navigate = useNavigate();

    return (
        <main>
            <div className="dropdowns" style={{ margin: "55px" }}>
                <table>
                    <thead>
                        <tr>
                            <th>Dropdown Option</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dropdowns.map((dropdown, index) => {
                            return (
                                <tr key={index}>
                                    <td>{dropdown.option}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                navigate("/" + dropdown.path)
                                            }}>Details</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default Dropdown