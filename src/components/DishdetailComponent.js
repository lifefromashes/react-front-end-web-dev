import React, { Component } from 'react';
import { Card, CardImg, CardImgOverLay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';




function RenderComments({comments, dishId, addComment}) {
  if (comments == null) {
    return ( < div > < /div>
    );
    }
    const cmnts = comments.map((comment) => {
      return (
        <li key={comment.id}>
                           <p>
       						<i>{comment.comment}</i>
       						<br></br>
       						{comment.author}
                               {", "}
                               {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse (comment.date)))}
       					</p>
                </li>
     )
 })
    return (
      <div className = 'col-12 col-md-5 m-1'>
      <h4> Comments </h4>
      <ul className = 'list-unstyled'>
      {cmnts}
      </ul>
      <CommentForm dishId ={dishId} addComment={addComment} />

      </div>
    )
  }

  function RenderDish({dish}){
        if(dish != null){
            return(
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src ={dish.image} alt ={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }else{
            return(<div></div>)
        }
    }

    const Detail = (props) => {
      const dish = props.dish;

      if(props.dish != null)
        return(
          <div class="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                  <h3>{props.dish.name}</h3>
                  <hr />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-5 m-1">
                  <RenderDish dish={props.dish} />
                  </div>
                <div className="col-12 col-md-5 m-1">
                  <RenderComments comments={props.comments}
                    addComment={props.addComment}
                    dishId={props.dish.id} />
                  </div>
              </div>
            </div>

        );
      }


        export default Detail;

      const required = (val) => val && val.length;
      const maxLength = (len) => (val) => !(val) || (val.length <= len);
      const minLength = (len) => (val) => val && (val.length >= len);

      export class CommentForm extends Component {
        constructor(props) {
          super(props)

          this.state = {
            isModalOpen: false
          };

          this.toggleModal = this.toggleModal.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal() {
          this.setState({ isModalOpen: !this.state.isModalOpen });
        }

        handleSubmit(values) {
          this.toggleModal();
          this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);

          console.log('comment': values);
          alert('comment:' + JSON.stringify(values));
        }

        render() {
          return (
            <div>
              <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg">Leave a Comment</span>
              </Button>

              <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                  <ModalBody>
                    <div>
                      <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                        <Row className="form-group">
                          <Label htmlFor="rating" md={2}>Rating</Label>
                          <Col md={10}>
                            <Control.select model=".rating" name="rating" className="form-control">
                              <option>5</option>
                              <option>4</option>
                              <option>3</option>
                              <option>2</option>
                              <option>1</option>
                            </Control.select>
                          </Col>
                        </Row>

                        <Row className="form-group">
                          <Label htmlFor="author" md={2}>Name</Label>
                          <Col md={10}>
                            <Control.text model=".author" name="author" className="form-control" validators={{ required, minLength: minLength(3), maxLength: maxLength(15)}} />
                            <Errors className="text-danger" model=".author" show="touched" messages={{ required: 'Required', minLength: 'Must be 3 or more characters', maxLength: 'Must be 15 or less characters'}} />
                          </Col>
                        </Row>

                        <Row className="form-group">
                          <Label htmlFor="feedback" md={2}>Feedback</Label>
                          <Col md={10}>
                            <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" validators={{ required }} />
                            <Errors className="text-danger" model=".comment" show="touched" messages= {{ required: 'Required'}} />
                          </Col>
                        </Row>

                        <Button type="submit" value="submit" color="primary">Submit</Button>
                      </LocalForm>
                    </div>
                </ModalBody>
              </Modal>
            </div>
          </div>
        );
        }
      }
