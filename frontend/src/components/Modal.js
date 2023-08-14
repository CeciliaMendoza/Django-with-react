import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle} >
        <Form style={{backgroundColor: this.state.activeItem.color}}>

        <ModalHeader toggle={toggle}>
          <FormGroup>
            <Input
              type="text"
              name="title"
              value={this.state.activeItem.title}
              onChange={this.handleChange}
              placeholder="Ingresa el titulo"
              
            />
          </FormGroup>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label for="description">Descripción</Label>
            <textarea
              name="description"
              value={this.state.activeItem.description}
              onChange={this.handleChange}
              placeholder="Ingresa la descripcion"
              rows="4" cols="50"
            />
          </FormGroup>

          <FormGroup>
            <Label for="category">
              Categoria
              <select className="form-control" value={this.state.activeItem.category} onChange={this.handleChange} name="category">            
                <option value="Personal">Personal</option>
                <option value="Escuela">Escuela</option>
                <option value="Trabajo">Trabajo</option>
              </select>
            </Label>
          </FormGroup>

          <FormGroup>
            <Label for="relevant">
              Importancia
              <select className="form-control" value={this.state.activeItem.relevant} onChange={this.handleChange} name="relevant">            
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
              </select>
            </Label>
          </FormGroup>

          <FormGroup>
            <Label for="color">
              Color
              <select class="form-control" value={this.state.activeItem.color} onChange={this.handleChange} name="color">            
                <option value="#ffffff">Blanco</option>
                <option value="#CED3F2">Morado</option>
                <option value="#D0F2E9">Verde</option>
                <option value="#F2E8C9">Amarillo</option>
                <option value="#F2CECE">Rosa</option>
                <option value="#dee2e6">Gris</option>
              </select>
            </Label>
          </FormGroup>

          <FormGroup check>
            <Label for="completed">
              <Input
                type="checkbox"
                name="completed"
                checked={this.state.activeItem.completed}
                onChange={this.handleChange}
              />
              Completado
            </Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Guardar
          </Button>
        </ModalFooter>
        </Form>

      </Modal>
    );
  }
}
