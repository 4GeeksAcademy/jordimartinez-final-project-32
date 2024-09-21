import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const UserView = () => {
    const { store, actions } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = Array.isArray(store.user) ? store.user.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const deleteUser = async (id) => {
        const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmed) {
            const success = await actions.deleteUser(id);
            if (success) {
                alert("Usuario eliminado con éxito");
                actions.getUser();
            } else {
                alert("Error al eliminar el usuario");
            }
        }
    };

    return (
        <div>
            <div className="row mt-5 d-flex justify-content-between">
                <form className="d-flex justify-content-center col-8 me-3" role="search" onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="¿Qué estás buscando?"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                </form>
            </div>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo Electrónico</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Edición</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user.user_id}>
                            <th scope="row">{user.user_id}</th> 
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.rol}</td>
                            <td>
                                <div className="d-flex justify-content-evenly">
                                    <Link to={`/edituser/${user.user_id}`}><i className="fas fa-pencil-alt right-icons me-2"></i></Link>
                                    {/* <a onClick={() => deleteUser(user.user_id)}><i className="fas fa-trash-alt right-icons"></i></a> */}

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserView;
