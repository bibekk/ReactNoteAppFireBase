import React from 'react';
import Note from './Note';
import Dashboard from './Dashboard';
import * as firebase from 'firebase';

class App extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            notes : []
        }
      
        this.removeNote =this.removeNote.bind(this);
        this.newNote = this.newNote.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.restoreNote = this.restoreNote.bind(this);
        this.deletePermanently = this.deletePermanently.bind(this);
    }

   
    //better to use this function than declaring the state in constructor
    componentDidUpdate(prevProps,prevState){
    //  console.log(prevState.notes,this.state.notes);
     /* if(prevState.notes !== this.state.notes){
          this.setState({notes: this.state.notes})
      }*/
     /* var ref  =firebase.database().ref('notes');
          ref.on("value", snapshot => {
            let arr = [];
            snapshot.forEach((snap)=> {
                arr.push(snap.val());
            })
          //  arr = snapshot.val();
            this.setState({notes: arr});
         },this)
        console.log(this.state.notes);*/
    }
    
   
    
    componentWillMount(){
         var ref  =firebase.database().ref('notes');
          ref.on("value", snapshot => {
            let arr = [];
            snapshot.forEach((snap)=> {
                arr.push(snap.val());
            })
            // console.log(this.state.notes);
            this.setState({notes: arr});
         },this)
    }
    
    //get deleted notes, passing 'this' will enable to get this pointer inside the function
    getDeletedNotes(){
        var deln = Object.assign({},this.state);
        deln.deletednotes = [];
        this.setState(deln);
        
        this.state.notes.forEach(function(value,index){
            if(!value.active){
                this.state.deletednotes.push(value.title);
            }
        },this)
    }
    
    newNote(){
       var ref  =firebase.database().ref('notes');
       var newNote = ref.push({
        'title':'New Note','body':'Sample text','active': true,'editmode':true
       });    

       ref.child(newNote.key).update({
           id: newNote.key
       })
       // this.setState(newNote);
       // console.log(newNote);
    }
    
    removeNote(id){
        //cloning the state and updating it
       // var statecopy = Object.assign({},this.state);
       // statecopy.notes[id].active = false;
     //   this.setState(statecopy);
        var ref = firebase.database().ref('notes').child(id);
        ref.update({
            'active':false
         })
       }
    
    updateNote(id,title,body){
       /* var statecopy = Object.assign({},this.state);
        statecopy.notes[id].title = title;
        statecopy.notes[id].body = body;
        this.setState(statecopy);
        */
        var ref  =firebase.database().ref('notes/'+id);
        ref.update({
        'title': title,'body':body,'editmode':false
        })
        
        //this.forceUpdate();
       /* 
        var statecopy = Object.assign({},this.state);
        statecopy.notes[id].title = title;
        statecopy.notes[id].body = body;
        this.setState(statecopy);
       // this.setState(notes:)*/
    }
    
    restoreNote(id){
        /*var statecopy = Object.assign({},this.state);
        statecopy.notes[id].active = true;
        statecopy.notes[id].editmode = false;
        this.setState(statecopy);*/
        
         var ref = firebase.database().ref('notes').child(id);
         ref.update({
            'active':true
         })
    }
    
    deletePermanently(id){
        var ref = firebase.database().ref('notes').child(id);
        ref.remove();
    }
    
    
    render(){
    
        return(
            <div className="panel"><div className="dashboard"><Dashboard restoreNoteCallBack={this.restoreNote}  notes={this.state.notes} deletePermCallBack={this.deletePermanently} /></div>    
            
            <div className='notePanel'>
                <button onClick={this.newNote} className="btn btn-primary addNote"><span className="glyphicon glyphicon-plus"></span></button>
                     {
                        this.state.notes.map(function(item,i){
                          return item.active?<Note editmode={item.editmode} title = {item.title} body={item.body} key={i} id={item.id} updateNoteCallBack={this.updateNote}  deleteNoteCallBack={()=> this.removeNote(item.id)} />:null;
                        },this)
                    }
                </div>
            </div>
        );
    }
}

export default App;