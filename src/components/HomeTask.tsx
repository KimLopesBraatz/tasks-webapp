import React, { Component } from 'react';
import TaskList from "./TaskList";
import ITask from "../model/ITask";
import axios from '../config/axios';
import DialogTask from './DialogTask';
import './../styles/app.css';
import { Add } from '@material-ui/icons';
import {Container, Button, Divider} from '@material-ui/core';

export default class HomeTask extends Component<any, {
	editTask: any; taskListToDo: Array<ITask>; taskListDoing: Array<ITask>;
	taskListDone: Array<ITask>; isOpenDialog: boolean; handlerInputs: any}> {
	constructor(props: any) {
		super(props);
		this.state = {
			editTask: null,
			taskListToDo: [],
			taskListDoing: [],
			taskListDone: [],
			isOpenDialog: false,
			handlerInputs: {
				inputTitle: this.handlerInputTitle,
				inputDescription: this.handlerInputDescription,
				inputStatus: this.handlerInputStatus,
			}
		};
		this.updateTaskList = this.updateTaskList.bind(this);
		this.closeTaskDialog = this.closeTaskDialog.bind(this);
		this.openEditTaskDialog = this.openEditTaskDialog.bind(this);
	}

	componentDidMount(): void {
		axios.get('/tasks/status/TODO').then(response => {
			this.setState({ taskListToDo: response.data });
		});
		axios.get('/tasks/status/DOING').then(response => {
			this.setState({ taskListDoing: response.data });
		});
		axios.get('/tasks/status/DONE').then(response => {
			this.setState({ taskListDone: response.data });
		});
	}

	updateTaskList = () => {
		axios.get(`/tasks/status/TODO`).then(response => {
			this.setState({ taskListToDo: response.data });
		});
		axios.get(`/tasks/status/DOING`).then(response => {
			this.setState({ taskListDoing: response.data });
		});
		axios.get(`/tasks/status/DONE`).then(response => {
			this.setState({ taskListDone: response.data });
		});
	};

	handlerInputTitle = (titleValue: string) => {
		this.setState(
			prevState => (
				{
					editTask: {
						...prevState.editTask,
						title: titleValue
					}
				}
			)
		);
	};

	handlerInputStatus = (statusValue: string) => {
		this.setState(
			prevState => (
				{
					editTask: {
						...prevState.editTask,
						status: statusValue
					}
				}
			)
		);
	};

	handlerInputDescription = (descriptionValue: string) => {
		this.setState(
			prevState => (
				{
					editTask: {
						...prevState.editTask,
						description: descriptionValue
					}
				}
			)
		);
	};

	openNewTaskDialog = () => {
		this.setState({ editTask: null });
		this.setState({ isOpenDialog: true });
	};

	openEditTaskDialog = (task: ITask) => {
		this.setState({ editTask: task });
		this.setState({ isOpenDialog: true });
	};

	closeTaskDialog = () => {
		this.setState({ isOpenDialog: false });
	};

	render() {
		return(
			<div className='home-container'>
				<div style={{ display: 'flex', flex: '0 1 auto', padding: '20px'}}>
					<Button variant="contained"  color="primary" onClick={this.openNewTaskDialog}>
						<Add /> New
					</Button>
				</div>
				<div className='task-container'>
					<DialogTask task={this.state.editTask} handlerInputs={this.state.handlerInputs}
								open={this.state.isOpenDialog} onClose={this.closeTaskDialog}
								updateTaskList={this.updateTaskList}
					/>
					<div id='todo' className='task-card-container'>
						<div className='task-header'><span>to do</span></div>
						<Divider />
						<TaskList taskList={this.state.taskListToDo} editTask={this.openEditTaskDialog} />
					</div>
					<div id='doing' className='task-card-container'>
						<div className='task-header'><span>doing</span></div>
						<Divider />
						<TaskList taskList={this.state.taskListDoing} editTask={this.openEditTaskDialog} />
					</div>
					<div id='done' className='task-card-container'>
						<div className='task-header'><span>done</span></div>
						<Divider />
						<TaskList taskList={this.state.taskListDone} editTask={this.openEditTaskDialog} />
					</div>
				</div>
			</div>
		);

	}

}
