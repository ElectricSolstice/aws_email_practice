import React from 'react';
//import logo from './logo.svg';
import './ContentForm.css';

//import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class ContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.errors = {}
        this.content = {
            name: null,
            email: null,
            message: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate_name () {
        if (true /*TODO: check with regex*/) {
            this.errors["name"] = "Not a valid name.";
            return false;
        } else {
            delete this.errors.name;
            return true;
        }
    }

    validate_email() {
        if (true /*TODO: check with regex*/) {
            this.errors["email"] = "Not a valid email.";
            return false;
        } else {
            delete this.errors.email;
            return true;
        }
    }

    validate () {
        var validated = this.validate_name();
        validated = this.validate_email() && validated;
        return validated;
    }

    handleSubmit (ev) {
        alert("validating");
        if (this.validate()) {
            alert("Email has been sent.");
            /* TODO: Trigger an AWS Lambda to send email and store the
            * message in DynamoDB */
        }
        ev.preventDefault();
    }

    render () {
        return (
            <form className="contact_form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <Grid container direction="column" justify="center" alignItems="center" spacing="2">
                    <Grid item xs>
                        <TextField label="Name" value={this.content.name}/>
                    </Grid>
                    <Grid item xs>
                        <TextField label="Email" value={this.content.email}/>
                    </Grid>
                    <Grid item xs>
                        <TextField label="Message" multiline rows="4" value={this.content.message}/>
                    </Grid>
                    <Grid item xs>
                        <Button variant="contained" color = "primary" xs type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default ContentForm;
