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
    componentWillMount(){
       var ref  =firebase.database().ref('notes');
          ref.on("value", snapshot => {
            let arr = [];
            /*snapshot.forEach((snap)=> {
                console.log(snap.val());
            })*/
            arr = snapshot.val();
            this.setState({notes: arr});
         },this)

       /* this.state = {
            notes: [
                 {  
                    'title' :'Apple',
                    'body'  : 'Macbook pro is nice computer. It is expensive computer though.',
                    'active': false,
                    'editmode': false
                },
                {
                    'title' : 'Dell',
                    'body'  : 'Dell is also nice PC. It has got latest components.',
                    'active': true,
                    'editmode': false
                },
                {
                    'title' :'HP',
                    'body'  : 'HP is moderate type of PC',
                    'active': true,
                    'editmode': false
                }
            ]
        }*/
        
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
        //array unshift adds item into the first index and push adds to the last
        //var newNote = Object.assign({},this.state);
       // newNote.notes.unshift({'title':'New Note','body':'Sample text','active': true,'editmode':true});
  
        
       var ref  =firebase.database().ref('notes');
       ref.child(this.state.notes.length).set({
        'title':'New Note','body':'Sample text','active': true,'editmode':true
       });    

        
       // this.setState(newNote);
       // console.log(newNote);
    }
    
    removeNote(id){
        //cloning the state and updating it
        var statecopy = Object.assign({},this.state);
        statecopy.notes[id].active = false;
        this.setState(statecopy);
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
        });    

    }
    
    restoreNote(id){
        var statecopy = Object.assign({},this.state);
        statecopy.notes[id].active = true;
        statecopy.notes[id].editmode = false;
        this.setState(statecopy);
    }
    
    deletePermanently(id){
        //removing permanently by splicing
        var arr = this.state;
        arr.notes.splice(id,1);
        this.setState(arr);
    }
    
    
    render(){
    
        return(
            <div className="panel"><div className="dashboard"><Dashboard restoreNoteCallBack={this.restoreNote}  notes={this.state.notes} deletePermCallBack={this.deletePermanently} /></div>    
            
            <div className='notePanel'>
                <button onClick={this.newNote} className="btn btn-primary addNote"><span className="glyphicon glyphicon-plus"></span></button>
                     {
                        this.state.notes.map(function(item,i){
                          return item.active?<Note editmode={item.editmode} title = {item.title} body={item.body} key={i} id={i} updateNoteCallBack={this.updateNote}  deleteNoteCallBack={()=> this.removeNote(i)} />:null;
                        },this)
                    }
                </div>
            </div>
        );
    }
}

export default App;