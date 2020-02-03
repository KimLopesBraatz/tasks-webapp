import React, {Component} from 'react';
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { Skeleton } from '@material-ui/lab';
import ITask from "../model/ITask";


export default class TaskList extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    formatDate = (dateValue: any) => {
        if(dateValue !== null && dateValue !== undefined) {
            let dateFromString = new Date(dateValue);
            const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
            return dateFromString.toLocaleString('pt-BR', options);
        }
    };

    openDialogWithTask = (task: ITask) => {
        this.props.editTask(task);
    };

    renderItemTask = (task: ITask) => {
        return (
            <ListItem button key={task.id} style={{ margin: '0 10px'}}>
                <ListItemText primary={task.title} onClick={() => this.openDialogWithTask(task)} secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2" color="textPrimary">
                          {this.formatDate(task.createdIn) }
                      </Typography>
                      {' - '}{task.description}
                    </React.Fragment>
                  }
                />
            </ListItem>
        )
    };

    render() {
        let taskList = this.props.taskList;
        if (taskList.length > 0) {
            return (
                <List>{taskList.map((itemTask: ITask) => (  this.renderItemTask(itemTask) )) }</List>
            );
        }
        return (
            <List>
                <Skeleton height='100%' />
            </List>
        )
    }
}