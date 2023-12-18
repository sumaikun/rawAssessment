/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { User } from '../views/MainView';

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  user?: User;
  onHandleUpdate: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({ show, handleClose, user, onHandleUpdate }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, phone: user.phone });
    } else {
      setFormData({ name: '', email: '', phone: '' });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all fields.');
      return;
    }

    if (user) {
      // @ts-expect-error
      window.axios.put(`/api/users/${user.id}`, formData)
        .then(() => {
          alert('data updated successfully');
          onHandleUpdate();
          handleClose();
        })
        .catch((error: unknown) => {
          console.error('There was an error fetching the users:', error);
        });
    } else {
      // @ts-expect-error
      window.axios.post('/api/users', formData)
        .then(() => {
          alert('data created successfully');
          onHandleUpdate();
          handleClose();
        })
        .catch((error: unknown) => {
          console.error('There was an error fetching the users:', error);
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" id="submit-button" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
