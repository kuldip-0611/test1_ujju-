import React, { useState } from 'react';
import { Modal, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

// Custom styles for the modal
const EditModalContainer = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  outline: none;
  width: 300px;
`;

const EditModal = ({ open, handleClose, post, handleUpdate }) => {
  const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const [userId, setUserId] = useState(1);

  const handleSave = () => {
    handleUpdate(post.id , title , body );
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <EditModalContainer>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
            label="Body"    
            value={body}
            onChange={(e) => setBody(e.target.value)}
        />
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </EditModalContainer>
    </Modal>
  );
};

export default EditModal;