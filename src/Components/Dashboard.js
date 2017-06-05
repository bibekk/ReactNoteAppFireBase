import React from 'react';

class Dashboard extends React.Component{
    
    //for filtering the array with the state active is false for getting total deleted notes
    filterInactive(item){
        return item.active === false;
    }
    
    
    render(){
        return(
           <div>
                <div className="panel panel-info">
                    <div className="panel-heading">Dashboard</div>
                    <div className="panel-body">
                    <div>
                       <div>Total Notes: {this.props.notes.length} </div>
                       <div>Temp deleted Notes: { this.props.notes.filter(this.filterInactive).length}</div>
                         
                    </div>
                    <ul className="list-group">
                       {
                          this.props.notes.map(function(item,i){
                               if(!item.active){                             
                                    return(
                                            <li className="list-group-item" key={i}>{item.title} <button className="btn btn-success btn-xs" onClick={()=> this.props.restoreNoteCallBack(item.id)}> <span className="glyphicon glyphicon-share-alt"></span></button>
                                            &nbsp;<button className="btn btn-danger btn-xs" onClick={()=> this.props.deletePermCallBack(item.id)}>Delete Forever</button></li>
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