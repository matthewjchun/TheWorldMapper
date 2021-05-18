const ObjectId = require('mongoose').Types.ObjectId;
const Map = require('../models/map-model');
// const Sorting = require('../utils/sorting')

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
        /** 
            @param   {object} req - the request object containing a user id
            @returns {array} an array of maps objects on success, and an empty array on failure
        **/
        getAllMaps: async (_, __, { req }) => {
            const _id = new ObjectId(req.userId);
            if(!_id) {return([])};
            const maps = await Map.find({owner: _id})
            // .sort({updatedAt: 'descending'});
            if(maps) {
				return (maps);
            }
        },
        // /** 
        //     @param   {object} args - a map id
        //     @returns {object} a map on success and an empty object on failure
        // **/
        // getMapById: async (_, args) => {
        //     const {_id} = args;
        //     const objectId = new Object(_id);
        //     const map = await Map.findOne({_id: objectId});
        //     if(map) return map;
        //     else return ({});
        // },
	},
	Mutation: {
	// 	/** 
	// 	 	@param 	 {object} args - a todolist id and an empty item object
	// 		@returns {string} the objectID of the item or an error message
	// 	**/
	// 	addItem: async(_, args) => {
	// 		const { _id, item , index } = args;
	// 		const listId = new ObjectId(_id);
	// 		const objectId = new ObjectId();
	// 		const found = await Todolist.findOne({_id: listId});
	// 		if(!found) return ('Todolist not found');
	// 		if(item._id === '') item._id = objectId;
	// 		let listItems = found.items;
	// 		if(index < 0) listItems.push(item);
	// 		else listItems.splice(index, 0, item);
			
			
	// 		const updated = await Todolist.updateOne({_id: listId}, { items: listItems });

	// 		if(updated) return (item._id)
	// 		else return ('Could not add item');
	// 	},
		/** 
		 	@param 	 {object} args - an empty todolist object
			@returns {string} the objectID of the todolist or an error message
		**/
		addMap: async (_, args) => {
			console.log("bro")
			const { map } = args;
			const objectId = new ObjectId();
			const { id, name, owner, regions } = map;
			const newMap = new Map({
				_id: objectId,
				name: name,
				owner: owner,
				regions: regions,
				// sortRule: sortRule,
				// sortDirection: sortDirection,
			});
			const updated = await newMap.save();
			if(updated) {
				console.log(newMap)
				return newMap;
			}
		},
	// 	/** 
	// 	 	@param 	 {object} args - a todolist objectID and item objectID
	// 		@returns {array} the updated item array on success or the initial 
	// 						 array on failure
	// 	**/
	// 	deleteItem: async (_, args) => {
	// 		const  { _id, itemId } = args;
	// 		const listId = new ObjectId(_id);
	// 		const found = await Todolist.findOne({_id: listId});
	// 		let listItems = found.items;
	// 		listItems = listItems.filter(item => item._id.toString() !== itemId);
	// 		const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
	// 		if(updated) return (listItems);
	// 		else return (found.items);

	// 	},
		/** 
		 	@param 	 {object} args - a todolist objectID 
			@returns {boolean} true on successful delete, false on failure
		**/
		deleteMap: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Map.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},
		/** 
		 	@param 	 {object} args - a todolist objectID, field, and the update value
			@returns {boolean} true on successful update, false on failure
		**/
		updateMapField: async (_, args) => {
			const { field, value, _id } = args;
			const objectId = new ObjectId(_id);
			const updated = await Map.updateOne({_id: objectId}, {[field]: value});
			if(updated) return value;
			else return "";
		},
	// 	/** 
	// 		@param	 {object} args - a todolist objectID, an item objectID, field, and
	// 								 update value. Flag is used to interpret the completed 
	// 								 field,as it uses a boolean instead of a string
	// 		@returns {array} the updated item array on success, or the initial item array on failure
	// 	**/
	// 	updateItemField: async (_, args) => {
	// 		const { _id, itemId, field,  flag } = args;
	// 		let { value } = args
	// 		const listId = new ObjectId(_id);
	// 		const found = await Todolist.findOne({_id: listId});
	// 		let listItems = found.items;
	// 		if(flag === 1) {
	// 			if(value === 'complete') { value = true; }
	// 			if(value === 'incomplete') { value = false; }
	// 		}
	// 		listItems.map(item => {
	// 			if(item._id.toString() === itemId) {	
					
	// 				item[field] = value;
	// 			}
	// 		});
	// 		const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
	// 		if(updated) return (listItems);
	// 		else return (found.items);
	// 	},
	// 	/**
	// 		@param 	 {object} args - contains list id, item to swap, and swap direction
	// 		@returns {array} the reordered item array on success, or initial ordering on failure
	// 	**/
	// 	reorderItems: async (_, args) => {
	// 		const { _id, itemId, direction } = args;
	// 		const listId = new ObjectId(_id);
	// 		const found = await Todolist.findOne({_id: listId});
	// 		let listItems = found.items;
	// 		const index = listItems.findIndex(item => item._id.toString() === itemId);
	// 		// move selected item visually down the list
	// 		if(direction === 1 && index < listItems.length - 1) {
	// 			let next = listItems[index + 1];
	// 			let current = listItems[index]
	// 			listItems[index + 1] = current;
	// 			listItems[index] = next;
	// 		}
	// 		// move selected item visually up the list
	// 		else if(direction === -1 && index > 0) {
	// 			let prev = listItems[index - 1];
	// 			let current = listItems[index]
	// 			listItems[index - 1] = current;
	// 			listItems[index] = prev;
	// 		}
	// 		const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
	// 		if(updated) return (listItems);
	// 		// return old ordering if reorder was unsuccessful
	// 		listItems = found.items;
	// 		return (found.items);

	// 	},

	// 	sortItems: async (_, args) => {
	// 		const { _id, criteria } = args;
	// 		const listId = new ObjectId(_id);
	// 		const found = await Todolist.findOne({_id: listId});
	// 		let newDirection = found.sortDirection === 1 ? -1 : 1; 
	// 		console.log(newDirection, found.sortDirection);
	// 		let sortedItems;

	// 		switch(criteria) {
	// 			case 'task':
	// 				sortedItems = Sorting.byTask(found.items, newDirection);
	// 				break;
	// 			case 'due_date':
	// 				sortedItems = Sorting.byDueDate(found.items, newDirection);
	// 				break;
	// 			case 'status':
	// 				sortedItems = Sorting.byStatus(found.items, newDirection);
	// 				break;
	// 			case 'assigned_to':
	// 				sortedItems = Sorting.byAssignedTo(found.items, newDirection);
	// 				break;
	// 			default:
	// 				return found.items;
	// 		}
	// 		const updated = await Todolist.updateOne({_id: listId}, { items: sortedItems, sortRule: criteria, sortDirection: newDirection })
	// 		if(updated) return (sortedItems);

	// 	}

	}
}
