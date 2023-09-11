import React, { useEffect, useState } from "react";
// core components
import {
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import Header from "components/Headers/Header.js";
import axios from "../../axios/axios";

function MentorApplications() {
  const [loading, setLoading] = useState(true);
  const [dataProcessing, setDataProcessing] = useState(false);

  const [tab, setTab] = useState(null);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [mentorsArray, setMentorsArray] = useState([]);

  const [selectedApplcation, setSelectedApplcation] = useState(null);
  const [rating, setRating] = useState();
  const [comment, setComment] = useState("Great answer");
  const [approval, setApproval] = useState(true);

  useEffect(() => {
    getMentorApplications(null);
  }, []);

  const getMentorApplications = async (approvalStatus) => {
    let query = `/admin-api-xyz/mentorApplications`;
    if (approvalStatus != null) {
      query = `/admin-api-xyz/mentorApplications?approvalStatus=${approvalStatus}`;
    }
    setLoading(true);
    setTab(approvalStatus);
    axios
      .get(query)
      .then((res) => {
        setMentorsArray(JSON.parse(res.data.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Error occurred " + err);
      });
  };

  const updateInDB = () => {
    if (rating && comment && approval) {
      setDataProcessing(true);
      const body = {
        id: selectedApplcation._id,
        user_id: selectedApplcation.user._id,
        approvalStatus: approval,
        rating: rating,
        comment: comment,
      };
      axios
        .patch(`/admin-api-xyz/mentorApplications`, body)
        .then((res) => {
          console.log("updated");
          setDataProcessing(false);
          getMentorApplications(tab);
          setModalOpen(!modalOpen);
        })
        .catch((err) => {
          console.log(err);
          alert("error " + err);
          setDataProcessing(false);
        });
    } else {
      alert("All fields are required");
    }
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <h3></h3>
            <div
              className="mb-5"
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Button
                onClick={() => getMentorApplications(null)}
                className="px-3"
                color="primary"
                type="button"
              >
                New applications
              </Button>
              <Button
                onClick={() => getMentorApplications(true)}
                className="px-3"
                color="success"
                type="button"
              >
                Approved
              </Button>
              <Button
                onClick={() => getMentorApplications(false)}
                className="px-3"
                color="danger"
                type="button"
              >
                Rejected
              </Button>
            </div>
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Mentor applications</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Sr. No.</th>
                    <th scope="col">User name</th>
                    <th scope="col">Question</th>
                    <th scope="col">Answer</th>
                    <th scope="col">Update</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <p>Loading..</p>
                  ) : (
                    mentorsArray.map((item, index) => {
                      return (
                        <tr key={index + 1}>
                          <td>{index + 1}</td>
                          <td>{item.user.firstName}</td>
                          <td>{item.question}</td>
                          <td>{item.answer}</td>
                          <td>
                            <Button
                              onClick={() => {
                                setModalOpen(!modalOpen);
                                setSelectedApplcation(item);
                              }}
                              className="px-3"
                              color="primary"
                              type="button"
                            >
                              Update
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>

              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
        <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
          {selectedApplcation != null ? (
            <>
              <div className=" modal-header">
                <h5 className=" modal-title" id="exampleModalLabel">
                  Application of {selectedApplcation.user.firstName}
                </h5>
                <button
                  aria-label="Close"
                  className=" close"
                  type="button"
                  onClick={() => setModalOpen(!modalOpen)}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <ModalBody>
                <h2>Question: {selectedApplcation.question}</h2>
                <h3>Answer: {selectedApplcation.answer}</h3>
                <Input
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="Enter rating"
                  type="number"
                  className="mb-2"
                />
                <Input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter comment"
                  type="text"
                  className="mb-2"
                />
                <select
                  value={approval}
                  onChange={(e) => setApproval(e.target.value)}
                >
                  <option value="true">Approve</option>
                  <option value="false">Reject</option>
                </select>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  type="button"
                  onClick={() => setModalOpen(!modalOpen)}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  type="button"
                  onClick={() => updateInDB()}
                >
                  {dataProcessing ? "Saving data ...." : "Save changes"}
                </Button>
              </ModalFooter>
            </>
          ) : null}
        </Modal>
      </Container>
    </>
  );
}

export default MentorApplications;
