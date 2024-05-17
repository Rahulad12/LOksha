import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useDeleteUserMutation,

} from "../../slices/userApiSlices";

const Userlistscreen = () => {
  const { data: users, refetch, error, isLoading } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingdelete }] = useDeleteUserMutation();
  
  const TotalUser = () => {
    let count = 0;
    if (users) {
      users.map(() => (count += 1));
    }
    return count;
  };

  

  const deleteHandler = async (id) => {
    const user = users.find((u) => u._id === id);
    if (user.isAdmin) {
      toast.error("Admin user cannot be deleted");
      return;
    }
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);

        toast.success("User removed successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  return (
    <div>
      <h1>Users</h1>

      
      {loadingdelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NMAE</th>
              <th>EMAIL</th>
              <th>ADMIN</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>

                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <p>
        Number of Users: <strong>{TotalUser()}</strong>
      </p>
    </div>
  );
};

export default Userlistscreen;
