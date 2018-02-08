import React from 'react';
import PropTypes from 'prop-types'
import './Tree.less';
import TreeNode from './TreeNode'

const emptyFunc = function(){}

class Tree extends React.Component {

	static propTypes = {
		treeData: PropTypes.array, 
		isMulti: PropTypes.bool, 
		style: PropTypes.object,
		afterClick: PropTypes.func,
		afterExpand: PropTypes.func,
	}

	static defaultProps = {
		treeData: [{text: 'a tree node', id:1, children: []}], 
		isMulti: false, 
		afterClick: emptyFunc,
		afterExpand: emptyFunc,
	}

	constructor(props) {
		super(props);
		this.state = {
			treeData: props.treeData
		}
	}

	handleCheck = (id, parentid, checked, checkChildNode) => {
		this.checkNode(id)
	}

	handleClick = (nodeInfo) => {
		this.selectNode(id)
	}

	handleExpand = (id, parentid, hasChildL, isOpened) => {
		this.expandNode(id)
	}

	componentWillReceiveProps(nextProps) {

	}
	
	render() {
		let {style, isMulti} = this.props;
		let {treeData} = this.state;
		return  <div className="" style={style}>
					<ul className="">
						{
							treeData.map((child, index) => {
								return  <TreeNode 
											key={'tree_' + child.id} 
											nodeData={child}
											isMulti={isMulti}
											handleClick={this.handleClick}
											handleCheck={this.handleCheck}
											handleExpand={this.handleExpand}
											/>
							})
						}
					</ul>
				</div>
	}
}

export default Tree