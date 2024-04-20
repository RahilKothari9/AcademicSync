import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

import { useParams } from "react-router-dom";
import "../Profile/ProfileEditingModal.css";

export const ProfileEditForm = ({ profileDetails }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();

  const [profileToEdit, setProfileToEdit] = useState({
    name: "",
    surname: "",
    email: "",
    bio: "",
    title: "",
    area: "",
  });

  const [showEducation, setShowEducation] = useState(true);

  const handleEducation = (checkboxValue) => {
    setShowEducation(checkboxValue);
  };

  const handleInput = (fieldKey, inputValue) => {
    setProfileToEdit({
      ...profileToEdit,
      [fieldKey]: inputValue,
    });
  };

  const [formData, setFormData] = useState({});
  console.log(formData);

  const getProfile = async (id) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RiOGMwYjUwMWZlODAwMTU2MGMyMGYiLCJpYXQiOjE2NzUzMzI2MjAsImV4cCI6MTY3NjU0MjIyMH0.UI1_iuYyUi7ZoMWiwO1QXHOyn0LxM91ju-bEf4_Nmo8
`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      } else {
        const profile = await response.json();
        return profile;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const putProfile = async (profileID, data) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RiOGMwYjUwMWZlODAwMTU2MGMyMGYiLCJpYXQiOjE2NzUzMzI2MjAsImV4cCI6MTY3NjU0MjIyMH0.UI1_iuYyUi7ZoMWiwO1QXHOyn0LxM91ju-bEf4_Nmo8`,
          },
          method: "PUT",
          body: JSON.stringify(data),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      } else {
        const updatedProfile = await response.json();
        return updatedProfile;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const postProfileImage = async (profileID, formData) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${profileID}/picture`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RiOGMwYjUwMWZlODAwMTU2MGMyMGYiLCJpYXQiOjE2NzUzMzI2MjAsImV4cCI6MTY3NjU0MjIyMH0.UI1_iuYyUi7ZoMWiwO1QXHOyn0LxM91ju-bEf4_Nmo8`,
          },
          method: "POST",
          body: formData,
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      } else {
        const profileImage = await response.json();
        return profileImage;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  const uploadProfileImage = async () => {
    try {
      const imgData = new FormData();
      imgData.append("profile", formData);
      console.log(imgData);
      const resp = await postProfileImage(params.id, imgData);
      console.log(resp);
      return resp;
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const resp = await putProfile(params.id, profileToEdit);
      if (!resp.ok) {
        throw new Error("failed to fetch");
      }
      return resp;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getProfile(params.id);
      setProfileToEdit({
        name: data.name || "",
        surname: data.surname || "",
        email: data.email || "",
        bio: data.bio || "",
        title: data.title || "",
        area: data.area || "",
      });
      console.log(data);
    };
    fetch();
  }, []);

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Modifica introduzione</DialogTitle>
      <DialogContent>
        <FormControl>
          <div className="form-label">
            <p>Foto profilo</p>
            <p>Aggiungi nuova immagine profilo</p>
          </div>
          <InputLabel
            id="choose-file-label"
            className="mt-3 btn btn-outline-primary"
            htmlFor="choose-file-btn"
          >
            <AddIcon id="plus-icon-add-media" size={18} /> Selezione nuova immagine
          </InputLabel>
          <input
            id="choose-file-btn"
            type="file"
            onChange={(event) => {
              setFormData(event.target.files[0]);
            }}
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={uploadProfileImage}>Carica</Button>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Salva</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileEditForm;