import React,{Component} from "react";
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import ModalHeader from "reactstrap/lib/ModalHeader";

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
        isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

  toggleModal() {
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
}

handleSubmit(values) {
  this.toggleModal();
  this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
}


  render() {
      return ( 
        <>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <Control.select id="rating" name="rating" model=".rating" className="form-control">
                  <option name="rating">1</option>
                  <option name="rating">2</option>
                  <option name="rating">3</option>
                  <option name="rating">4</option>
                  <option name="rating">5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <label htmlFor="author">Your Name</label>
                <Control.text id="author" name="author" model=".author" className="form-control" validators={{minLength:minLength(2), maxLength:maxLength(15)}}></Control.text>
                <Errors model=".author" className="text-danger" show="touched" messages={{minLength:"Your name must be greater than 2 characters.", maxLength:"Your name must be 15 characters or less."}}/>
              </div>
              <div className="form-group">
                <label htmlFor="text">Comment</label>
                <Control.textarea id="text" name="text" model=".text" className="form-control"></Control.textarea>
              </div>
              <div className="form-group">
                <Button color="primary" type="submit">Submit</Button>
              </div>
            </LocalForm>
          </ModalBody>   
      </Modal>
        <Button type="submit" outline onClick={this.toggleModal}>
          <i className="fa fa-pencil fa-lg"/>
        Submit Comment</Button>
        </>
      )
    }
}

function RenderCampsite({campsite}) {
  return (
      <div key={campsite.id} className="col-md-5 m-1">
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  function RenderComments({comments, addComment, campsiteId}) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => {
          return (
            <div>
              {comment.text}
              <br></br>
              --{comment.author},
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
            </div>
          );
        })}
        <CommentForm campsiteId={campsiteId} addComment={addComment} />      </div>
    );
  }

  function CampsiteInfo(props) {
    if (props.campsite) {
      return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                <RenderCampsite campsite={props.campsite} />
                <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
            </div>
        </div>
    );
    }
    return <div />;
}

export default CampsiteInfo;