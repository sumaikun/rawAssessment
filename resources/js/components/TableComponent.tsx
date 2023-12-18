import React, { useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  FaArrowLeft,
  FaArrowRight,
  FaPencilAlt,
  FaTrash,
} from 'react-icons/fa';
import { User } from '../views/MainView';

interface TableProps {
  data: {
    name: string;
    phone: string;
    email: string;
  }[];
  onPrevPage: () => void;
  onNextPage: () => void;
  canPrev: boolean;
  canNext: boolean;
  handleEdit: (user:User) => void;
  handleDelete: (user:User) => void;
}

const TableComponent: React.FC<TableProps> = ({
  data,
  onPrevPage,
  onNextPage,
  canPrev,
  canNext,
  handleEdit,
  handleDelete,
}) => {
  const onHandleEdit = useCallback((user:User) => {
    handleEdit(user);
  }, [handleEdit]);

  const onHandleDelete = useCallback((user:User) => {
    handleDelete(user);
  }, [handleDelete]);
  return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button variant="outline-primary" onClick={onHandleEdit.bind(null, user)}  size="sm">
                                    <FaPencilAlt />
                                </Button>{' '}
                                <Button variant="outline-danger" onClick={onHandleDelete.bind(null, user)} size="sm">
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className="pagination-controls">
                <Button onClick={onPrevPage} disabled={!canPrev}>
                    <FaArrowLeft />
                </Button>{' '}
                <Button onClick={onNextPage} disabled={!canNext}>
                    <FaArrowRight />
                </Button>
            </div>
        </>
  );
};

export default TableComponent;
