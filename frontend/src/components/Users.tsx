import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { UsersInterface, RolesInterface } from "../models/IUser";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import IconButton from "@mui/material/IconButton/IconButton";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FormGroup } from "react-bootstrap";

function Users() {


  const [users, setUsers] = React.useState<UsersInterface[]>([]);
  const [roles, setRoles] = React.useState<RolesInterface>(
   { ID: 0, 
    Name: ""}
    );
  const [open, setOpen] = React.useState<boolean[]>([]);

  const getUsers = async () => {
    const apiUrl = "http://localhost:8080/users";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    };
    


    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.data) {
          setUsers(res.data);
        }
        else {
          console.log(res.error);
        }
      });
  };



  const removeUser = (id: any) => {
    console.log(id);
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${apiUrl}/users/` + id, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setUsers(res.data);
        } else {
          console.log("else");
        }
      });
    }

    const updateUser = (id: any) => {
      console.log(id);
      const apiUrl = "http://localhost:8080";
      const requestOptions = {
        method: "PATH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
  
      fetch(`${apiUrl}/users/` + id, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setUsers(res.data);
          } else {
            console.log("else");
          }
        });
      }
    

    const checkOpen = (id: number): boolean => {
      return open[id] ? open[id] : false;
    }

    const handleOpen = (id: number) => {
      let openArr = [...open];
      openArr[id] = true;
      setOpen(openArr);
    };

    const handleCloseDialog = (id: number) => {
      let openArr = [...open];
      openArr[id] = false;
      setOpen(openArr);
    };


    const logOut = () => {
      localStorage.clear();
      window.location.href = "/login";
    }
    const [selectedUser, setSelectedUser] =
    React.useState<UsersInterface>();

    const handleSelectChange = (event: SelectChangeEvent<number>) => {
      const name = event.target.name as keyof typeof users;
      setUsers({ ...users, [name]: event.target.value });
    };

    useEffect(() => {
      getUsers();
    }, []);

    
    const columns: GridColDef[] = [
     
      {field: "Name",
      headerName: "Firstname - Lastname",
      width: 220,
      valueGetter: (params) => params.row.FirstName + "  " + params.row.LastName ,
    },
      { field: "Email", headerName: "Email", width: 180 },
      { field: "Role", headerName: "Role", width: 100, 
      valueGetter: (params) => params.row.Role.Name,},
    

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: ( params ) => (
        <React.Fragment>
          <IconButton size="small" onClick={() => handleOpen(params.row.ID)}>
                <EditIcon color="success" fontSize="small"></EditIcon>
              </IconButton>
              <DialogContent>
            <Select
              id="RoleID"
              value={roles.ID}
              inputProps={{
                name: "RoleID",
              }}
              fullWidth
              onChange={handleSelectChange}
            >
            </Select>
        </DialogContent>
        <DialogActions>
                  <Button onClick={() => handleCloseDialog(params.row.ID)}>Cancel</Button>
                  <Button onClick={() => updateUser(params.row.ID)}>OK</Button>
                </DialogActions>

              <IconButton size="small" onClick={() => handleOpen(params.row.ID)}>
                <DeleteIcon color="error" fontSize="small"></DeleteIcon>
              </IconButton>
              <Dialog open={checkOpen(params.row.ID)} onClose={() => handleCloseDialog(params.row.ID)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Do you want to delete user of '{ params.row.FirstName + "  " + params.row.LastName }' (ID: { params.row.ID }) ?</DialogContent>
                <DialogActions>
                  <Button onClick={() => handleCloseDialog(params.row.ID)}>Cancel</Button>
                  <Button onClick={() => removeUser(params.row.ID)}>OK</Button>
                </DialogActions>
              </Dialog>
              
        </React.Fragment>
        
      )
      },
    ];

    return (
      <div>
        <Container maxWidth="lg">
          <Box
            display="flex"
            sx={{
              marginTop: 2,
            }}
          >
            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Users
              </Typography>
            </Box>
          </Box>
          <div style={{ height: 400, width: "100%", marginTop: '20px' }}>
            <DataGrid
              rows={users}
              getRowId={(row) => row.ID}
              columns={columns}

            />
          </div>
        </Container>
      </div>
    );
  }
  export default Users;