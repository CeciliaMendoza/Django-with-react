import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

const delay = ms => new Promise(res => setTimeout(res, ms));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: "",
      categoria_filter: "",
      relevante_filter: "",
      color_filter: "",
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };

  }
  componentDidMount() {
    this.refreshList();
  }
  
  refreshList  = async () => {
    await delay(1000);

    var completado = this.state.viewCompleted;
    var categoria = this.state.categoria_filter;
    var relevante = this.state.relevante_filter;
    var color = this.state.color_filter.replace('#', '%23');
    
    var endpoint_api = "http://localhost:8000/api/todos/?completed=" + completado + "&category=" + categoria + "&relevant=" + relevante + "&color=" + color
    console.log(endpoint_api);
    axios
      .get(endpoint_api)
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };

  handlePeriodChange_completado(selVal) {
    if( selVal === "true"){
      this.setState({viewCompleted : true}) 
    }else if(selVal === "false"){
      this.setState({viewCompleted : false}) 
    }else{
      this.setState({viewCompleted : ""}) 
    }

    this.componentDidMount();

  }

  renderTabList_completado = () => {
    return(
    <select onChange={(val) => this.handlePeriodChange_completado(val.target.value)} className="btn dropdown-toggle filtros">
        <option value="" >Estado</option>
        <option value="true">Completadas</option>
        <option value="false" >Pendientes</option>
    </select>
    );
  };

  handlePeriodChange_categoria(selVal) {
    this.setState({categoria_filter : selVal}) 
    this.componentDidMount();
  }

  renderTabList_categoria = () => {
    return(
    <select onChange={(val) => this.handlePeriodChange_categoria(val.target.value)} className="btn dropdown-toggle filtros">
      <option value="">Categoria</option>         
      <option value="Personal">Personal</option>
      <option value="Escuela">Escuela</option>
      <option value="Trabajo">Trabajo</option>
    </select>
    );
  };  

  handlePeriodChange_relevante(selVal) {
    this.setState({relevante_filter : selVal}) 
    this.componentDidMount();
  }

  renderTabList_relevante = () => {
    return(
    <select onChange={(val) => this.handlePeriodChange_relevante(val.target.value)} className="btn dropdown-toggle filtros">
      <option value="">Relevancia</option>         
      <option value="Baja">Baja</option>
      <option value="Media">Media</option>
      <option value="Alta">Alta</option>
    </select>
    );
  };

  handlePeriodChange_color(selVal) {
    this.setState({color_filter : selVal}) 
    this.componentDidMount();
  }

  renderTabList_color = () => {
    return(
    <select onChange={(val) => this.handlePeriodChange_color(val.target.value)} className="btn dropdown-toggle filtros">
      <option value="">Color</option>
      <option value="#ffffff">Blanco</option>
      <option value="#CED3F2">Morado</option>
      <option value="#D0F2E9">Verde</option>
      <option value="#F2E8C9">Amarillo</option>
      <option value="#F2CECE">Rosa</option>
      <option value="#dee2e6">Gris</option>
    </select>
    );
  };

  renderItems = () => {
    var tasks = this.state.todoList;

    return tasks.map(item => (
      
    <div className="col mb-4" key={item.id}>

      <button
        onClick={() => this.handleDelete(item)}
        className="close delete"
        >
        {" "}
      </button> 

      <div className="card" onClick={() => this.editItem(item)} style={{backgroundColor: item.color}}>

        <div className="card-header">  
            {item.title.slice(0,20)}          
          </div>
        <div className="card-body post-it" style={{backgroundColor: item.color}}>
          <p className="card-text">
            {item.description.slice(0,100)}
          </p>
          <div className="gradeTriangle">
            </div>
       </div>
      </div>
    </div>
    ));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/todos/", item)
      .then(res => this.refreshList());
  };
  handleDelete = item => {
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  render() {
    return (
      <main className="content">
        <h1 className="titulo">To Do List</h1>
        <div className="row">
          <div className="col-md-10 mx-auto p-6">
            <div className="card p-3">


              <div className="btn-group espacio">
                {this.renderTabList_completado()}
                {this.renderTabList_categoria()}
                {this.renderTabList_relevante()}
                {this.renderTabList_color()}
              </div>

                <button onClick={this.createItem} className="btn btn-outline btn-rounded espacio create" >
                  Añadir tarea
                </button>


              <div className="row row-cols-1 row-cols-md-4 g-4">                
                {this.renderItems()}
              </div>

            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;
