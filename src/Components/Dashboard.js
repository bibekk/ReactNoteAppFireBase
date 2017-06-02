import React from 'react';

class Dashboard extends React.Component{
   constructor(props){
       super(props);
       
       this.state = {
           notes: ''
       }
   }    

    render(){
        return(
           <div>
                <div className="panel panel-info">
                    <div className="panel-heading">Dashboard</div>
                    <div className="panel-body">
                    <ul className="list-group">
                       {
                          this.props.deletednotes.map(function(item,i){
                               if(!item.active){                             
                                    return(
                                            <li className="list-group-item" key={i}>{item.title} <button className="btn btn-success" onClick={()=> this.props.restoreNoteCallBack(i)}> <span className="glyphicon glyphicon-share-alt">Restore</span></button></li>
                                          );
                               }else{
                                   return null;               
                              }
                            },this)        
                        }
                
                    </ul>
                    </div>
                </div>
           </div>
        );
    }
    
}

export default Dashboard;