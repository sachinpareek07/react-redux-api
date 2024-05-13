import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const EditDialog = ({
  openEditDialog,
  setOpenEditDialog,
  editedUserData,
  setEditedUserData,
  handleEditUser,
}) => {
  const onChange = (e) => {
    setEditedUserData({ ...editedUserData, [e.target.name]: e.target.value });
  };
  return (
    <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={editedUserData.name}
          onChange={onChange}
          InputLabelProps={{ shrink: true }}
          sx={{ m: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          value={editedUserData.email}
          onChange={onChange}
          InputLabelProps={{ shrink: true }}
          sx={{ m: 2 }}
        />
        <TextField
          label="Phone"
          name="phone"
          value={editedUserData.phone}
          onChange={onChange}
          InputLabelProps={{ shrink: true }}
          sx={{ m: 2 }}
        />
        <TextField
          label="City"
          value={editedUserData.address.city}
          onChange={(e) =>
            setEditedUserData({
              ...editedUserData,
              address: { ...editedUserData.address, city: e.target.value },
            })
          }
          InputLabelProps={{ shrink: true }}
          sx={{ m: 2 }}
        />
        <TextField
          label="Zip Code"
          value={editedUserData.address.zipcode}
          onChange={(e) =>
            setEditedUserData({
              ...editedUserData,
              address: { ...editedUserData.address, zipcode: e.target.value },
            })
          }
          InputLabelProps={{ shrink: true }}
          sx={{ m: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditUser}>Save</Button>
        <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
