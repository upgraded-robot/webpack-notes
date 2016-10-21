import React from 'react'   
//import ReactDOM from 'react-dom'

import { render } from 'react-dom'
import Draggable from 'react-draggable'
import shortid from 'shortid'

function randomRange(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Board = React.createClass({
    componentWillMount(){
        console.log(this)
        var self = this
        if(this.props.count){
            console.log(this)
            $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
            this.props.count + "&start-with-lorem=1&callback=?", function(results){
                results[0].split('. ').forEach(function(sentence, index){
                    self.state.notes.push({id:shortid.generate(), text:sentence.substring(0,40)});
                    self.setState({
                      notes: self.state.notes
                    })
                });
            })
        }
    },
    getInitialState(){
        return {
            notes: [
              {id: shortid.generate(), text:'Aprender Javascript'},
              {id: shortid.generate(), text:'Aprender React'},
              {id: shortid.generate(), text:'Sacar el Perro'},
              {id: shortid.generate(), text:'Lavar los platos'}
            ]
        }
    },
    update(newNote, id){
    	let filterArray = this.state.notes.filter(function(note){return note.id === id})
        let updatedNote = filterArray[0]
        updatedNote.text = newNote
    	this.setState({
    		notes: this.state.notes
    	})
    },
    remove(index){
        let ntr = this.state.notes.filter(function(note){return note.id === index})[0]
        let io = this.state.notes.indexOf(sm)
        this.state.notes.splice(io, 1)
        this.setState({
            notes: this.state.notes
        })
    },
    createNote(event){
        const newNote = [...this.state.notes, {id:shortid.generate(),text:'New Note'}]
        this.setState({
            notes: newNote
        })
    },
    render(){
        return(
            <div className="board">
                <button onClick={this.createNote} className="btn btn-success glyphicon glyphicon-plus"/>
                {this.state.notes.map((note, index)=>{
                    return <Note 
                            key={note.id} 
                            id={note.id} 
                            onUpdate={this.update} 
                            onRemove={this.remove}>
                            {note.text}
                        </Note>
                })}
            </div>
        )
    }
})

const Note = React.createClass({
    getInitialState: function() {
        return {editing: false}
    },
    edit: function() {
        this.setState({editing: true});
    },
    save: function() {
        let val = this.refs.newNote.value;
        let id = this.props.id;
        this.props.onUpdate(val, id);
        this.setState({editing: false});
    },
    remove: function() {
        this.props.onRemove(this.props.id)
    },
    componentWillMount: function(){
         this.style = {
            note:{
                transform: 'rotate('+randomRange(-30, 30)+'deg)',
                position:'absolute',
                top:Math.floor(Math.random() * 85)+'vh',
                left:Math.floor(Math.random() * 85)+'vw'
            } 
        }
    },
    renderDisplay: function() {
        return (
            <Draggable zIndex={100}>
                <div>            
                    <div className="note" style={this.style.note}>
                        <p>{this.props.children}</p>
                        <span>
                            <button onClick={this.edit}
                                    className="btn btn-primary glyphicon glyphicon-pencil"/>
                            <button onClick={this.remove}
                                    className="btn btn-danger glyphicon glyphicon-trash"/>
                        </span>
                    </div>
                </div>
              </Draggable>
            );
    },
    renderForm: function() {
        return (
            <div className="note" style={this.style.note}>
            <textarea ref="newNote" defaultValue={this.props.children}
            className="form-control"></textarea>
            <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
        )
    },
    render: function() {
        if (this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
});



render(<Board count={5}/>, document.getElementById('react-container'));