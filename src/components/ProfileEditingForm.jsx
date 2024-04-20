import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link, useParams } from "react-router-dom";
import "../Profile/ProfileEditingModal.css";

const ProfileEditForm = ({ profileDetails }) => {
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
    <>
      <EditIcon
        size={20}
        id="pencil-icon-open-edit-form"
        onClick={handleShow}
      />
      <Modal id="profile-edit-form-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica introduzione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p id="edit-profile-form-required-notice">
            * Indica che è obbligatorio
          </p>
          <Form>
            <Form.Group controlId="firstName">
              <Form.Label>Nome*</Form.Label>
              <Form.Control
                type="text"
                required
                value={profileToEdit.name}
                onChange={(e) => handleInput("name", e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Cognome*</Form.Label>
              <Form.Control
                type="text"
                required
                value={profileToEdit.surname}
                onChange={(e) => handleInput("surname", e.target.value)}
              />
            </Form.Group>
            <p className="profile-form-small-notice">Name aggiuntivo</p>
            <InfoIcon />{" "}
            <span>
              Può essere aggiunta solo usando la nostra app per dispositivi
              mobili
            </span>
            <Form.Group controlId="profile-edit-form-pronouns">
              <Form.Label>Inserisci pronomi personalizzati</Form.Label>
              <Form.Control as="select" placeholder="Please select">
                <option>Lei</option>
                <option>Lui</option>
                <option>Egli</option>
                <option>Altro</option>
              </Form.Control>
              <p className="profile-form-small-notice">
                Indica i pronomi di genere che vuoi che gli altri usino per
                riferirsi a te.
              </p>
              <p>
                <Link to="/">Scopri di più sui pronomi di genere.</Link>
              </p>
            </Form.Group>
            <div id="showEducation" className="mb-3">
              <input
                type="checkbox"
                id="showEducationCheckbox"
                name="showEducationCheckbox"
                onChange={(e) => handleEducation(e.target.checked)}
                checked={showEducation}
              />
              <label for="showEducationCheckbox" className="ml-2 mt-3">
                Mostra l'istruzione nella mia introduzione
              </label>
            </div>
            <Form.Group controlId="location">
              <Form.Label>Luogo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Es: Londra, Berlino"
                required
                value={profileToEdit.area}
                onChange={(e) => handleInput("area", e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="CAP"
                value={profileToEdit.bio}
                onChange={(e) => handleInput("bio", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <div className="form-label">
                <p>Foto profilo</p>
                <p>Aggiungi nuova immagine profilo</p>
              </div>
              <Form.Label
                id="choose-file-label"
                className="mt-3 btn btn-outline-primary"
                for="choose-file-btn"
              >
                <AddIcon id="plus-icon-add-media" size={18} /> Selezione nuova immagine
              </Form.Label>
              <Form.Control
                id="choose-file-btn"
                type="file"
                onChange={(event) => {
                  setFormData(event.target.files[0]);
                }}
              />
            </Form.Group>
            <Button
              className="save-profile-btn btn-sm"
              onClick={uploadProfileImage}
            >
              Carica
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className={"d-flex justify-content-end"}>
          <Button
            id="save-profile-btn"
            className="px-3 py-1"
            onClick={handleSubmit}
          >
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileEditForm;