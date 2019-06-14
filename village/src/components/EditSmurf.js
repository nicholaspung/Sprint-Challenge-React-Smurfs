import React from 'react';
import Smurf from './Smurf';

class EditSmurf extends React.Component {
    state = {
        smurf: this.props.smurfs.filter(smurf => `${smurf.id}` === this.props.match.params.id)
    }

    render() {
        return (
            <div>
                {this.state.smurf.map(smurfie => <Smurf 
                    name={smurfie.name}
                    age={smurfie.age}
                    height={smurfie.height}
                    id={smurfie.id}
                    key={smurfie.id}
                    deleteSmurf={this.props.deleteSmurf}
                />)}

                
            </div>
        );
    }
}

export default EditSmurf;