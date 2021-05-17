import Logo 							from '../navbar/Logo';
import Globe							from '../../globe.png';
import RegisterScreen					from '../accounts/RegisterScreen';
import LoginScreen						from '../accounts/LoginScreen';
import IntroScreen						from '../accounts/IntroScreen';
import UpdateScreen						from '../accounts/UpdateScreen';
import MapScreen						from '../main/MapScreen';
import NavbarOptions 					from '../navbar/NavbarOptions';
import * as mutations 					from '../../cache/mutations';
import { GET_DB_MAPS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { UpdateListField_Transaction, 
	SortItems_Transaction,
	UpdateListItems_Transaction, 
	ReorderItems_Transaction, 
	EditItem_Transaction } 				from '../../utils/jsTPS';

const Homescreen = (props) => {

	// const keyCombination = (e, callback) => {
	// 	if(e.key === 'z' && e.ctrlKey) {
	// 		if(props.tps.hasTransactionToUndo()) {
	// 			tpsUndo();
	// 		}
	// 	}
	// 	else if (e.key === 'y' && e.ctrlKey) { 
	// 		if(props.tps.hasTransactionToRedo()) {
	// 			tpsRedo();
	// 		}
	// 	}
	// }
	// document.onkeydown = keyCombination;

	const auth = props.user === null ? false : true;
	let maps 	= [];
	let SidebarData = [];
	// const [sortRule, setSortRule] = useState('unsorted'); // 1 is ascending, -1 desc
	const [activeMap, setActiveMap] 		= useState({});
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showUpdate, toggleShowUpdate]	= useState(false);
	const [showHome, toggleShowHome]		= useState(true);
	const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

	const { loading, error, data, refetch } = useQuery(GET_DB_MAPS);

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		// Assign todolists 
		for(let todo of data.getAllMaps) {
			maps.push(todo)
		}
		// if a list is selected, shift it to front of todolists
		if(activeMap._id) {
			let selectedListIndex = maps.findIndex(entry => entry._id === activeMap._id);
			let removed = maps.splice(selectedListIndex, 1);
			maps.unshift(removed[0]);
		}
		// create data for sidebar links
		for(let todo of maps) {
			if(todo) {
				SidebarData.push({_id: todo._id, name: todo.name});
			}	
		}
	}


	
	// NOTE: might not need to be async
	const reloadList = async () => {
		if (activeMap._id) {
			let tempID = activeMap._id;
			let list = maps.find(list => list._id === tempID);
			setActiveMap(list);
		}
	}

	const loadMap = (list) => {
		props.tps.clearAllTransactions();
		setCanUndo(props.tps.hasTransactionToUndo());
		setCanRedo(props.tps.hasTransactionToRedo());
		setActiveMap(list);
	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_MAPS }], 
		awaitRefetchQueries: true,
		onCompleted: () => reloadList()
	}

	// const [ReorderTodoItems] 		= useMutation(mutations.REORDER_ITEMS, mutationOptions);
	// const [sortTodoItems] 		= useMutation(mutations.SORT_ITEMS, mutationOptions);
	// const [UpdateTodoItemField] 	= useMutation(mutations.UPDATE_ITEM_FIELD, mutationOptions);
	// const [UpdateTodolistField] 	= useMutation(mutations.UPDATE_TODOLIST_FIELD, mutationOptions);
	const [UpdateMapField]			= useMutation(mutations.UPDATE_MAP_FIELD, mutationOptions);
	// const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM, mutationOptions);
	// const [AddTodoItem] 			= useMutation(mutations.ADD_ITEM, mutationOptions);
	// const [AddTodolist] 			= useMutation(mutations.ADD_TODOLIST);
	const [AddMap]					= useMutation(mutations.ADD_MAP);
	// const [DeleteTodolist] 			= useMutation(mutations.DELETE_TODOLIST);
	
	const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	// const addItem = async () => {
	// 	let list = activeList;
	// 	const items = list.items;
	// 	const newItem = {
	// 		_id: '',
	// 		description: 'No Description',
	// 		due_date: 'No Date',
	// 		assigned_to: 'No One',
	// 		completed: false
	// 	};
	// 	let opcode = 1;
	// 	let itemID = newItem._id;
	// 	let listID = activeList._id;
	// 	let transaction = new UpdateListItems_Transaction(listID, itemID, newItem, opcode, AddTodoItem, DeleteTodoItem);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();
	// };

	// const deleteItem = async (item, index) => {
	// 	let listID = activeList._id;
	// 	let itemID = item._id;
	// 	let opcode = 0;
	// 	let itemToDelete = {
	// 		_id: item._id,
	// 		description: item.description,
	// 		due_date: item.due_date,
	// 		assigned_to: item.assigned_to,
	// 		completed: item.completed
	// 	}
	// 	let transaction = new UpdateListItems_Transaction(listID, itemID, itemToDelete, opcode, AddTodoItem, DeleteTodoItem, index);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();

	// };

	// const editItem = async (itemID, field, value, prev) => {
	// 	let flag = 0;
	// 	if (field === 'completed') flag = 1;
	// 	let listID = activeList._id;
	// 	let transaction = new EditItem_Transaction(listID, itemID, field, prev, value, flag, UpdateTodoItemField);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();
	// };

	// const editUser = async (field, value, prev) => {
	// 	let flag = 0;
	// 	if ()
		
	// };

	// const reorderItem = async (itemID, dir) => {
	// 	let listID = activeList._id;
	// 	let transaction = new ReorderItems_Transaction(listID, itemID, dir, ReorderTodoItems);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();

	// };

	// const createNewList = async () => {
	// 	let list = {
	// 		_id: '',
	// 		name: 'Untitled',
	// 		owner: props.user._id,
	// 		items: [],
	// 		sortRule: 'task',
	// 		sortDirection: 1
	// 	}
	// 	const { data } = await AddTodolist({ variables: { todolist: list }, refetchQueries: [{ query: GET_DB_TODOS }] });
	// 	if(data) {
	// 		loadTodoList(data.addTodolist);
	// 	} 

	const createNewMap = async () => {
		let map = {
			_id: '',
			name: 'Untitled',
			owner: props.user._id,
			regions: []
		}
		console.log("its stopping here")
		const { data } = await AddMap({ variables: { map: map }, refetchQueries: [{ query: GET_DB_MAPS }] });
		console.log("its reaching here")
		// sets the newly created map as the active map
		if(data) {
			loadMap(data.Map);
		}
	}
		
	// };
	// const deleteList = async (_id) => {
	// 	DeleteTodolist({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_TODOS }] });
	// 	loadTodoList({});
	// };

	const updateListField = async (_id, field, value, prev) => {
		let transaction = new UpdateListField_Transaction(_id, field, prev, value, UpdateMapField);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	const handleSetActive = (_id) => {
		const selectedList = maps.find(todo => todo._id === _id);
		loadMap(selectedList);
	};

	const setShowHome = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowHome(!showHome);
	}

	const setShowLogin = () => {
		toggleShowHome(false);
		toggleShowCreate(false);
		toggleShowUpdate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowHome(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowCreate(!showCreate);
	};

	const setShowUpdate = () => {
		toggleShowHome(false);
		toggleShowLogin(false);
		toggleShowCreate(false);
		toggleShowUpdate(!showUpdate);
	}



	// const setShowDelete = () => {
	// 	toggleShowCreate(false);
	// 	toggleShowLogin(false);
	// 	toggleShowDelete(!showDelete)
	// };
	
	// const sort = (criteria) => {
	// 	let prevSortRule = sortRule;
	// 	setSortRule(criteria);
	// 	let transaction = new SortItems_Transaction(activeList._id, criteria, prevSortRule, sortTodoItems);
	// 	console.log(transaction)
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();
		
	// }

	return (
		<WLayout wLayout="header-lside">
			<WLHeader>
				<WNavbar color="colored">
					<ul>
						<WNavItem>
							<Logo className='logo' />
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} 	auth={auth} 
							setShowCreate={setShowCreate} 	setShowLogin={setShowLogin}
							setShowHome={setShowHome}		setShowUpdate={setShowUpdate}
							reloadTodos={refetch} 			setActiveList={loadMap}
							user={props.user}
						/>
					</ul>
				</WNavbar>
			</WLHeader>
{/*THIS IS ALL GOOD  */}

{/* GOTTA CHANGE THIS */}
			<WLMain>
				{ 
					showHome & !auth ?
						<IntroScreen globe={Globe}/>
						:
						<></>
				}
				{
					// shows the registration screen, shown after clicking sign up
					showCreate ?
						<RegisterScreen setShowHome={setShowHome} setShowCreate={setShowCreate} fetchUser={props.fetchUser} />
						:
						<></>
				}
				{
					// shows the login screen, shown after clicking login
					showLogin ?
						<LoginScreen setShowHome={setShowHome} setShowLogin={setShowLogin} fetchUser={props.fetchUser} />
						:
						<></>
				}
				{
					// shows the update screen, shown after clicking on the user name
					showUpdate ?
						<UpdateScreen setShowHome={setShowHome} setShowUpdate={setShowUpdate} fetchUser={props.fetchUser}
						 user={props.user}/>
						:
						<></>
				}
				{
					showHome & auth ?
						<MapScreen listIDs={SidebarData} activeid={activeMap.id} auth={auth} handleSetActive={handleSetActive}
							createNewMap={createNewMap} updateMapField={updateListField} key={activeMap.id} />
						:
						<></>
				}
			</WLMain>
		</WLayout>
	);
};

export default Homescreen;