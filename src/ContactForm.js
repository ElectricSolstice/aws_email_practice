import React from 'react';
import './ContactForm.css';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const SES_API_GATEWAY = "enter-your-gateway-here.com";

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            name_error: null,
            email: null,
            email_error: null,
            message: "" 
        };

        this.handleSendEmail = this.handleSendEmail.bind(this);
        //bind properties
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail= this.handleChangeEmail.bind(this);
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
    }

    validateName () {
        //Match only ASCII characters and spaces and ensure at least one
        //  ASCII character is in there.
        var name_regex = new RegExp("^[A-Za-z ]*[A-Za-z]+[A-Za-z ]*$");
        if (this.state.name != null && name_regex.test(this.state.name)) {
            this.setState({name_error: null});
            return true;
        } else if (this.state.name === null || this.state.name === ""){
            this.setState({name_error: "Name is required"});
        } else {
            this.setState({name_error: "Only characters and spaces"});
        }
        return false;
    }

    validateEmail() {
        //Match non-whitespace on both sides of the @ and ensure there's at least 1
        //  non-whitespace on each side of the @
        var email_regex = new RegExp("\\S+@\\S+");
        if (this.state.email != null && email_regex.test(this.state.email)) {
            this.setState({email_error: null});
            return true;
        } else if (this.state.email === null || this.state.email === ""){
            this.setState({email_error: "Email is required"});
        } else {
            this.setState({email_error: "Not a valid email."});
        }
        return false;
    }

    validate () {
        var validated;
        validated = this.validateName();
        validated = this.validateEmail() && validated;
        return validated;
    }

    handleChangeName(ev) {
        this.setState({name: ev.target.value}, this.validateName);
        ev.preventDefault();
    }

    handleChangeEmail(ev) {
        this.setState({email: ev.target.value}, this.validateEmail);
        ev.preventDefault();
    }

    handleChangeMessage(ev) {
        this.setState({message: ev.target.value});
        ev.preventDefault();
    }

    handleSendEmail (ev) {
        if (this.validate()) {
            fetch(SES_API_GATEWAY, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"name": this.state.name,
                    "email": this.state.email,
                    "message": this.state.message})
            }).then((success) => {
                    //alert("Contact information sent.");
                },
                (err) => {
                    //alert("Unable to send contact information.");
                    console.log(err);
                }
            );
            alert("Contact information sent.");
        } else {
            alert("Invalid email or name.");
        }
        ev.preventDefault();
    }

    render () {
        return (
            <form className="contact_form" noValidate autoComplete="off" onSubmit={this.handleSendEmail}>
                <Grid container direction="column" justify="center" alignItems="center" spacing="2">
                    <Grid item xs>
                        <TextField label="Name" value={this.state.name} onChange={this.handleChangeName}
                            error={this.state.name_error} helperText={this.state.name_error} />
                    </Grid>
                    <Grid item xs>
                        <TextField label="Email" value={this.state.email} onChange={this.handleChangeEmail}
                            error={this.state.email_error} helperText={this.state.email_error} />
                    </Grid>
                    <Grid item xs>
                        <TextField label="Message" multiline rows="4" value={this.state.message} onChange={this.handleChangeMessage}/>
                    </Grid>
                    <Grid item xs>
                        <Button variant="contained" color = "primary" xs type="submit">
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default ContactForm;
