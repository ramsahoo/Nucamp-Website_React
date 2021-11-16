import React from "react";
import { Card, CardImg, CardTitle, CardBody, CardText } from "reactstrap";
class CampsiteInfo extends React.Component {

  renderComments(comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => {
          return (
            <div>
              {comment.text}
              <br></br>
              {comment.author},
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
            </div>
          );
        })}
      </div>
    );
  }

  renderCampsite(campsite) {
    return (
      <div key={campsite.id} className="col-md-5 m-1">
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardTitle>{campsite.name}</CardTitle>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  render() {
    const { campsite } = this.props;
    if (campsite) {
      return (<div className="row">
        {this.renderCampsite(campsite)}
        {this.renderComments(campsite.comments)}
      </div>
      );
    }
    return <div />;
  }
}

export default CampsiteInfo;
