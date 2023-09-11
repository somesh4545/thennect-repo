import {
  Badge,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Input,
  Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "../../axios/axios";

const Interests = () => {
  const [interestsArray, setInterestsArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interestInput, setInterestInput] = useState("");

  useEffect(() => {
    fetchInterests();
  }, []);

  const fetchInterests = () => {
    axios
      .get(`/interests`)
      .then((res) => {
        var result = JSON.parse(res.data.data);
        setInterestsArray(result.interests);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error " + error);
        alert("Error occurred: " + error);
        setLoading(false);
      });
  };

  const deleteInterest = (value) => {
    if (window.confirm("Are you sure you want to delete")) {
      setLoading(true);
      axios
        .delete(`/interests?remove=${value}`)
        .then((res) => {
          if (res.data.data == "Success") {
            var upadtedArray = interestsArray.filter(function (item) {
              return item !== value;
            });
            setInterestsArray(upadtedArray);
            setInterestInput("");
            alert("Removed succesfully");
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("error " + error);
          alert("Error occurred: " + error);
          setLoading(false);
        });
    }
  };

  const addInterest = () => {
    setLoading(true);
    if (interestInput && interestInput.trim().length > 0) {
      const body = {
        interests: interestInput.trim(),
      };
      console.log(body);
      axios
        .post("/interests", body)
        .then((res) => {
          if (res.data.data == "Success") {
            setInterestsArray((prev) => [...prev, interestInput.trim()]);
            setInterestInput("");
            alert("Added succesfully");
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("error " + error);
          alert("Error occurred: " + error);
          setLoading(false);
        });
    } else {
      alert("Input value is required");
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
            <h3>Add fields / interests</h3>
            <div
              className="mb-5"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Input
                style={{ width: "80%" }}
                className="form-control-alternative"
                placeholder="Enter field"
                type="text"
                onChange={(data) => setInterestInput(data.target.value)}
                value={interestInput}
              />
              <Button
                onClick={addInterest}
                className="px-5"
                color="primary"
                type="button"
              >
                Add
              </Button>
            </div>
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Interests / fields</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Sr. No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? null
                    : interestsArray.map((item, index) => {
                        return (
                          <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{item}</td>
                            <td>
                              <Button
                                onClick={() => deleteInterest(item)}
                                className="px-2"
                                color="danger"
                                type="button"
                              >
                                <i className={"ni ni-fat-delete text-white"} />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
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
      </Container>
    </>
  );
};

export default Interests;
