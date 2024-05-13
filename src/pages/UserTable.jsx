import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditDialog from "../components/EditDialog";
import {
  deleteUser,
  editUser,
  fetchUsers,
  selectAllUsers,
} from "../store/slices/userSlice";

const UserTable = () => {
  // hooks
  const dispatch = useDispatch();
  // store
  const users = useSelector(selectAllUsers);
  // states
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      city: "",
      zipcode: "",
    },
  });

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "cityWithZip",
      headerName: "City with Zip Code",
      width: 200,
      valueGetter: (_, row) =>
        `${row?.address?.city} - ${row?.address?.zipcode}`,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const handleEdit = () => {
          setSelectedUser(params.row);
          setEditedUserData(params.row);
          setOpenEditDialog(true);
        };

        const handleDelete = () => {
          dispatch(deleteUser(params.row.id));
        };

        return (
          <div>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        );
      },
    },
  ];

  const handleEditUser = () => {
    dispatch(editUser({ id: selectedUser.id, updatedData: editedUserData }));
    setOpenEditDialog(false);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
      />
      <EditDialog
        openEditDialog={openEditDialog}
        setOpenEditDialog={setOpenEditDialog}
        editedUserData={editedUserData}
        setEditedUserData={setEditedUserData}
        handleEditUser={handleEditUser}
      />
    </div>
  );
};

export default UserTable;
