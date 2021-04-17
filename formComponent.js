import React from 'react';
import "../App.css";

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Entries: [],
            noteEditing: null,
            currentEdit: {}
        }
        this.addData = this.addData.bind(this);
        this.deleteData = this.deleteData.bind(this);

    }
    componentDidMount(){
        const EntriesLocalStorage = JSON.parse(localStorage.getItem("Entries"));
        if(EntriesLocalStorage){
            this.setState(() => ({  EntriesLocalStorage }));
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.Entries.length !== this.state.Entries.length){
            localStorage.setItem("Entries", JSON.stringify(this.state.Entries));
        }
        this.state.Entries.forEach((Entry, index) => {
            if(prevState.Entries[index] !== Entry){
                const json = JSON.stringify(this.state.Entries);
                localStorage.setItem("Entries", json);
            }
        })
    }
   
    addData = (e) =>{
        e.preventDefault();
        let formData = [...this.state.Entries];
        const value = {};
        value.fname = this.fname.value;
        value.lname = this.lname.value;
        value.email = this.email.value;
        formData.push(value);
        this.setState({Entries: formData});
        console.info('do',formData);
    }

    deleteData = (dataIndex) =>{
        let NewEntries = [...this.state.Entries].filter(
            (note, index) => index !== dataIndex
          );
        this.setState({ Entries : NewEntries});
        // console.log('dele',dataIndex);
    }
    setNoteEditing = index => {
        this.setState({
            noteEditing: index,
            currentEdit: this.state.Entries[index]
        });
    };

    submitEdit = index => {
        let Entries = [...this.state.Entries];

        let value = this.state.currentEdit;
        value.fname1 = this.fname1.value;
        value.lname1 = this.lname1.value;
        value.email1 = this.email1.value;

        this.setState({currentEdit : value});
        Entries[index] =   this.state.currentEdit;      
        this.setState({ Entries, noteEditing: null });
    };
    render(){
        let data = this.state.Entries.map((entry,index)=>{
            return(
                <div className="notes" key={index}>
                    {this.state.noteEditing === null || this.state.noteEditing !== index ? (
                        <div className="note">
                            <div className="note-content">
                                <ul className="note-text">#{index + 1}</ul>
                                <ul className="note-text">{entry.fname}</ul>
                                <ul className="note-text">{entry.lname}</ul>
                                <ul className="note-text">{entry.email}</ul>
                                <button onClick={() => this.setNoteEditing(index)}>Edit</button>
                                <button onClick={() => this.deleteData(index)}>Delete</button>
                            </div>
                        </div>
                    ) : (
                        <div className="note">
                            <div className="note-content">
                            <input type="text"
                            className="input" ref ={(input) => {this.fname1 =input}} placeholder="Change First Name" />
                            <input type="text"
                            className="input" ref ={(input) => {this.lname1 =input}} placeholder="Change Last Name" />
                            <input type="text"
                            className="input" ref ={(input) => {this.email1 =input}} placeholder="Change Email" />
                            <button onClick={() => this.submitEdit(index)}>Done</button>
                            </div>
                        </div>
                    )}
                </div>
            )
        }).reverse();
        return (
            <React.Fragment>
            <div className="App">
            <form onSubmit={e => this.addData(e)}>
                <textarea type="text"
                    className="input" required
                    ref={(input) => { this.fname = input }}
                    placeholder="First Name"
                />
                <textarea type="text"
                    className="input" required
                    ref={(input) => { this.lname = input }}
                    placeholder="Last Name"
                />
                <textarea type="text"
                    className="input" required
                    pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                    ref={(input) => { this.email = input }}
                    placeholder="email"
                />
                <button className="button" >Submit</button>

            </form>
            <span>{data}</span>
            </div>
            </React.Fragment>
        )
    }
}

export default Form;
