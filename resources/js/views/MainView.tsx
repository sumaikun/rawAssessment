/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import TableComponent from '../components/TableComponent';
import ModalComponent from '../components/ModalComponent';

export interface User {
  id?: number;
  name: string;
  phone: string;
  email: string;
}

interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

interface AxiosUserResponse {
  data: PaginatedResponse<User>;
}

const MainView: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setSelectedUser(undefined);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [canPrevPage, setCanPrevPage] = useState<boolean>(false);
  const [canNextPage, setCanNextPage] = useState<boolean>(true);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const getUsers = useCallback((currentPage: number) => {
    // @ts-expect-error
    window.axios
      .get(`/api/users?page=${currentPage}`)
      .then((response: AxiosUserResponse) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { data, current_page, last_page } = response.data;
        setUsers(data);
        setCanNextPage(!(current_page === last_page));
        setCanPrevPage(!(current_page === 1));
      })
      .catch((error: unknown) => {
        console.error('There was an error fetching the users:', error);
      });
  }, []);

  useEffect(() => {
    getUsers(page);
  }, [getUsers, page]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = useCallback((user: User) => {
    if (confirm('Are you sure you want to delete this user?')) {
      // @ts-expect-error
      window.axios.delete(`/api/users/${user.id}`)
        .then(() => {
          alert('User deleted successfully');
          getUsers(page);
        })
        .catch((error: unknown) => {
          console.error('There was an error fetching the users:', error);
        });
    }
  }, [getUsers, page]);

  const handleUpdated = useCallback(() => {
    getUsers(page);
  }, [getUsers, page]);

  return (
        <>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ height: '100vh' }}
            >
                <Row id="card-container">
                    <Card className="text-center">
                        <Card.Body>
                            <TableComponent
                                data={users}
                                canPrev={canPrevPage}
                                canNext={canNextPage}
                                onNextPage={handleNextPage}
                                onPrevPage={handlePrevPage}
                                handleDelete={handleDeleteUser}
                                handleEdit={handleEditUser}
                            />
                        </Card.Body>
                        <Card.Footer id="options-footer">
                            <Button onClick={handleShowModal}>
                                Add New User
                            </Button>
                        </Card.Footer>
                    </Card>
                </Row>
            </Container>
            <ModalComponent
                show={showModal}
                handleClose={handleCloseModal}
                onHandleUpdate={handleUpdated}
                user={selectedUser}
            />
        </>
  );
};

export default MainView;
