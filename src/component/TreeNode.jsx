import React from 'react';
import PropTypes from 'prop-types'
import './Tree.less';

class TreeNode extends React.Component {

	static propTypes = {
		nodeData: PropTypes.object, 

	}

	static defaultProps = {
		expanded: false,
		isChecked: false
	}

	constructor(props) {
		super(props);
		this.state = {
			expanded: props.expanded,
			isChecked: props.isChecked
		};
	}
	switcherClick = () => {
		this.setState({
			expanded: !this.state.expanded
		}, ()=>{
			this.props.afterExpand && this.props.afterExpand(this.props.data)
		})
	}

	handleCheckboxChange = (e) => {
		this.setState({
			isChecked: !this.state.isChecked
		})
	}
	renderCheckbox() {
		let {isChecked} = this.state;
		return <span className={}><input type='checkbox' checked={isChecked} onChange={this.handleCheckboxChange}/></span>;
	}

	handleNodeClick = e => {
		e.stopPropagation()
	}
	renderNode() {
		let {text} = this.props.nodeData;
		let hasChild = true;
		return <a className={} >
					{hasChild?<i className={} onClick={e=>{this.switcherClick()}}></i>:<i className="no-switcher"></i>}
					{this.props.isMulti && this.renderCheckbox()}
					<span className={} onClick={this.handleNodeClick}>{text}</span>
				</a>
	}

	renderChildren() {
		let {style, isMulti, children} = this.props.nodeData;
		return 	<ul className={}>
						{
							children.map((child,index) => {
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
	}

	render() {
		let {expanded} = this.state
		return  <li className="tree-node">
					{this.renderNode()}
					{expanded && this.renderChildren()}
				</li>
	}
}

export default TreeNode;