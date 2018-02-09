// document.write('hello world')
import React from 'react';
import ReactDOM from 'react-dom'
import Tree from './component/Tree'




const data = [
	{
		text: 'a tree node', 
		id:1, 
		children: [
			{
				text: '1-1',
				id: 11,
				parentId: 1
			},
			{
				text: '1-2',
				id: 12,
				parentId: 1
			},
		]
	}
]
ReactDOM.render(<Tree 
	treeData={data} 
	isMulti={true}
	afterClick={nodeData=>console.log('after node click...', nodeData)}
	afterCheck={nodeData=>console.log('after node Check...', nodeData)}
	afterExpand={nodeData=>console.log('after expand callback...')}/>, 
	document.querySelector('#root'))