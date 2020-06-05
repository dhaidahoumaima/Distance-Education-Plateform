import React, { Component } from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'react-bootstrap';

class Erreur404 extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container style={{marginTop:200}}>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4" style={{color:"red"}}><b>404 </b> </h1>
                <h4 className="pt-3">Oops! Tu es perdu.</h4>
                <p className="text-muted float-left">La page que vous recherchez est introuvable.</p>
              </div>
             
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Erreur404;
