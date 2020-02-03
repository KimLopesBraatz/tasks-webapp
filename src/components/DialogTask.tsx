import React, { Component } from 'react';
import axios from '../config/axios';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    InputLabel,
    Select,
    FormControl, MenuItem
} from "@material-ui/core";

export default class DialogTask extends Component<{ task: any; handlerInputs: any; open: any; onClose: any; updateTaskList: any }, { task: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            task: { id: null, title: '', description: '', isActive: true, },
        };
    }

    handleTitle = (event: any) => {
        let titleValue = event.target.value;
        if (this.props.task !== null) {
            this.props.handlerInputs.inputTitle(titleValue);
        }
        this.setState(
            prevState => (
                {
                    task: {
                        ...prevState.task,
                        title: titleValue
                    }
                }
            )
        );
    };

    handleDescription = (event: any) => {
        let descriptionValue = event.target.value;
        if (this.props.task !== null) {
            this.props.handlerInputs.inputDescription(descriptionValue);
        }
        this.setState(
          prevState => (
              {
                  task: {
                      ...prevState.task,
                      description: descriptionValue
                  }
              }
          )
        );
    };

    handleStatus = (event: any) => {
        let statusValue = event.target.value;
        if (this.props.task !== null) {
            this.props.handlerInputs.inputStatus(statusValue);
        }
        this.setState(
            prevState => (
                {
                    task: {
                        ...prevState.task,
                        status: statusValue
                    }
                }
            )
        );
    };

    handleOnRemoveTask = () => {
        let taskToRemove = this.props.task;
        taskToRemove.status = 'REMOVED';
        axios.post('/tasks', taskToRemove ).then(
            this.props.onClose(),
            this.props.updateTaskList()
        );
    };

    handleOnSaveTask = () => {
        let taskToSave = (this.props.task != null) ? this.props.task : this.state.task;
        axios.post('/tasks', taskToSave ).then(
            this.props.onClose(),
            this.props.updateTaskList()
        );
    };

    renderSelectStatus = (status: string) => {
        if (this.props.task !== null) {
            return (
                <FormControl variant='outlined' style={{marginTop: '20px'}}>
                    <InputLabel id='status-label'> Status </InputLabel>
                    <Select labelId='status-label' id='status-id' label='Status'
                            value={status} onChange={this.handleStatus} >
                        <MenuItem value='TODO'>TO DO</MenuItem>
                        <MenuItem value='DOING'>DOING</MenuItem>
                        <MenuItem value='DONE'>DONE</MenuItem>
                    </Select>
                </FormControl>
            )
        }
        return null;
    };

    renderRemoveButton = () => {
        if (this.props.task !== null) {
            return (
                <Button onClick={this.handleOnRemoveTask} color='secondary'> Remove </Button>
            )
        }
        return null;
    };

    render() {
        const { title , description, status } = (this.props.task) ? this.props.task : this.state.task;
        return (
            <Dialog fullWidth={true} maxWidth='sm' aria-labelledby='form-dialog-title'
                    open={this.props.open}>
                <DialogTitle id='form-dialog-title'>New Task</DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField label='Title' variant='outlined' style={{marginTop: '20px'}}
                               value={title} onChange={this.handleTitle} />
                    <TextField label='Description' variant='outlined' style={{marginTop: '20px'}}
                               value={description} onChange={this.handleDescription} />
                    {this.renderSelectStatus(status)}
                </DialogContent>
                <DialogActions>
                    {this.renderRemoveButton()}
                    <Button onClick={this.handleOnSaveTask} color='primary'> Save </Button>
                    <Button onClick={this.props.onClose} color='primary'> Cancel </Button>
                </DialogActions>
            </Dialog>
        );
    }
}